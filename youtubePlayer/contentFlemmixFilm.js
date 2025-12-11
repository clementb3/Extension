let serverState = document.createElement("div")


chrome.storage.local.get(["dataMovie", "serverState"], (res) => {
    let div = document.querySelector(".col-mov-right > ul")
    div.innerHTML += "<li><div id=\"time\" class=\"mov-label\">Temps visionné:</div> <div class=\"mov-desc\"><span id=\"timeCode\" itemprop=\"description\">" + getTime(res.dataMovie.time) + "</span></div></li>"

    serverState.style.width = "10px"
    serverState.style.height = "10px"
    serverState.style.borderRadius = "100%"
    serverState.style.backgroundColor = "red"
    if (res.serverState) {
        serverState.style.backgroundColor = "green"
    }
    document.getElementById("time").appendChild(serverState);
})

getData()
chrome.runtime.onMessage.addListener((msg) => {
    switch (msg.action) {
        case "init":
            if (document.querySelectorAll('iframe[src="' + msg.content + '"]').length > 0) {
                console.log(document.querySelectorAll('iframe[src="' + msg.content + '"]'))
                chrome.runtime.sendMessage({
                    action: "getDataEpisode",
                    title: titleMovie,
                    episode: ep,
                    timeAdd: timeAdd,
                    origin: "flemmix"
                });
            }
            return true;
        case "time":
            document.getElementById("timeCode").textContent = getTime(msg.content)
            return true;
        case "timeAdd":
            localStorage.setItem("timeAdd", msg.content);
            return true;

    }
});

function getData() {
        chrome.runtime.sendMessage({ action: "getTimeInit", episode: 0, title: titleMovie });
        ep = 0
}
function getTime(seconds) {
    let time = Number.parseInt(seconds)
    let res = ""
    if (seconds == null || seconds <= 0) {
        return "0:00"
    }
    if (time >= 60) {
        if (time % 60 < 10)
            res = ":0" + time % 60
        else
            res = ":" + time % 60
    }
    else if (time % 60 < 10)
        return "0:0" + time % 60
    else
        return "0:" + time % 60
    if (time >= 3600) {
        if ((time - time % 60) / 60 % 60 < 10)
            res = ":0" + (time - time % 60) / 60 % 60 + res
        else
            res = ":" + (time - time % 60) / 60 % 60 + res
    }
    else {
        return (time - time % 60) / 60 % 60 + res
    }
    return (time - (time - time % 60) / 60 % 60 * 60 - time % 60) / 3600 + res
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
