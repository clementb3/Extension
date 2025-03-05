var mouseDown = false
var lastClick = Date.now()
var lastClickGlobal = Date.now()
let prevTime = 0
let nextTime = 0
let Time = 10
let isFullScreen = false
let play = false
let changePLayer = false
let doubleTaps = [1, 2, 3, 5, 10, 15, 20]
// Svg Icon
let svgFullscreenOn = '<svg width="36px" height="36px"  viewBox="0 0 36 36" fill="white"><path d="m 7,16 v -8 h 8 v 1 h -7 v 7"></path><path d="m 19,8 h 8 v 8 h -1 v -7 h -7"></path><path d="m 7,20 v 8 h 8 v -1 h -7 v -7" ></path><path d="m 19,28 h 8 v -8 h -1 v 7 h -7" ></path></svg>'
let svgFullscreenOff = '<svg width="36px" height="36px  " viewBox="0 0 36 36" fill="white"><path d="m 7,15 h 7 v -7 h -1 v 6 h -6" ></path><path d="m 21,8 v 7 h 7 v -1 h -6 v -6" ></path><path d="m 7,22 h 7 v 7 h -1 v -6 h -6"></path><path d="m 21,29 v -7 h 7 v 1 h -6 v 6"></path></svg>'
let svgNextArrow = '<svg width="20px" height="20px" style="opacity:0;transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);" viewBox="0 0 29 32" fill="white"><path d="M3 3 v29 L26 16"></path></svg>'
let svgPrevArrow = '<svg width="20px" height="20px" style="opacity:0;transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);" transform="rotate(180)" viewBox="0 0 29 32" fill="white"><path d="M3 3 v29 L26 16"></path></svg>'
let svgOption = '<svg width="48px" height="48px" viewBox="0 0 36 36" ><path d="m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z" fill="#fff" id="ytp-id-19"></path></svg>'
let svgPictureInPicture = '<svg width="48px" height="48px"  viewBox="0 0 36 36"><path d="M25,17 L17,17 L17,23 L25,23 L25,17 L25,17 Z M29,25 L29,10.98 C29,9.88 28.1,9 27,9 L9,9 C7.9,9 7,9.88 7,10.98 L7,25 C7,26.1 7.9,27 9,27 L27,27 C28.1,27 29,26.1 29,25 L29,25 Z M27,25.02 L9,25.02 L9,10.97 L27,10.97 L27,25.02 L27,25.02 Z" fill="#fff"></path></svg>'
let svgPause = '<svg style="margin-left:-3px" width="48px" height="48px" viewBox="0 0 36 36" fill="white"><path d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"></path><svg>'
let svgPlay = '<svg style="margin-left:-4px" width="48px" height="48px" viewBox="0 0 36 36" fill="white"><path d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"></path></svg>'
let svgSkipOp = '<svg width="48px" height="48px" viewBox="0 0 36 36"><style>.small {font: 10px roboto;}</style><path  d="M 30 10 L 33 16  L 26.7 17 " fill="white"></path><path d="M 3 15 Q 15 7 29 14 " stroke="white" fill="transparent"></path><text x="6" y="24" class="small" fill="white">1:30</text></svg>'
let timeTemp = localStorage.getItem("time");
if (timeTemp != null) {
    Time = parseInt(timeTemp)
}

document.addEventListener('fullscreenchange', () => {
    isFullScreen = !isFullScreen
});

document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowRight") {
        let video = document.querySelector("video")
        let time = video.currentTime + Time
        video.currentTime = time
        updatetimeCodeWithValue(time)
    }
    if (event.key == "ArrowLeft") {
        let video = document.querySelector("video")
        let time = video.currentTime - Time
        video.currentTime = time
        updatetimeCodeWithValue(time)
    }
    if (event.key == "f") {
        fullScreenAction()
    }
    if (event.key == "k") {
        playPause()
    }

})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function hideAll(elementHtml) {
    let hasVideo = false
    let elementChild = elementHtml.children
    if (elementHtml.nodeName == "VIDEO" || elementHtml.className == "controls" || elementHtml.className == "setting") {
        return true
    }
    if (elementChild.length == 0) {
        elementHtml.style.visibility = 'hidden'
        elementHtml.style.pointerEvents = 'none'
        return false
    }
    for (let element of elementChild) {
        if (hideAll(element))
            hasVideo = true
    }
    elementHtml.style.pointerEvents = 'none'
    if (hasVideo) {
        return true
    }
    else {
        elementHtml.style.visibility = 'hidden'
        return false
    }
}

