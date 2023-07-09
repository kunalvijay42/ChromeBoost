var websites = {};

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        var url = new URL(tab.url);
        var hostname = url.hostname;
        if (websites[hostname] === undefined) {
            websites[hostname] = 0;
        }
        chrome.storage.local.set({ websites: websites });
    });
});

chrome.webNavigation.onCompleted.addListener(function (details) {
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

chrome.storage.local.set({ totalTime: totalTime, websites: websites }, function () {
    chrome.runtime.sendMessage({ totalTime: totalTime });
});