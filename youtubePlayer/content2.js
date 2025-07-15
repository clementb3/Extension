
if (document.querySelectorAll(".profile-manga") != null && document.querySelectorAll(".profile-manga").length > 0) {
    let title = document.querySelector(".post-title > h1").textContent.replaceAll("\t", "").replaceAll("\n", "")
    title = title.split(" ").slice(0, title.split(" ").indexOf("")).join(" ")
    for (var element of document.querySelectorAll(".version-chap > li ")) {
        let ep = element.querySelector("a").textContent.split(" - ")[1].split(" ")[0]
        let time = localStorage.getItem(title + "/" + ep)
        if (time != null)
            element.querySelector("a").textContent += " - " + getTime(time)
    }
}
else {
    let selectHost = document.getElementsByClassName("host-select")[0]
    selectHost.addEventListener("change", () => {
        console.log(selectHost.value)
        localStorage.setItem("Player", selectHost.value);

    })
    selectHost.value = localStorage.getItem("Player");
    let title = document.querySelectorAll(".breadcrumb a")[1].textContent.replaceAll("\t", "").replaceAll("\n", "")
    title = title.split(" ").slice(0, title.split(" ").indexOf("")).join(" ")
    let ep = document.querySelectorAll(".selectpicker_chapter select option")[document.querySelector(".selectpicker_chapter select").selectedIndex].textContent
    let time = localStorage.getItem(title + "/" + ep)
    if (time == null) {
        time == 0
    }
    const isTop = window === window.top;

    chrome.runtime.onMessage.addListener((msg) => {
        if (msg.relay && msg.payload.from !== "top" && document.querySelectorAll('iframe[src="' + msg.payload.url +'"]').length > 0) {
            if (msg.payload.type == "data") {
                chrome.runtime.sendMessage({
                    from: isTop ? "top" : "iframe",
                    type: "title",
                    title: title,
                    ep: ep,
                    time: time
                });
            }
            if (msg.payload.type == "time") {
                localStorage.setItem(title + "/" + ep, msg.payload.time)
            }
            console.log('Recu page :', msg.payload);
        }
    });

}


function getTime(seconds) {
    let time = parseInt(seconds)
    let res = ""
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