async function Player() {
    try {
        if (!play)
            play = playAuto(play)
        if (!changePLayer || document.getElementsByClassName("controls").length == 0) {
            document.querySelector("html").style.pointerEvents = "none"
            hideAll(document.querySelector("body"))
            let controls = document.createElement("div")
            document.querySelector("body").appendChild(controls)
            if (controls != null) {
                controls.innerHTML = ""
                controls.className = "controls"
                controls.appendChild(createPlayer())
            }
            changePLayer = true
        }
        let overlay = document.getElementsByClassName("custom-overlay")[0]
        if (overlay != null) {
            document.querySelector("body").removeChild(overlay)
        }
    }
    catch (ex) {
        console.error(ex)
    }
}

function updateOpacity() {
    let controls = document.getElementById("controlButton")
    let body = document.querySelector("body")
    let divPlay = document.getElementById("divPlay")
    let video = document.querySelector("video")
    if (controls != null && video != null) {
        if (Date.now() - lastClick > 600) {
            let nextTimeOpacity = document.getElementById("nextTime")
            let prevTimeOpacity = document.getElementById("previousTime")
            if (nextTimeOpacity != null)
                nextTimeOpacity.style.opacity = "0"
            if (prevTimeOpacity != null)
                prevTimeOpacity.style.opacity = "0"
            prevTime = 0
            nextTime = 0

        }
        if (Date.now() - lastClick > 1000 && checkMobile()) {

            let divPrev = document.getElementById("previousTime")
            let divNext = document.getElementById("nextTime")
            if (divNext.querySelector(".circleDiv") != null)
                divNext.removeChild(divNext.querySelector(".circleDiv"))
            if (divPrev.querySelector(".circleDiv") != null)
                divPrev.removeChild(divPrev.querySelector(".circleDiv"))
        }
        if (Date.now() - lastClickGlobal < 2000 || video.paused) {
            controls.style.opacity = "1"
            body.style.cursor = "auto"
            if (divPlay != null)
                divPlay.style.opacity = "1"

        }
        else {
            body.style.cursor = "none"
            controls.style.opacity = "0"
            if (divPlay != null)
                divPlay.style.opacity = "0"
        }
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
            playButton.click()
            return true
        }
    }
    catch (ex) {
        console.error(ex)
    }
    return false
}

function removeEvent() {
    try {
        document.body.removeEventListener('click', getEventListeners(document.body).click[0].listener)
        document.body.removeEventListener('touchend', getEventListeners(document.body).touchend[0].listener)
        for (var i = 0; i < 4; i++) {
            document.body.removeEventListener('touchmove', getEventListeners(document.body).touchmove[i].listener)
            document.body.removeEventListener('touchstart', getEventListeners(document.body).touchstart[i].listener)

        }
        document.body.removeEventListener('focusin', getEventListeners(document.body).focusin[0].listener)
        document.body.removeEventListener('paste', getEventListeners(document.body).paste[0].listener)
        document.body.removeEventListener('mousemove', getEventListeners(document.body).mousemove[0].listener)
        document.body.removeEventListener('scroll', getEventListeners(document.body).scroll[0].listener)
    }
    catch (ex) {
        console.log(ex)
    }
}

async function main() {
    while (!changePLayer || document.getElementsByClassName("controls").length == 0) {
        Player()
        hideAll(document.querySelector("body"))
        updateOpacity()
        await sleep(50)
    }
    while (true) {
        hideAll(document.querySelector("body"))
        updateOpacity()
        await sleep(50)
    }
}

