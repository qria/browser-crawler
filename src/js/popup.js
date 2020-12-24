import "../css/bootstrap/bootstrap.css";
import "../css/popup.css";


document.addEventListener("DOMContentLoaded", function() {
    let downloadButton = document.getElementById('downloadButton');

    downloadButton.onclick = function(element) {
        chrome.runtime.sendMessage({work: true})
    };
});