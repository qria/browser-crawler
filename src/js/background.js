import '../img/icon-128.png'
import '../img/icon-34.png'

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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (interestedTabs.includes(tabId) && changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {crawl: true}, function(response) {
            // remove tab from interested tabs
            interestedTabs.splice(interestedTabs.indexOf(tabId), 1);
            data.push(response.data);
        });
    }
});