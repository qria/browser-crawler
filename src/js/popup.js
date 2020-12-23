import "../css/bootstrap/bootstrap.css";
import ExcelJS from 'exceljs';


document.addEventListener("DOMContentLoaded", function() {
    let changeColor = document.getElementById('changeColor');
    console.dir(changeColor)

    changeColor.onclick = function(element) {
        // const workbook = new ExcelJS.Workbook();
        chrome.tabs.executeScript(
            {
                code: 'window.location = "https://news.naver.com/";',
            }
        );

    };
});