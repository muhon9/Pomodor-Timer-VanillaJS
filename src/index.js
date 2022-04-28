//Test import of styles. You can import Sass here if you use
import "@/styles/style.css";

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

function setSessionLength() {
  document.querySelector(".session-length").textContent = sessionLength;
}

function setBreakLength() {
  document.querySelector(".break-length").textContent = breakLength;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (time !== 0) {
      time--;
    } else {
      switchMode();
    }
    displayCount();
  }, 1000);
}

function switchMode() {
  if (sessionType !== "break") {
    sessionType = "break";
    setTime(breakLength);
    document.querySelector(".session-type").textContent = "Break";
  } else {
    sessionType = "session";
    setTime(sessionLength);
    document.querySelector(".session-type").textContent = "Break";
  }
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
  sessionLength = 25;
  breakLength = 5;
  setBreakLength();
  setSessionLength();
  setTime(sessionLength);
  playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  sessionType = "session";
  timerOn = false;
}

const counterDisplay = document.querySelector(".time-counter");
const playPauseBtn = document.querySelector(".play-pause-button");
const resetBtn = document.querySelector(".reset-button");
const breakIncBtn = document.querySelector("#break-increment");
const breakDecBtn = document.querySelector("#break-decrement");
const sessionIncBtn = document.querySelector("#session-increment");
const sessionDecBtn = document.querySelector("#session-decrement");

playPauseBtn.addEventListener("click", handlePlayPause);
resetBtn.addEventListener("click", handleReset);
breakIncBtn.addEventListener("click", () => {
  breakLength++;
  setBreakLength();
});

breakDecBtn.addEventListener("click", () => {
  breakLength--;
  setBreakLength();
});
sessionIncBtn.addEventListener("click", () => {
  sessionLength++;
  setSessionLength();
  setTime(sessionLength);
});
sessionDecBtn.addEventListener("click", () => {
  sessionLength--;
  setSessionLength();
  setTime(sessionLength);
});
