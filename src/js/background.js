import '../img/icon-128.png'
import '../img/icon-34.png'
import ExcelJS from 'exceljs';


const interestedTabs = [];
const data = [];
window.interestedTabs = interestedTabs;
window.data = data;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.work != null) {
            console.dir(sender);
            // start the crawling task
            chrome.tabs.create({
                // active: false,
                // selected: false,
                pinned: true,
                index: 0,
                url: 'https://news.naver.com/',
                }, (tab) => {
                    interestedTabs.push(tab.id);
                }
            );
        }
    }
);

function downloadAsExcel(rows) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
    worksheet.columns = [
        {header: '제목', key: 'title'},
        {header: '링크', key: 'link'},
    ]
    worksheet.addRows(rows);

    workbook.xlsx.writeBuffer( {
        base64: true
    })
    .then( function (xls64) {
        const blob = new Blob([xls64], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({url: url, filename: "data.xlsx"});
    });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (interestedTabs.includes(tabId) && changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {crawl: true}, function(response) {
            // remove tab from interested tabs
            interestedTabs.splice(interestedTabs.indexOf(tabId), 1);
            data.push(response.data);

            // Download data as file
            downloadAsExcel(data[0].articles);
        });
    }
});