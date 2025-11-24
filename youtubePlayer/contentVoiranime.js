if (document.querySelectorAll(".profile-manga").length == 0) {
    let titleAnime = document.querySelectorAll(".breadcrumb a")[1].textContent.replaceAll("\t", "").replaceAll("\n", "")
    titleAnime = titleAnime.split(" ").slice(0, titleAnime.split(" ").indexOf("")).join(" ")
    chrome.runtime.onMessage.addListener((msg) => {
        let status = document.createElement("div")
        switch (msg.action) {
            case "serveurStateResponse":
                status.style.width = "10px"
                status.style.height = "10px"
                status.style.borderRadius = "100%"
                status.style.backgroundColor = "red"
                if (msg.content) {
                    status.style.backgroundColor = "green"
                }
                document.getElementById("time").appendChild(status);
                return true;
            case "init":
                if (document.querySelectorAll('iframe[src="' + msg.content + '"]').length > 0) {
                        chrome.runtime.sendMessage({
                            action: "getDataEpisode",
                            title: titleAnime,
                            episode: ep,
                            timeAdd: timeAdd,
                            origin: "voiranime"
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


    let selectHost = document.getElementsByClassName("host-select")[0]
    selectHost.addEventListener("change", () => {
        localStorage.setItem("Player", selectHost.value);
    })

    selectHost.value = localStorage.getItem("Player");

    let ep = document.querySelectorAll(".selectpicker_chapter select option")[document.querySelector(".selectpicker_chapter select").selectedIndex].textContent
    let timeAdd = localStorage.getItem("timeAdd")
    if (timeAdd == null) {
        timeAdd = 10
    }
    let div = document.createElement("div")
    div.id = "time"
    div.style.display = "inline-flex"
    div.style.alignItems = "center"
    div.innerHTML = "<p style='margin: auto;margin-right: 5px;' id='timeCode'>" + getTime(0) + "</p>"
    document.querySelector(".select-view").appendChild(div)
    chrome.runtime.sendMessage({ action: "getStatusServer" });
    chrome.runtime.sendMessage({ action: "getTimeInit", episode: ep, title: titleAnime });

}
else {
    chrome.runtime.onMessage.addListener((msg) => {
        if (msg.action === "episodesTimeResponse") {
            let allelement = document.querySelectorAll(".version-chap > li ")
            for (let episode of JSON.parse(msg.content)) {
                let element = allelement[allelement.length - episode.episode]
                element.querySelector("a").style.marginRight = "80px"
                element.querySelector("span").style.textAlign = "center"
                element.querySelector("span").innerHTML += "<br>Time : " + getTime(episode.time)
            }
        }
    });

    let titleAnime = document.querySelector(".post-title > h1").textContent.replaceAll("\t", "").replaceAll("\n", "").replaceAll("’", "'")
    titleAnime = titleAnime.split(" ").slice(0, titleAnime.split(" ").indexOf("")).join(" ")
    chrome.runtime.sendMessage({ action: "getEpisodesTime", title: titleAnime });
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