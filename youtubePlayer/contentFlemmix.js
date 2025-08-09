let time = 0
let ep = ""
let title = ""
if (location.origin.includes("flemmix")) {
    title = document.querySelector(".full-title").textContent.replaceAll("\t", "").replaceAll("\n", "")
    time = localStorage.getItem(title + "/" + ep)
    if (time == null) {
        time = 0
    }
    let timeAdd = localStorage.getItem("timeAdd")
    if (timeAdd == null) {
        timeAdd = 10
    }
    let div = document.querySelector(".col-mov-right > ul")
    div.innerHTML += "<li><div class=\"mov-label\">Temps visionné:</div> <div class=\"mov-desc\"><span id=\"timeCode\" itemprop=\"description\">" + getTime(time) + "</span></div></li>"
    if (document.querySelector(".epblocks") != null)
        getEp()
    chrome.runtime.onMessage.addListener((msg) => {
        if (msg.relay && msg.payload.from !== "top") {
            console.log('Recu page :', msg.payload);
            if (msg.payload.url.includes("https://oneupload.")) {
                for (let iframe of document.querySelectorAll("iframe")) {
                    if (iframe.src.includes(msg.payload.url.split("-").at(-1).split(".")[0])) {
                        if (msg.payload.type == "data") {
                            chrome.runtime.sendMessage({
                                from: "top",
                                type: "init",
                                title: title,
                                ep: ep,
                                time: time,
                                timeAdd: timeAdd,
                                origin: "flemmix"
                            });
                        }
                        if (msg.payload.type == "time" && parseInt(msg.payload.time) > 0 && msg.payload.ep == ep) {
                            document.getElementById("timeCode").textContent = getTime(msg.payload.time)
                            localStorage.setItem(title + "/" + ep, msg.payload.time)
                        }
                    }
                }
            }
            if (document.querySelectorAll('iframe[src="' + msg.payload.url + '"]').length > 0) {
                if (msg.payload.type == "data") {
                    chrome.runtime.sendMessage({
                        from: "top",
                        type: "init",
                        title: title,
                        ep: ep,
                        time: time,
                        timeAdd: timeAdd,
                        origin: "flemmix"
                    });
                }
                if (msg.payload.type == "time" && parseInt(msg.payload.time) > 0 && msg.payload.ep == ep) {
                    document.getElementById("timeCode").textContent = getTime(msg.payload.time)
                    localStorage.setItem(title + "/" + ep, msg.payload.time)
                }
            }
            if (msg.payload.url == "all" && msg.payload.type == "timeAdd") {
                localStorage.setItem("timeAdd", msg.payload.time);

                chrome.runtime.sendMessage({
                    from: "top",
                    type: "timeAdd",
                    time: msg.payload.time
                });
            }
        }
    });
}

async function getEp() {
    while (true) {

        if (document.querySelector(".eplist .active") != null)
            ep = document.querySelector(".eplist .active").textContent.replace("Episode ", "")

        if (time != localStorage.getItem(title + "/" + ep)) {
            time = localStorage.getItem(title + "/" + ep)
            document.getElementById("timeCode").textContent = getTime(time)
        }
        await sleep(50)
    }
}
function getTime(seconds) {
    let time = parseInt(seconds)
    let res = ""
    if (seconds == null || seconds == 0) {
        return "0:00"
    }
    if (time >= 60) {
        if (time % 60 < 10)
            res = ":0" + time % 60
        else
            res = ":" + time % 60
    }
    else {
        if (time % 60 < 10)
            return "0:0" + time % 60
        else
            return "0:" + time % 60
    }
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
