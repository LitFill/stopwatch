const timeElement = document.getElementById("time");
const lapTimeElement = document.getElementById("lap");
const leftButton = document.getElementById("btnLeft");
const rightButton = document.getElementById("btnRight");

const lapTimes = [];
let elapsedTime = 0;
let interval;
let isCounting = false;

function formatTime(time) {
    const minutes = Math.floor(time / (60 * 100));
    const seconds = Math.floor((time / 100) % 60);
    const miliseconds = time % 100;
    return (
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds) +
        "." +
        (miliseconds < 10 ? "0" + miliseconds : miliseconds)
    );
}

function formatTimeShort(time) {
    const minutes = Math.floor(time / (60 * 100));
    const seconds = Math.floor((time / 100) % 60);
    const milliseconds = time % 100;

    let formattedTime = "";
    if (minutes > 0) {
        formattedTime += `${minutes < 10 ? "0" + minutes : minutes}:`;
    }
    formattedTime += `${seconds < 10 ? "0" + seconds : seconds}.${
        milliseconds < 10 ? "0" + milliseconds : milliseconds
    }`;

    return formattedTime;
}

function startCounting() {
    if ((isCounting = !isCounting)) {
        interval = setInterval(() => {
            elapsedTime += 1;
            displayTime();
            console.log(elapsedTime);
        }, 10);
        leftButton.innerText = "pause";
        rightButton.innerText = "lap";
    } else {
        clearInterval(interval);
        leftButton.innerText = "start";
        rightButton.innerText = "reset";
    }
}

function resetCount() {
    if (isCounting) {
        // lapTimes.push(formatTime(elapsedTime));
        lapTimes.push(elapsedTime);
        displayLapTimes();
    } else {
        elapsedTime = 0;
        displayTime();
        lapTimes.splice(0, lapTimes.length);
        lapTimeElement.innerText = "lap time:";
        // displayLapTimes();
    }
}

function displayTime() {
    timeElement.innerText = formatTime(elapsedTime);
    if (!elapsedTime) {
        rightButton.disabled = true;
        // rightButton.style.opacity = 0.5;
        // rightButton.style.cursor = 'not-allowed';
    } else {
        rightButton.disabled = false;
        // rightButton.style.opacity = 1;
        // rightButton.style.cursor = 'pointer';
    }
}

// const displayLapTimes = () => {
//     let text = '';
//     lapTimes.forEach((lapTime, index) => {
//         text += `\n${index + 1}. ${lapTime}`;
//     });
//     lapTimeElement.innerText = text;
//     text = '';
// };

// const displayLapTimes = () => lapTimeElement.innerText = lapTimes.map((lapTime, index) => `${index + 1}. ${lapTime}`).join('\n');
function displayLapTimes() {
    let text = "";
    lapTimes.forEach((lapTime, index) => {
        if (index > 0) {
            const prevLapTime = lapTimes[index - 1];
            const lapTimeDiff = lapTime - prevLapTime;
            text += `\n${index + 1}. ${formatTime(lapTime)} (+${formatTimeShort(
                lapTimeDiff
            )})`;
        } else {
            text += `\n${index + 1}. ${formatTime(lapTime)} (+${formatTimeShort(
                lapTime
            )})`;
        }
    });
    lapTimeElement.innerText = text;
}

displayTime();

leftButton.addEventListener("click", startCounting);
rightButton.addEventListener("click", resetCount);
