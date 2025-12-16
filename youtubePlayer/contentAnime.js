let serverState = document.createElement("div")
chrome.storage.local.get(["dataAnime", "serverState"], (res) => {
    let div = document.createElement("div")
    div.id = "time"
    div.style.display = "inline-flex"
    div.style.alignItems = "center"
    div.innerHTML = "<p style='margin: auto;margin-right: 5px;' id='timeCode'>" + getTime(res.dataAnime.time) + "</p>"
    document.querySelector(".select-view").appendChild(div)

    serverState.style.width = "10px"
    serverState.style.height = "10px"
    serverState.style.borderRadius = "100%"
    serverState.style.backgroundColor = "red"
    if (res.serverState) {
        serverState.style.backgroundColor = "green"
    }
    document.getElementById("time").appendChild(serverState);
});

chrome.runtime.onMessage.addListener((msg) => {
    switch (msg.action) {
        case "serveurStateResponse":
            if (msg.content) {
                serverState.style.backgroundColor = "green"
            }
            else {
                serverState.style.backgroundColor = "red"
            }
        case "time":
            if (document.querySelectorAll('iframe[src="' + msg.url + '"]').length > 0 || msg.url == location.href) {
                document.getElementById("timeCode").textContent = getTime(msg.content)
            }
    }
    return false;
});


let selectHost = document.getElementsByClassName("host-select")[0]
selectHost.addEventListener("change", () => {
    localStorage.setItem("Player", selectHost.value);
})

selectHost.value = localStorage.getItem("Player");




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