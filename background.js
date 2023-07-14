var websites = {};

chrome.tabs.onActivated.addListener(function (activeInfo) { //event listener that is triggered when a new tab becomes active in the Chrome browser.
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        var url = new URL(tab.url);
        var hostname = url.hostname;
        if (websites[hostname] === undefined) {
            websites[hostname] = 0;
        }
        chrome.storage.local.set({ websites: websites });
    });
});

chrome.webNavigation.onCompleted.addListener(function (details) {  //this function listens for web navigation completion events
    chrome.tabs.get(details.tabId, function (tab) {
        var url = new URL(tab.url);
        var hostname = url.hostname;
        if (websites[hostname] === undefined) {
            websites[hostname] = 0;
        }
        websites[hostname]++;
        chrome.storage.local.set({ websites: websites });
    });
});

chrome.storage.local.set({ totalTime: totalTime, websites: websites }, function () { //Saves website and total time in local chrome storage.
    chrome.runtime.sendMessage({ totalTime: totalTime });
});