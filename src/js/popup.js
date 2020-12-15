import "../css/bootstrap/bootstrap.css";

'use strict';


document.addEventListener("DOMContentLoaded", function() {
    let changeColor = document.getElementById('changeColor');
    console.dir(changeColor)

    changeColor.onclick = function(element) {
        chrome.tabs.executeScript(
            {
                code: 'window.location = "https://news.naver.com/";',
            }
        );

    };
});