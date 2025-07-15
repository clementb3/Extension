chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Relaye à tous les tabs
    chrome.tabs.query({}, (tabs) => {
        for (const tab of tabs) {
            chrome.tabs.sendMessage(tab.id, {
                relay: true,
                from: sender.frameId,
                payload: message
            });
        }
    });
});