//Test import of styles. You can import Sass here if you use
import "@/styles/style.css";

const counterDisplay = document.querySelector(".time-counter");
const playPauseBtn = document.querySelector(".play-pause-button");
const resetBtn = document.querySelector(".reset-button");

let timer;
let sessionType = "session";
let sessionLength = 25;
let breakLength = 5;
let time = 1500;
let timerOn = false;

function displayCount() {
  let minutes = Math.floor(time / 60);
  let seconds = (time % 60).toFixed(0);
  counterDisplay.textContent = `${minutes}:${
    seconds > 9 ? seconds : "0" + seconds
  }`;
}

function setTime(newTime) {
  time = newTime * 60;
  displayCount();
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    displayCount();
  }, 1000);
}

function handlePlayPause() {
  if (timerOn) {
    clearInterval(timer);
    timerOn = false;
    playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  } else {
    startTimer();
    timerOn = true;
    playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  }
}

function handleReset() {
  clearInterval(timer);
  setTime(sessionLength);
  playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  sessionType = "session";
  timerOn = false;
}

playPauseBtn.addEventListener("click", handlePlayPause);
resetBtn.addEventListener("click", handleReset);
