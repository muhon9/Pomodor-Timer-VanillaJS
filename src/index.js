//Test import of styles. You can import Sass here if you use
import "@/styles/style.css";

let timer;
let sessionType = "Session";
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
  document.querySelector(".session-type").textContent = sessionType;
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
  if (sessionType !== "Break") {
    sessionType = "Break";
    setTime(breakLength);
  } else {
    sessionType = "Session";
    setTime(sessionLength);
  }
}

function disalbeControlBtns() {
  sessionIncBtn.disabled = true;
  sessionDecBtn.disabled = true;
  breakIncBtn.disabled = true;
  breakDecBtn.disabled = true;
}

function enableControlBtns() {
  sessionIncBtn.disabled = false;
  sessionDecBtn.disabled = false;
  breakIncBtn.disabled = false;
  breakDecBtn.disabled = false;
}

function handlePlayPause() {
  if (timerOn) {
    clearInterval(timer);
    timerOn = false;
    playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    enableControlBtns();
  } else {
    startTimer();
    disalbeControlBtns();
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
  sessionType = "Session";
  setTime(sessionLength);
  enableControlBtns();
  playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
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
  if (breakLength < 60) {
    breakLength++;
  }
  setBreakLength();
});

breakDecBtn.addEventListener("click", () => {
  if (breakLength > 0) {
    breakLength--;
  }
  setBreakLength();
});

sessionIncBtn.addEventListener("click", () => {
  if (sessionLength < 60) {
    sessionLength++;
  }
  setSessionLength();
  setTime(sessionLength);
});
sessionDecBtn.addEventListener("click", () => {
  if (sessionLength > 1) {
    sessionLength--;
  }
  setSessionLength();
  setTime(sessionLength);
});
