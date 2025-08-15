main()

async function main() {
    let imgSrc = ''
    let lastMusicSelecte = null
    let scrollList = document.getElementById("tab-renderer")
    while (true) {
        let video = document.querySelector(".html5-video-container > video")
        let img = document.querySelector(".thumbnail-image-wrapper > img")
        let musicSelecte = document.querySelector("ytmusic-player-queue-item[selected]")
        if (video != null) {
            document.querySelector(".html5-video-container").removeChild(video)
        }
        if (img != null && imgSrc != img.src && document.querySelector(".html5-video-container")!=null) {
            imgSrc = img.src
            document.querySelector(".html5-video-container").innerHTML = ""
            document.querySelector(".html5-video-container").appendChild(img)
            document.querySelector(".html5-video-container > img").className = ""
            document.querySelector(".html5-video-container > img").style.width = "100%"
        }
        if (lastMusicSelecte != musicSelecte) {
            lastMusicSelecte = musicSelecte
            scrollList.scrollTop += musicSelecte.getBoundingClientRect().top - scrollList.getBoundingClientRect().top
            console.log(musicSelecte.getBoundingClientRect().top - scrollList.getBoundingClientRect().top)
        }
        await sleep(50)
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
