//importing stylesheet
import "@/styles/style.css";

//declaring needed variables
let timer; // Defining the interval timer
let sessionLength = 25;
let breakLength = 5;
let time = 1500; // Converted the time in seconds to calculate easily
let timerOn = false; // Timer is running or not
let sessionType = "Session"; // Pomodoro session or break session is running

//Function to display the couting time in dom
function displayCount() {
  let minutes = Math.floor(time / 60);
  let seconds = (time % 60).toFixed(0);
  counterDisplay.textContent = `${minutes}:${
    seconds > 9 ? seconds : "0" + seconds
  }`;
  document.querySelector(".session-type").textContent = sessionType;
}

// Will receive the time, convert it to seconds and call the display function to change the DOM
function setTime(newTime) {
  time = newTime * 60;
  displayCount();
}

// Function to start the timer
function startTimer() {
  clearInterval(timer); //clear the timer if any exsist
  timer = setInterval(() => {
    if (time !== 0) {
      time--;
    } else {
      switchMode();
    }
    displayCount();
  }, 1000);
}

//function to switch mode from Pomodoro Session to Break and vise-versa
function switchMode() {
  if (sessionType !== "Break") {
    sessionType = "Break";
    setTime(breakLength);
  } else {
    sessionType = "Session";
    setTime(sessionLength);
  }
}

// Makes change in DOM after pressing Increment and Decrement button
function setSessionLength() {
  document.querySelector(".session-length").textContent = sessionLength;
}

function setBreakLength() {
  document.querySelector(".break-length").textContent = breakLength;
}

// Disable all the control button (Ex: Session Increment, Break Decrement) when the timer is running
function disalbeControlBtns() {
  sessionIncBtn.disabled = true;
  sessionDecBtn.disabled = true;
  breakIncBtn.disabled = true;
  breakDecBtn.disabled = true;
}

// Enable the buttons when the timer is paused or stoped
function enableControlBtns() {
  sessionIncBtn.disabled = false;
  sessionDecBtn.disabled = false;
  breakIncBtn.disabled = false;
  breakDecBtn.disabled = false;
}

// Function to handle play and pause of the timer
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

// these will reset all the variable to initial state when user press reset button
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

// Selecting elements
const counterDisplay = document.querySelector(".time-counter");
const playPauseBtn = document.querySelector(".play-pause-button");
const resetBtn = document.querySelector(".reset-button");
const breakIncBtn = document.querySelector("#break-increment");
const breakDecBtn = document.querySelector("#break-decrement");
const sessionIncBtn = document.querySelector("#session-increment");
const sessionDecBtn = document.querySelector("#session-decrement");

// Assigning Event Listener
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
