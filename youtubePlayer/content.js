var mouseDown = false
var lastClick = Date.now()
var lastClickGlobal = Date.now()
let prevTime = 0
let nextTime = 0
let isFullScreen = false

document.addEventListener('fullscreenchange', () => {
    isFullScreen = !isFullScreen
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


async function vidmoly() {
    let play = false
    let changePLayer = false
    while (true) {
        try {
            if (!play)
                play = playAuto(play)
            if (!changePLayer) {
                let controls = document.querySelector(".jw-controls")
                if (controls != null) {
                    controls.innerHTML = ""
                    controls.style.display = "flex"
                    controls.style.alignItems = "flex-end"
                    controls.style.flexDirection = "column-reverse"
                    controls.style.pointerEvents = "All"
                    controls.appendChild(createPlayer())

                }
                changePLayer = true
            }
            if (changePLayer) {
                let controls = document.getElementById("controlButton")
                let video = document.querySelector("video")
                if (controls != null && video != null) {
                    if (Date.now() - lastClick > 500) {
                        let nextTimeOpacity = document.getElementById("nextTime")
                        let prevTimeOpacity = document.getElementById("previousTime")
                        if (nextTimeOpacity != null)
                            nextTimeOpacity.style.opacity = "0"
                        if (prevTimeOpacity != null)
                            prevTimeOpacity.style.opacity = "0"
                        prevTime = 0
                        nextTime = 0
                    }
                    if (Date.now() - lastClickGlobal < 2000 || video.paused)
                        controls.style.opacity = "1"
                    else
                        controls.style.opacity = "0"
                }
            }
            let overlay = document.getElementsByClassName("custom-overlay")[0]
            if (overlay != null) {
                document.querySelector("body").removeChild(overlay)
            }
        }
        catch { }
        await sleep(100)
    }
}

async function dood() {
    let play = false
    let changePLayer = false
    while (true) {
        try {
            if (!play)
                play = playAuto(play)
            if (!changePLayer) {
                let controls = document.querySelector(".vjs-control-bar")

                if (controls != null) {
                    let player = document.querySelector("#os_player > div > div")
                    document.querySelector("html").style.overflow = "hidden"
                    player.removeChild(controls)
                    controls = document.createElement("div")
                    controls.style.width = "100%"
                    controls.style.height = "100%"
                    controls.style.display = "flex"
                    controls.style.alignItems = "flex-end"
                    controls.style.flexDirection = "column-reverse"
                    controls.style.pointerEvents = "All"
                    controls.className = "jw-controls"
                    controls.style.zIndex = 100
                    controls.style.position = "fixed"
                    player.appendChild(controls)
                    player.querySelector(".jw-controls").appendChild(createPlayer())
                    document.querySelector("#buttons > div").removeChild(document.querySelector("#skipOp"))
                }
                console.log(controls)

                changePLayer = true
            }
            if (changePLayer) {
                let controls = document.getElementById("controlButton")
                let video = document.querySelector("video")
                if (controls != null && video != null) {
                    if (Date.now() - lastClick > 500) {
                        let nextTimeOpacity = document.getElementById("nextTime")
                        let prevTimeOpacity = document.getElementById("previousTime")
                        if (nextTimeOpacity != null)
                            nextTimeOpacity.style.opacity = "0"
                        if (prevTimeOpacity != null)
                            prevTimeOpacity.style.opacity = "0"
                        prevTime = 0
                        nextTime = 0
                    }
                    if (Date.now() - lastClickGlobal < 2000 || video.paused)
                        controls.style.opacity = "1"
                    else
                        controls.style.opacity = "0"
                }
            }
            let overay = document.getElementsByClassName("custom-overlay")[0]
            if (overay != null) {
                document.querySelector("body").removeChild(overay)
            }
        }
        catch (ex) {
            console.error(ex)
        }
        await sleep(100)
    }
}




async function moon() {
    let play = false
    let changePLayer = false
    while (true) {
        if (!play)
            play = playAuto(play)
        if (!changePLayer) {
            let controls = document.querySelector(".jw-controls")
            if (controls != null) {
                controls.innerHTML = ""
                controls.style.display = "flex"
                controls.style.alignItems = "flex-end"
                controls.style.flexDirection = "column-reverse"
                controls.style.pointerEvents = "All"
                controls.appendChild(createPlayer())

            }
            changePLayer = true
        }
        if (changePLayer) {
            if (Date.now() - lastClickGlobal < 2000)
                document.getElementById("controls").style.opacity = "1"
            else
                document.getElementById("controls").style.opacity = "0"
        }
        await sleep(100)
    }
}

function playAuto(play) {
    try {
        let playButton;
        if (location.href.includes("https://vidmoly.to"))
            playButton = document.querySelector(".jw-icon-display")
        if (location.href.includes("https://dooodster.com"))
            playButton = document.querySelector(".vjs-big-play-button")

        if (playButton != null && !play) {
            document.querySelector(".vjs-big-play-button").click()
            return true
        }
    }
    catch (ex) {
        console.error(ex)
    }
    return false
}

async function main() {
    if (location.href.includes("https://vidmoly.to"))
        vidmoly()
    if (location.href.includes("referer=v6.voiranime.com"))
        moon()
    if (location.href.includes("https://dooodster.com"))
        dood()
}

function createPlayer() {
    document.querySelector(".jw-controls").addEventListener("click", clickPlayer)
    document.querySelector(".jw-controls").addEventListener("mousemove", function () { lastClickGlobal = Date.now() })
    let div = document.createElement("div")
    div.style.width = "100%"
    div.style.height = "50px"
    let controls = document.createElement("div")
    controls.style.width = "97%"
    controls.style.height = "60px"
    controls.style.transition = "opacity .1s cubic-bezier(.4,0,1,1)"
    controls.appendChild(createBar())
    controls.appendChild(createButton())
    div.style.pointerEvents = "All"
    div.style.display = "flex"
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    controls.style.zIndex = 1000
    controls.id = "controlButton"
    div.appendChild(controls)
    if (checkMobile()) {
        let div2 = document.createElement("div")
        div2.style.width = "100%"
        div2.style.height = "100%"
        div2.style.pointerEvents = "none"
        let divNext = document.createElement("div")
        divNext.id = "nextTime"
        divNext.style.width = "100%"
        divNext.style.height = "100%"
        divNext.style.marginRight = "-50%"
        divNext.style.borderRadius = "14% / 53%"
        divNext.style.background = "#d0d0d050"
        divNext.style.opacity = "0"
        divNext.style.display = "flex"
        divNext.style.flexDirection = "row"
        divNext.style.alignItems = "center"

        let divNe = document.createElement("div")
        divNe.style.width = "90px"
        divNe.style.marginLeft = "20%"
        divNe.style.display = "flex"
        divNe.style.justifyContent = "center"
        divNe.style.flexDirection = "column"

        let divNextArrow = document.createElement("div")
        divNextArrow.innerHTML = '<svg width="20px" height="20px" style="opacity:0;transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" stroke="#fff" transform="rotate(90)"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_iconCarrier"> <path clip-rule="evenodd" d="M12.    3.75317L21.5509 20.2501H2.44922L12.0001 3.75317ZM5.05089 18.7501H18.9492L12.0001 Z" fill="#fff"></path> </g></svg>'
            + '<svg width="20px" height="20px" style="opacity:0;transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" stroke="#fff" transform="rotate(90)"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_iconCarrier"> <path clip-rule="evenodd" d="M12.0001 3.75317L21.5509 20.2501H2.44922L12.0001 3.75317ZM5.05089 18.7501H18.9492L12.0001 Z" fill="#fff"></path> </g></svg>'
            + '<svg width="20px" height="20px" style="opacity:0;transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" stroke="#fff" transform="rotate(90)"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_iconCarrier"> <path clip-rule="evenodd" d="M12.0001 3.75317L21.5509 20.2501H2.44922L12.0001 3.75317ZM5.05089 18.7501H18.9492L12.0001 Z" fill="#fff"></path> </g></svg>'
        let textnext = document.createElement("p")
        textnext.textContent = "10 sec"
        textnext.style.color = "#fff"
        textnext.id = "textNext"
        let divPrevious = document.createElement("div")
        divPrevious.id = "previousTime"
        divPrevious.style.width = "100%"
        divPrevious.style.height = "100%"
        divPrevious.style.marginLeft = "-50%"
        divPrevious.style.borderRadius = "14% / 53%"
        divPrevious.style.background = "#d0d0d050"
        divPrevious.style.opacity = "0"
        divPrevious.style.display = "flex"
        divPrevious.style.flexDirection = "row-reverse"
        divPrevious.style.alignItems = "center"


        let divPrev = document.createElement("div")
        divPrev.style.width = "90px"
        divPrev.style.marginRight = "20%"
        divPrev.style.display = "flex"
        divPrev.style.justifyContent = "center"
        divPrev.style.flexDirection = "column"
        divPrev.style.alignItems = "center"

        let divPreviousArrow = document.createElement("div")
        divPreviousArrow.innerHTML = '<svg width="20px" height="20px" style="opacity:0;transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" stroke="#fff" transform="rotate(270)"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_iconCarrier"> <path clip-rule="evenodd" d="M12.0001 3.75317L21.5509 20.2501H2.44922L12.0001 3.75317ZM5.05089 18.7501H18.9492L12.0001 Z" fill="#fff"></path> </g></svg>'
            + '<svg width="20px" height="20px" style="opacity:0;transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" stroke="#fff" transform="rotate(270)"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_iconCarrier"> <path clip-rule="evenodd" d="M12.0001 3.75317L21.5509 20.2501H2.44922L12.0001 3.75317ZM5.05089 18.7501H18.9492L12.0001 Z" fill="#fff"></path> </g></svg>'
            + '<svg width="20px" height="20px" style="opacity:0;transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" stroke="#fff" transform="rotate(270)"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_iconCarrier"> <path clip-rule="evenodd" d="M12.0001 3.75317L21.5509 20.2501H2.44922L12.0001 3.75317ZM5.05089 18.7501H18.9492L12.0001 Z" fill="#fff"></path> </g></svg>'
        divNext.style.transition = "opacity .1s cubic-bezier(.4,0,1,1)"
        divPrevious.style.transition = "opacity .1s cubic-bezier(.4,0,1,1)"

        let textprev = document.createElement("p")
        textprev.textContent = "10 sec"
        textprev.style.color = "#fff"
        textprev.id = "textPrev"

        divNe.appendChild(divNextArrow)
        divNe.appendChild(textnext)
        divNext.appendChild(divNe)
        divPrev.appendChild(divPreviousArrow)
        divPrev.appendChild(textprev)
        divPrevious.appendChild(divPrev)
        div2.appendChild(divPrevious)
        div2.appendChild(divNext)
        div2.style.marginBottom = "-50px"
        div2.style.display = "flex"
        document.querySelector(".jw-controls").appendChild(div2)
        document.querySelector(".jw-controls").style.flexDirection = "column"
    }
    return div
}

function clickPlayer(event) {
    console.log("click")
    let clickPos = event.clientX / document.querySelector("html").offsetWidth

    if (checkMobile() && document.querySelector("html").offsetHeight - event.clientY > 50) {
        if (clickPos < 0.5)
            previousVideo()
        else
            nextVideo()
    }

    lastClickGlobal = Date.now()
}


function previousVideo() {
    let time = Date.now() - lastClick;
    lastClick = Date.now()
    if (time < 500) {
        prevTime = prevTime + 10
        nextTime = 0
        document.getElementById("textPrev").textContent = prevTime + " sec"
        document.getElementById("previousTime").style.opacity = "1"
        document.getElementById("nextTime").style.opacity = "0"
        prevAnimation()
        let video = document.querySelector("video")
        let time = video.currentTime - 10
        video.currentTime = time
        updatetimeCodeWithValue(time)
    }

}
function nextVideo() {
    let time = Date.now() - lastClick;
    lastClick = Date.now()
    if (time < 500) {
        nextTime = nextTime + 10
        prevTime = 0
        document.getElementById("textNext").textContent = nextTime + " sec"
        document.getElementById("nextTime").style.opacity = "1"
        document.getElementById("previousTime").style.opacity = "0"
        nextAnimation()
        let video = document.querySelector("video")
        let time = video.currentTime + 10
        video.currentTime = time
        updatetimeCodeWithValue(time)
    }
}


function createBar() {
    let bar = document.createElement("div")
    bar.style.background = "#FFFFFF33"
    bar.style.width = "100%"
    bar.style.height = "5px"
    bar.id = "bar"
    let barProgress = document.createElement("div")
    barProgress.style.background = "linear-gradient(to right, #f03 80%, #ff2791 100%)"
    barProgress.style.backgroundSize = "100%"
    barProgress.style.height = "100%"
    barProgress.style.width = "0%"
    barProgress.style.marginBottom = "-9px"
    barProgress.id = "barProgress"
    bar.appendChild(barProgress)

    let slider = document.createElement("div")
    slider.style.width = "13px"
    slider.style.height = "13px"
    slider.style.background = "#f03"
    slider.style.borderRadius = "100%"
    slider.id = "slider"
    slider.addEventListener('mousedown', function () { mouseDown = true }, true);
    slider.addEventListener('pointerdown', function () { mouseDown = true }, true);
    document.addEventListener('mouseup', function () { mouseDown = false })
    document.addEventListener('pointerup', function () { mouseDown = false })
    document.addEventListener('mousemove', sliderMove)
    document.addEventListener('pointermove', sliderMove)
    bar.appendChild(slider)
    bar.addEventListener("click", changeTimeCode)
    return bar
}

function changeTimeCode(event) {
    let video = document.querySelector("video")
    let time = video.duration * (event.clientX - document.getElementById("bar").getBoundingClientRect().left) / document.getElementById("bar").offsetWidth
    video.currentTime = time
    updatetimeCodeWithValue(time)
}
function sliderMove(event) {
    if (mouseDown) {
        let video = document.querySelector("video")
        let time = video.duration * (event.clientX - document.getElementById("bar").getBoundingClientRect().left) / document.getElementById("bar").offsetWidth
        video.currentTime = time
        updatetimeCodeWithValue(time)
    }
}

function createButton() {
    let buttons = document.createElement("div")
    buttons.style.height = "48px"
    buttons.id = "buttons"

    buttons.appendChild(createButtonLeft())
    buttons.appendChild(createButtonRight())
    buttons.style.display = "flex"
    buttons.style.justifyContent = "space-between"
    return buttons
}

function createButtonRight() {
    let video = document.querySelector("video")

    let buttonsRight = document.createElement("div")
    buttonsRight.style.height = "100%"
    buttonsRight.style.display = "flex"
    buttonsRight.style.alignItems = "center"
    let option = document.createElement("button")
    option.style.background = "transparent"
    option.style.border = "none"
    option.innerHTML = '<svg width="48px" height="48px" viewBox="0 0 36 36" ><path d="m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z" fill="#fff" id="ytp-id-19"></path></svg>'
    option.id = "option"
    let pictureInPucture = document.createElement("button")
    pictureInPucture.style.background = "transparent"
    pictureInPucture.style.border = "none"
    pictureInPucture.innerHTML = '<svg width="48px" height="48px"  viewBox="0 0 36 36"><path d="M25,17 L17,17 L17,23 L25,23 L25,17 L25,17 Z M29,25 L29,10.98 C29,9.88 28.1,9 27,9 L9,9 C7.9,9 7,9.88 7,10.98 L7,25 C7,26.1 7.9,27 9,27 L27,27 C28.1,27 29,26.1 29,25 L29,25 Z M27,25.02 L9,25.02 L9,10.97 L27,10.97 L27,25.02 L27,25.02 Z" fill="#fff"></path></svg>'
    pictureInPucture.id = "pictureInPucture"
    let fullScreen = document.createElement("button")
    fullScreen.style.background = "transparent"
    fullScreen.style.border = "none"
    fullScreen.innerHTML = '<svg width="48px" height="48px" viewBox="0 0 36 36" fill="white"><g class="ytp-fullscreen-button-corner-0"><use class="ytp-svg-shadow" xlink:href="#ytp-id-7"></use><path class="ytp-svg-fill" d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z" id="ytp-id-7"></path></g><g class="ytp-fullscreen-button-corner-1"><use class="ytp-svg-shadow" xlink:href="#ytp-id-8"></use><path class="ytp-svg-fill" d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z" id="ytp-id-8"></path></g><g class="ytp-fullscreen-button-corner-2"><use class="ytp-svg-shadow" xlink:href="#ytp-id-9"></use><path class="ytp-svg-fill" d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z" id="ytp-id-9"></path></g><g class="ytp-fullscreen-button-corner-3"><use class="ytp-svg-shadow" xlink:href="#ytp-id-10"></use><path class="ytp-svg-fill" d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z" id="ytp-id-10"></path></g></svg>'
    fullScreen.id = "fullScreen"
    fullScreen.addEventListener("click", fullScreenAction)
    pictureInPucture.addEventListener("click", function () {
        document.querySelector("video").requestPictureInPicture()
    })
    //buttonsRight.appendChild(option)
    buttonsRight.appendChild(pictureInPucture)
    buttonsRight.appendChild(fullScreen)
    return buttonsRight
}

function fullScreenAction() {
    if (isFullScreen)
        document.exitFullscreen()
    else
        document.querySelector("html").requestFullscreen()
    document.querySelector("html").focus()
}

function createButtonLeft() {
    let video = document.querySelector("video")
    let buttonsLeft = document.createElement("div")
    buttonsLeft.style.height = "100%"
    buttonsLeft.style.display = "flex"
    buttonsLeft.style.alignItems = "center"
    let play = document.createElement("button")
    play.style.background = "transparent"
    play.style.border = "none"
    play.setAttribute("status", "play")
    play.id = "playPause"
    play.addEventListener("click", playPause)
    let volume = document.createElement("button")
    if (video.paused) {
        play.innerHTML = '<svg width="48px" height="48px" viewBox="0 0 36 36" fill="white"><path d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"></path></svg>'
    }
    else {
        play.innerHTML = '<svg width="48px" height="48px" viewBox="0 0 36 36" fill="white"><path d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"></path></svg>'
    }
    video.addEventListener("pause", playPauseShow)
    video.addEventListener("play", playPauseShow)
    video.addEventListener("timeupdate", updatetimeCode)
    volume.style.width = "100%"
    volume.style.background = "transparent"
    volume.style.border = "none"
    buttonsLeft.appendChild(play)
    let skipOp = document.createElement("button")
    skipOp.id = "skipOp"
    skipOp.innerHTML = '<svg width="48px" height="48px" viewBox="0 0 36 36"><style>.small {font: 10px roboto;}</style><path  d="M 30 10 L 33 16  L 26.7 17 " fill="white"></path><path d="M 3 15 Q 15 7 29 14 " stroke="white" fill="transparent"></path><text x="6" y="24" class="small" fill="white">1:30</text></svg>'
    skipOp.style.background = "transparent"
    skipOp.style.border = "none"
    skipOp.addEventListener("click", skip)
    buttonsLeft.appendChild(skipOp)
    //buttonsLeft.appendChild(volume)
    let timeCode = document.createElement("p")
    timeCode.id = "timeCode"
    timeCode.textContent = getTime(0) + "/" + getTime(0)
    timeCode.style.color = "white"
    timeCode.style.fontSize = "15px"
    buttonsLeft.appendChild(timeCode)
    return buttonsLeft
}

function skip() {
    let video = document.querySelector("video")
    let time = video.currentTime + 90
    video.currentTime = time
    updatetimeCodeWithValue(time)
}

function updatetimeCode() {
    let barProgress = document.getElementById("barProgress")
    let slider = document.getElementById("slider")
    let video = document.querySelector("video")
    let timeCode = document.getElementById("timeCode")
    if (timeCode != null)
        timeCode.textContent = getTime(video.currentTime) + "/" + getTime(video.duration)
    if (barProgress != null)
        barProgress.style.width = video.currentTime / video.duration * 100 + "%"
    if (slider != null)
        slider.style.marginLeft = "calc(" + video.currentTime / video.duration * 100 + "% - 2px)"
}

function updatetimeCodeWithValue(currentTime) {
    let barProgress = document.getElementById("barProgress")
    let slider = document.getElementById("slider")
    let video = document.querySelector("video")
    let timeCode = document.getElementById("timeCode")
    if (timeCode != null)
        timeCode.textContent = getTime(currentTime) + "/" + getTime(video.duration)
    if (barProgress != null)
        barProgress.style.width = currentTime / video.duration * 100 + "%"
    if (slider != null)
        slider.style.marginLeft = "calc(" + currentTime / video.duration * 100 + "% - 2px)"
}

async function nextAnimation() {
    let index = 0
    for (let svg of document.getElementById("nextTime").querySelectorAll("svg")) {
        svg.style.opacity = 1
        await sleep(100)
        if (index > 0) {
            document.getElementById("nextTime").querySelectorAll("svg")[index - 1].style.opacity = 0
        }
        index = index + 1
    }
    await sleep(100)
    document.getElementById("nextTime").querySelectorAll("svg")[2].style.opacity = 0
}

async function prevAnimation() {
    let index = 2
    for (let svg of [...document.getElementById("previousTime").querySelectorAll("svg")].reverse()) {
        svg.style.opacity = 1
        await sleep(100)
        if (index < 2) {
            document.getElementById("previousTime").querySelectorAll("svg")[index + 1].style.opacity = 0
        }
        index = index - 1
    }
    await sleep(100)
    document.getElementById("previousTime").querySelectorAll("svg")[0].style.opacity = 0
}

function playPauseShow() {
    let video = document.querySelector("video")
    let play = document.getElementById("playPause")
    if (video.paused && play != null) {
        play.innerHTML = '<svg width="48px" height="48px" viewBox="0 0 36 36" fill="white"><path d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"></path></svg>'
    }
    else {
        if (play != null)
            play.innerHTML = '<svg width="48px" height="48px" viewBox="0 0 36 36" fill="white"><path d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"></path></svg>'
    }
}

function getTime(seconds) {
    let time = parseInt(seconds)
    let res = ""
    if (time > 60) {
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
    if (time > 3600) {
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

function checkMobile() {
    return navigator.userAgentData.mobile || navigator.userAgentData.platform == "Android"
}
function playPause() {
    let video = document.querySelector("video")
    if (video.paused) {
        video.play()
    }
    else {
        video.pause()
    }

}



main()







function captcha() {
    //console.log(document.querySelector('html'))
    //console.log(location.href)
    if (location.href.includes("www.google.com/recaptcha") && !solved) {
        let anchor = document.getElementById("recaptcha-anchor")
        console.log(anchor)
        console.log(document.querySelector("html"))

        if (anchor != null && !anchorClick) {
            anchor.click()
            anchorClick = true
        }

        //document.getElementById("solver-button").click()
        //solved == true
        //console.log("solved")
    }
}

