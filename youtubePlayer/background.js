let urlServer = "http://176.190.38.228:8080";

const regexFlemmixFilm = /^https:\/\/flemmix\.(?!name\/)[^/]+\/(film-en-streaming|film-ancien)\/.+/;
const regexVoirAnime = /^https:\/\/[^\/]+\.voiranime\.com\/anime\/[^\/]+\/$/;
const regexcontentAnime = /^https:\/\/v\d+\.voiranime\.com\/anime\/[^\/]+\/[^\/]+\/$/;
let serverState = false;

let link = [];

updateServerState()
setInterval(() => updateServerState, 15000)

function urlValid(url) {
    const patterns = [
        "vidmoly.",
        "referer=v6.voiranime.com",
        "ref=v6.voiranime.com",
        "my.mail.ru",
        "dooodster.",
        "jilliandescribecompany.",
        "walterprettytheir.",
        "streamtape.",
        "oneupload.",
        "d-s.io/",
        "luluvid.",
        "uqload.",
        "mivalyo.",
        "hglink.",
        "ups2up.",
        "voe.",
        "f16px.",
        "christopheruntilpoint."
    ];

    for (const pattern of patterns)
        if (url.includes(pattern))
            return true;
    return false;
}



chrome.webNavigation.onCompleted.addListener(async (details) => {
    if (details.frameId > 0) { // 0 = document principal
        try {

            const results = await chrome.scripting.executeScript({
                target: { tabId: details.tabId, frameIds: [details.frameId] },
                func: () => {
                    return location.href;
                }
            });
            if (urlValid(results[0].result)) {
                chrome.tabs.get(details.tabId, (tab) => {
                    console.log("tab details: ", tab)
                    let episodeId = 0
                    let title = ""
                    if (regexcontentAnime.test(tab.url)) {
                        title = tab.url.split('/').slice(-3)[0]
                        episodeId = tab.url.split('-').slice(-2)[0]
                    }

                    console.log(urlServer + "/extensionApi/eptitle/" + episodeId + "/" + title)
                    fetch(urlServer + "/extensionApi/eptitle/" + episodeId + "/" + title)
                        .then(res => {
                            if (!res.ok) throw new Error("HTTP " + res.status);
                            return res.text(); a
                        })
                        .then(data => {
                            originData = "flemmix"
                            if (tab.url.includes("voiranime"))
                                originData = "voiranime";
                            chrome.storage.local.set({ data: JSON.parse(data), origin: originData }, () => {
                                chrome.scripting.executeScript({
                                    target: {
                                        tabId: details.tabId,
                                        frameIds: [details.frameId]
                                    },
                                    files: ["contentPlayer.js"]
                                });
                            })
                            chrome.scripting.insertCSS({
                                target: {
                                    tabId: details.tabId,
                                    frameIds: [details.frameId]
                                },
                                files: ["style.css"]
                            })
                        })

                })
            }

        } catch { }
    }
});

chrome.tabs.onUpdated.addListener((tabId, info) => {
    if (info.status === 'complete') {
        chrome.tabs.get(tabId, (tab) => {
            //flemmix film
            if (regexFlemmixFilm.test(tab.url)) {
                console.log("title : ", tab.url.split('/').slice(-1)[0].split('.html')[0])
                fetch(urlServer + "/extensionApi/eptitle/0/" + tab.url.split('/').slice(-1)[0].split('.html')[0])
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP " + res.status);
                        return res.text();
                    })
                    .then(data => {
                        chrome.storage.local.set({ dataMovie: JSON.parse(data), serverState: serverState }, () => {
                            chrome.scripting.executeScript({
                                target: { tabId },
                                files: ["contentFlemmixFilm.js"]
                            });
                        }
                        )
                    })
            }

            //voiranime liste des episodes d'un anime
            if (regexVoirAnime.test(tab.url)) {
                console.log("title : ", tab.url.split('/').slice(-2)[0])
                fetch(urlServer + "/extensionApi/title/" + tab.url.split('/').slice(-2)[0])
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP " + res.status);
                        return res.text();
                    })
                    .then(data => {
                        chrome.storage.local.set({ dataAnime: JSON.parse(data) }, () => {
                            chrome.scripting.executeScript({
                                target: { tabId },
                                files: ["contentAnimeListEp.js"]
                            });
                        }
                        )
                    })
            }

            //episode anime
            if (regexcontentAnime.test(tab.url)) {
                console.log("title : ", tab.url.split('/').slice(-3)[0])
                console.log("title episode : ", tab.url.split('-').slice(-2)[0])
                fetch(urlServer + "/extensionApi/eptitle/" + tab.url.split('-').slice(-2)[0] + "/" + tab.url.split('/').slice(-3)[0])
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP " + res.status);
                        return res.text();
                    })
                    .then(data => {
                        chrome.storage.local.set({ dataAnime: JSON.parse(data), serverState: serverState }, () => {
                            chrome.scripting.executeScript({
                                target: { tabId },
                                files: ["contentAnime.js"]
                            });
                        }
                        )
                    })
            }
        })
    }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    switch (msg.action) {
        case "putTime":
            fetch(urlServer + "/extensionApi", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Id: msg.id, Title: '', Episode: 0, Time: parseInt(msg.time) })
            })  
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
        default:
            try {
                chrome.tabs.query({}, (tabs) => {
                    for (const tab of tabs) {
                        chrome.tabs.sendMessage(tab.id, {
                            from: sender.frameId,
                            action: msg.action,
                            content: msg.message,
                            url: msg.url
                        });
                    }
                });
            } catch {
                console.log("error" + msg)
            }


    }return false;
});


function updateServerState() {
    fetch(urlServer + "/serveurState")
        .then(res => {
            serverState = true;
            chrome.tabs.query({}, (tabs) => {
                for (const tab of tabs) {
                    chrome.tabs.sendMessage(tab.id, {
                        action: "serveurStateResponse",
                        content: res.ok,
                    });
                }
            })
        }).catch(() => {
            serverState = false;
            chrome.tabs.query({}, (tabs) => {
                for (const tab of tabs) {
                    chrome.tabs.sendMessage(tab.id, {
                        action: "serveurStateResponse",
                        content: false,
                    });
                }
            })
        })
}