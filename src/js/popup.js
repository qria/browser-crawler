import "../css/bootstrap/bootstrap.css";
import "../css/popup.css";
import ExcelJS from 'exceljs';


document.addEventListener("DOMContentLoaded", function() {
    let downloadButton = document.getElementById('downloadButton');

    downloadButton.onclick = function(element) {
        // const workbook = new ExcelJS.Workbook();
        chrome.tabs.executeScript(
            {
                code: 'window.location = "https://news.naver.com/";',
            }
        );

    };
});