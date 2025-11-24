let urlServer = "http://localhost:5077";


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    switch (msg.action) {
        case "getStatusServer":
            fetch(urlServer + "/serveurState")
                .then(res => {
                    chrome.tabs.query({}, (tabs) => {
                        for (const tab of tabs) {
                            chrome.tabs.sendMessage(tab.id, {
                                action: "serveurStateResponse",
                                content: res.ok
                            });
                        }
                    })
                }).catch(() => {
                    chrome.tabs.query({}, (tabs) => {
                        for (const tab of tabs) {
                            chrome.tabs.sendMessage(tab.id, {
                                action: "serveurStateResponse",
                                content: false
                            });
                        }
                    })
                })
            return true;
        case "putTime":
            fetch(urlServer + "/extensionApi", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Id: msg.id, Title: '', Episode: 0, Time:parseInt(msg.time) })
            })
            return true;
        case "getDataEpisode":
            console.log("getDataEpisode res")
            fetch(urlServer + "/extensionApi/eptitle/" + msg.episode + "/" + msg.title)
                .then(res => {
                    if (!res.ok) throw new Error("HTTP " + res.status);
                    return res.text();
                })
                .then(data => {
                    chrome.tabs.query({}, (tabs) => {
                        for (const tab of tabs) {
                            chrome.tabs.sendMessage(tab.id, {
                                action: "DataEpisodeResponse",
                                content: data,
                                origin: msg.origin
                            });
                        }
                    })
                });
            return true;
        case "getTimeInit":
            console.log("getTimeInit")
            fetch(urlServer + "/extensionApi/eptitle/" + msg.episode + "/" + msg.title)
                .then(res => {
                    if (!res.ok) throw new Error("HTTP " + res.status);
                    return res.text();
                })
                .then(data => {
                    chrome.tabs.query({}, (tabs) => {
                        for (const tab of tabs) {
                            chrome.tabs.sendMessage(tab.id, {
                                action: "time",
                                content: JSON.parse(data).time,
                            });
                        }
                    })
                });
            return true;
        case "getEpisodesTime":
            fetch(urlServer + "/extensionApi/title/" + msg.title)
                .then(res => {
                    if (!res.ok) throw new Error("HTTP " + res.status);
                    return res.text();
                })
                .then(data => {
                    chrome.tabs.query({}, (tabs) => {
                        for (const tab of tabs) {
                            chrome.tabs.sendMessage(tab.id, {
                                action: "episodesTimeResponse",
                                content: data
                            });
                        }
                    })
                });
            return true;
        default:
            try {
                chrome.tabs.query({}, (tabs) => {
                    for (const tab of tabs) {
                        chrome.tabs.sendMessage(tab.id, {
                            from: sender.frameId,
                            action: msg.action,
                            content: msg.message
                        });
                    }
                });
            } catch {
                console.log("error"+msg)
            }
    }
});


