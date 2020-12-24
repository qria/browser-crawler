console.log('extension loaded')

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('Message received')
        if (request.script != null) {
            try {
                const data = eval(request.script);
                sendResponse({status: "success", data: data});
            }
            catch (e) {
                sendResponse({status: "error", error: e})
            }
        }
        if (request.crawl != null) {
            // Crawlling logic specifically designed for news.naver.com
            const data = {
                articles: [],
            }
            const articleElements = document.querySelectorAll("a.lnk_hdline_article");
            for (articleElement of articleElements) {
                data.articles.push({
                    title: articleElement.text.trim(),
                    link: articleElement.href,
                })
            }
            sendResponse({status: "success", data: data});
            window.close();
        }
    }
);