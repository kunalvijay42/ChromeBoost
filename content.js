chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var textNodes = getTextNodes();
    for (var i = 0; i < textNodes.length; i++) {
        replaceTextInNode(textNodes[i], request.word, request.emoji);
    }
});

function getTextNodes() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    var node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    return textNodes;
}

function replaceTextInNode(node, word, emoji) {
    var regex = new RegExp(word, "gi");
    var replacement = emoji;
    node.textContent = node.textContent.replace(regex, replacement);
}

chrome.runtime.sendMessage({ word: "cat", emoji: "🐱" });
