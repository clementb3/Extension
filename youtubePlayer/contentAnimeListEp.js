chrome.storage.local.get("dataAnime", (res) => {
    let allelement = document.querySelectorAll(".version-chap > li ")
    for (let episode of JSON.parse(msg.content)) {
        let element = allelement[allelement.length - episode.episode]
        element.querySelector("a").style.marginRight = "80px"
        element.querySelector("span").style.textAlign = "center"
        element.querySelector("span").innerHTML += "<br>Time : " + getTime(episode.time)
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