function createPlayer() {
    document.querySelector(".controls").addEventListener("click", clickPlayer)
    document.querySelector("html").addEventListener("fullscreenchange", function (e) {
        if (isFullScreen) {
            fullScreen.innerHTML = svgFullscreenOn
        }
        else {
            fullScreen.innerHTML = svgFullscreenOff
        }
    });
    document.querySelector(".controls").addEventListener("mousemove", function () { lastClickGlobal = Date.now() })
    let div = document.createElement("div")

    div.className = "controlBar"
    let controls = document.createElement("div")
    controls.style.width = "97%"
    controls.style.height = "60px"
    controls.style.transition = "opacity .1s cubic-bezier(.4,0,1,1)"
    controls.appendChild(createBar())
    controls.appendChild(createButton())

    controls.id = "controlButton"
    controls.className = "controlButton"
    div.appendChild(controls)
    if (checkMobile()) {
        let div2 = document.createElement("div")
        div2.className = "mobileControl"

        let divNext = document.createElement("div")
        divNext.id = "nextTime"
        divNext.className = "nextTime"
        let divPrevious = document.createElement("div")
        divPrevious.id = "previousTime"
        divPrevious.className = "previousTime"


        let divNe = document.createElement("div")
        divNe.className = "nextDiv"



        let divPrev = document.createElement("div")
        divPrev.className = "prevDiv"


        let divPreviousArrow = document.createElement("div")
        divPreviousArrow.innerHTML = svgPrevArrow + svgPrevArrow + svgPrevArrow
        let textprev = document.createElement("p")
        textprev.textContent = "10 sec"
        textprev.id = "textPrev"

        let divNextArrow = document.createElement("div")
        divNextArrow.innerHTML = svgNextArrow + svgNextArrow + svgNextArrow
        let textnext = document.createElement("p")
        textnext.textContent = "10 sec"
        textnext.id = "textNext"


        divNe.appendChild(divNextArrow)
        divNe.appendChild(textnext)
        divNext.appendChild(divNe)
        divPrev.appendChild(divPreviousArrow)
        divPrev.appendChild(textprev)
        divPrevious.appendChild(divPrev)
        div2.appendChild(divPrevious)
        div2.appendChild(divNext)

        document.querySelector(".controls").appendChild(div2)
        document.querySelector(".controls").style.flexDirection = "column"
    }
    return div
}

function clickPlayer(event) {
    let clickPos = event.clientX / document.querySelector("html").offsetWidth
    let setting = document.querySelector(".setting")
    if (setting != null) {
        if (event.clientX < document.querySelector("html").offsetWidth - 170 || event.clientX > document.querySelector("html").offsetWidth - 10) {
            document.querySelector("body").removeChild(setting)
        }
    }

    if (checkMobile() && document.querySelector("html").offsetHeight - event.clientY > 50
        && (document.querySelector("html").offsetWidth / 2 - 50 > event.clientX || document.querySelector("html").offsetWidth / 2 + 50 < event.clientX)) {
        if (clickPos < 0.5)
            previousVideo(event)
        else
            nextVideo(event)
    }

    lastClickGlobal = Date.now()
}


function previousVideo(event) {
    let time = Date.now() - lastClick;
    lastClick = Date.now()
    if (time < 500) {
        prevTime = prevTime + Time
        nextTime = 0
        document.getElementById("textPrev").textContent = prevTime + " sec"
        document.getElementById("previousTime").style.opacity = "1"
        document.getElementById("nextTime").style.opacity = "0"
        prevAnimation()
        let video = document.querySelector("video")
        let time = video.currentTime - Time
        video.currentTime = time
        updatetimeCodeWithValue(time)
        propagationClick(event)
    }
}

