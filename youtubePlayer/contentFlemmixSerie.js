let time = 0
let ep = ""
let titleMovie = ""

titleMovie = document.querySelector(".full-title").textContent.replaceAll("\t", "").replaceAll("\n", "")
if (time == null) {
    time = 0
}
let timeAdd = localStorage.getItem("timeAdd")
if (timeAdd == null) {
    timeAdd = 10
}
let div = document.querySelector(".col-mov-right > ul")
div.innerHTML += "<li><div class=\"mov-label\">Temps visionné:</div> <div class=\"mov-desc\"><span id=\"timeCode\" itemprop=\"description\">" + getTime(time) + "</span></div></li>"
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
    setInterval(() => {
        if (document.querySelector(".eplist .active") != null && ep != document.querySelector(".eplist .active").textContent.replace("Episode ", "")) {
            ep = document.querySelector(".eplist .active").textContent.replace("Episode ", "")
        }

    }, 500)
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
