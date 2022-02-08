const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");

let timerColor = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function addIntervalBtnStart() {
    timerColor = setInterval(() => {
        document.body.style.background = getRandomHexColor();



        if (timerColor !== null) {
            btnStart.setAttribute('disabled', true);
        }



    }, 1000)

}

function clearIntervalBtnStop() {
    clearInterval(timerColor);
    btnStart.removeAttribute("disabled")
}



btnStart.addEventListener("click", addIntervalBtnStart);

btnStop.addEventListener("click", clearIntervalBtnStop);