async function propagationClick(event) {
    let documentOffsetX = document.querySelector("html").offsetWidth
    let documentOffsetY = document.querySelector("html").offsetHeight
    let clickPos = event.clientX / documentOffsetX
    let divPrev = document.getElementById("previousTime")
    let divNext = document.getElementById("nextTime")
    let circle = document.createElement("div")
    if (divNext.querySelector(".circleDiv") != null)
        divNext.removeChild(divNext.querySelector(".circleDiv"))
    if (divPrev.querySelector(".circleDiv") != null)
        divPrev.removeChild(divPrev.querySelector(".circleDiv"))
    circle.className = "circle"
    let divCircle = document.createElement("div")
    divCircle.style.marginTop = -(10000 - documentOffsetY) / 2 + (event.clientY - documentOffsetY / 2)
    divCircle.style.marginLeft = -(10000 - (10000 - documentOffsetX / 2) / 2 - (event.clientX - documentOffsetX / 4))
    divCircle.style.marginRight = -(10000 - documentOffsetX / 2) / 2 - (event.clientX - documentOffsetX / 4)
    divCircle.className = "circleDiv"

    divCircle.appendChild(circle)
    if (clickPos > 0.5) {
        divNext.prepend(divCircle)
    }
    else {
        divPrev.prepend(divCircle)
    }
    await sleep(50)
    circle.style.width = "1000px"
    circle.style.height = "1000px"
}
function nextVideo(event) {
    let time = Date.now() - lastClick;
    lastClick = Date.now()
    if (time < 500) {
        nextTime = nextTime + Time
        prevTime = 0
        document.getElementById("textNext").textContent = nextTime + " sec"
        document.getElementById("nextTime").style.opacity = "1"
        document.getElementById("previousTime").style.opacity = "0"
        nextAnimation()
        let video = document.querySelector("video")
        let time = video.currentTime + Time
        video.currentTime = time
        updatetimeCodeWithValue(time)
        propagationClick(event)

    }
}


function createBar() {
    let barGlobal = document.createElement("div")
    barGlobal.id = "barGlobal"

    let bar = document.createElement("div")

    bar.id = "bar"
    bar.className = "bar"
    let barBackground = document.createElement("div")
    let barProgress = document.createElement("div")
    barProgress.id = "barProgress"
    barBackground.appendChild(barProgress)
    bar.appendChild(barBackground)

    let bar2 = document.createElement("div")

    bar2.id = "bar2"
    bar2.className = "bar"
    let slider = document.createElement("div")
    slider.id = "slider"
    slider.addEventListener('mousedown', function () { mouseDown = true }, true);
    slider.addEventListener('pointerdown', function () { mouseDown = true }, true);
    document.addEventListener('mouseup', function () { mouseDown = false })
    document.addEventListener('pointerup', function () { mouseDown = false })
    document.addEventListener('mousemove', sliderMove)
    document.addEventListener('pointermove', sliderMove)
    bar2.appendChild(slider)
    bar2.addEventListener("click", changeTimeCode)
    barGlobal.appendChild(bar)
    barGlobal.appendChild(bar2)
    return barGlobal
}

function changeTimeCode(event) {
    try {
        let video = document.querySelector("video")
        let time = video.duration * (event.clientX - document.getElementById("bar").getBoundingClientRect().left) / document.getElementById("bar").offsetWidth
        video.currentTime = time
        updatetimeCodeWithValue(time)

    }
    catch {
        updatetimeCodeWithValue(0)
    }
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
    buttons.id = "buttons"
    buttons.className = "buttons"
    buttons.appendChild(createButtonLeft())
    buttons.appendChild(createButtonRight())
    return buttons
}

function createButtonRight() {
    let buttonsRight = document.createElement("div")
    buttonsRight.className = "buttonsRight"
    let option = document.createElement("button")
    option.innerHTML = svgOption
    option.id = "option"
    let pictureInPucture = document.createElement("button")
    pictureInPucture.innerHTML = svgPictureInPicture
    pictureInPucture.id = "pictureInPucture"
    let fullScreen = document.createElement("button")
    fullScreen.innerHTML = svgFullscreenOn
    fullScreen.id = "fullScreen"
    fullScreen.addEventListener("click", fullScreenAction)
    pictureInPucture.addEventListener("click", function () {
        try {
            document.querySelector("video").requestPictureInPicture()
        }
        catch { }
    })
    option.addEventListener("click", optionSetting)
    buttonsRight.appendChild(option)
    buttonsRight.appendChild(pictureInPucture)
    buttonsRight.appendChild(fullScreen)
    return buttonsRight
}

