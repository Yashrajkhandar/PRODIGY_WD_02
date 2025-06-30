let startTime = null;
let elapsed = 0;
let interval = null;
let lapCount = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  const h = String(date.getUTCHours()).padStart(2, "0");
  const m = String(date.getUTCMinutes()).padStart(2, "0");
  const s = String(date.getUTCSeconds()).padStart(2, "0");
  const msStr = String(date.getUTCMilliseconds()).padStart(3, "0");
  return `${h}:${m}:${s}.${msStr}`;
}

function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  display.textContent = formatTime(diff);
}

document.getElementById("start").onclick = () => {
  if (!interval) {
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
  }
};

document.getElementById("pause").onclick = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
    elapsed += Date.now() - startTime;
  }
};

document.getElementById("reset").onclick = () => {
  clearInterval(interval);
  interval = null;
  elapsed = 0;
  lapCount = 0;
  display.textContent = "00:00:00.000";
  laps.innerHTML = "";
};

document.getElementById("lap").onclick = () => {
  if (interval) {
    lapCount++;
    const lapTime = formatTime(Date.now() - startTime + elapsed);
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${lapTime}`;
    laps.appendChild(li);
    laps.scrollTop = laps.scrollHeight;
  }
};

document.getElementById("theme-toggle").onclick = () => {
  document.body.classList.toggle("light-mode");
};
