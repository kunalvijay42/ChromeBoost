document.addEventListener("DOMContentLoaded", function () {
    var totalTimeElement = document.getElementById("totalTime");
    var websiteList = document.getElementById("websiteList");
    var resetButton = document.getElementById("resetBtn");
    var t = 0;

    resetButton.addEventListener("click", function () {
        chrome.storage.local.set({ websites: {} }, function () {
            console.log("Data reset.");
            websiteList.innerHTML = "";
            t = 0;
        });
    });

    chrome.storage.local.get(["totalTime", "websites"], function (result) {
        // var totalTime = result.totalTime || 0;
        var websites = result.websites || {};

        // totalTimeElement.textContent = totalTime + " minutes";

        var sortedWebsites = Object.entries(websites).sort(function (a, b) {
            return a[0].localeCompare(b[0]);
        });

        sortedWebsites.forEach(function (website) {
            var listItem = document.createElement("li");
            listItem.textContent = website[0] + ": " + website[1] + " minutes";
            t = t + website[1];
            websiteList.appendChild(listItem);
        });

        totalTimeElement.textContent = t + " minutes";

        // var t = 0;

        // for (var website in websites) {
        //     var listItem = document.createElement("li");
        //     listItem.innerHTML = website + ": " + websites[website] + " minutes";
        //     t = t + websites[website];
        //     websiteList.appendChild(listItem);
        // }

        // totalTimeElement.textContent = totalTime + " minutes";

    });

});
