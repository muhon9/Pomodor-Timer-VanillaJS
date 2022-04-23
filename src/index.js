//Test import of styles. You can import Sass here if you use
import "@/styles/style.css";

const timeCounter = document.querySelector(".time-counter");

let time = 25 * 60 - 1;

function timer() {
  let hour = Math.floor(time / 60);
  let minutes = (time % 60).toFixed(0);
  timeCounter.textContent = `${hour}:${minutes > 9 ? minutes : "0" + minutes}`;
  time -= 1;
}

setInterval(timer, 1000);