function optionSetting() {
    let setting = document.createElement("div")
    setting.className = "setting"

    for (let time of doubleTaps) {
        let timeElement = document.createElement("button")
        timeElement.value = time
        timeElement.textContent = time + " SECONDES"
        if (time == Time) {
            timeElement.style.background = "rgb(201, 201, 201, 0.20)"
        }
        timeElement.addEventListener("click", changeTimeDoubleTaps)
        setting.appendChild(timeElement)
    }
    if (document.querySelector(".setting") == null)
        document.querySelector("body").appendChild(setting)
}

function changeTimeDoubleTaps(event) {
    Time = parseInt(event.srcElement.value)
    localStorage.setItem("time", Time);

    for (let element of document.querySelectorAll(".setting > button")) {
        element.style.background = "transparent"
    }
    event.srcElement.style.background = "rgb(201, 201, 201, 0.20)"
}

function fullScreenAction() {
    if (isFullScreen)
        document.exitFullscreen()
    else
        document.querySelector("html").requestFullscreen()
    document.querySelector("#playPause").focus()
}

function createButtonLeft() {
    let video = document.querySelector("video")
    let buttonsLeft = document.createElement("div")
    let play = document.createElement("button")
    if (checkMobile()) {
        play.style.background = "rgb(73 73 73 / 44%)"
        play.style.width = "50px"
        play.style.height = "50px"
        play.style.borderRadius = "100%"
    }
    play.setAttribute("status", "play")
    play.id = "playPause"
    play.addEventListener("click", playPause)
    let volume = document.createElement("button")
    if (video.paused) {
        play.innerHTML = svgPause
    }
    else {
        play.innerHTML = svgPlay
    }
    video.addEventListener("pause", playPauseShow)
    video.addEventListener("play", playPauseShow)
    video.addEventListener("timeupdate", updatetimeCode)
    if (!checkMobile())
        buttonsLeft.appendChild(play)
    else {
        let divPlay = document.createElement("div")
        divPlay.id = "divPlay"
        divPlay.className = "divPlay"
        divPlay.appendChild(play)
        document.querySelector(".controls").appendChild(divPlay)
    }
    let skipOp = document.createElement("button")
    skipOp.id = "skipOp"
    skipOp.innerHTML = svgSkipOp
    skipOp.addEventListener("click", skip)
    if (!location.href.includes("https://dooodster.com"))
        buttonsLeft.appendChild(skipOp)
    //buttonsLeft.appendChild(volume)
    let timeCode = document.createElement("p")
    timeCode.id = "timeCode"
    timeCode.className = "timeCode"
    timeCode.textContent = getTime(0) + "/" + getTime(0)
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
        slider.style.marginLeft = "calc(" + currentTime / video.duration * 100 + "% - 6.5px)"
}

async function nextAnimation() {
    document.getElementById("nextTime").querySelectorAll("svg")[0].style.opacity = 1
    await sleep(150)
    document.getElementById("nextTime").querySelectorAll("svg")[1].style.opacity = 1
    await sleep(150)
    document.getElementById("nextTime").querySelectorAll("svg")[0].style.opacity = 0
    document.getElementById("nextTime").querySelectorAll("svg")[2].style.opacity = 1
    await sleep(150)
    document.getElementById("nextTime").querySelectorAll("svg")[1].style.opacity = 0
    await sleep(150)
    document.getElementById("nextTime").querySelectorAll("svg")[2].style.opacity = 0
}

async function prevAnimation() {
    document.getElementById("previousTime").querySelectorAll("svg")[2].style.opacity = 1
    await sleep(150)
    document.getElementById("previousTime").querySelectorAll("svg")[1].style.opacity = 1
    await sleep(150)
    document.getElementById("previousTime").querySelectorAll("svg")[2].style.opacity = 0
    document.getElementById("previousTime").querySelectorAll("svg")[0].style.opacity = 1
    await sleep(150)
    document.getElementById("previousTime").querySelectorAll("svg")[1].style.opacity = 0
    await sleep(150)
    document.getElementById("previousTime").querySelectorAll("svg")[0].style.opacity = 0
}

function playPauseShow() {
    let video = document.querySelector("video")
    let play = document.getElementById("playPause")
    if (video.paused && play != null) {
        play.innerHTML = svgPause
    }
    else {
        if (play != null) {
            play.innerHTML = svgPlay
        }
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

