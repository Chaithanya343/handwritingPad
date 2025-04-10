const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// A4 resolution in px at 96 DPI
canvas.width = 500;
canvas.height = 500;

// Fill canvas with white initially
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let drawing = false;

const penColorInput = document.getElementById("penColor");
const penSizeInput = document.getElementById("penSize");

// Mouse events
canvas.addEventListener("mousedown", () => (drawing = true));
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseout", () => (drawing = false));
canvas.addEventListener("mousemove", draw);

// Touch events
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  drawing = true;
  drawTouch(e);
});
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  drawTouch(e);
});
canvas.addEventListener("touchend", () => {
  drawing = false;
});

function draw(e) {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.fillStyle = penColorInput.value;
  ctx.beginPath();
  ctx.arc(x, y, parseInt(penSizeInput.value), 0, 2 * Math.PI);
  ctx.fill();
}

function drawTouch(e) {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  ctx.fillStyle = penColorInput.value;
  ctx.beginPath();
  ctx.arc(x, y, parseInt(penSizeInput.value), 0, 2 * Math.PI);
  ctx.fill();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveData() {
  const text = document.getElementById("textInput").value.trim();
  if (!text) {
    alert("Please enter the text you wrote.");
    return;
  }

  const imageName = `sentence_${Date.now()}.png`;

  // Save image
  const link = document.createElement("a");
  link.download = imageName;
  link.href = canvas.toDataURL();
  link.click();

  // Save label
  const label = `${imageName},${text}\n`;
  const blob = new Blob([label], { type: "text/csv" });
  const labelLink = document.createElement("a");
  labelLink.download = "labels.csv";
  labelLink.href = URL.createObjectURL(blob);
  labelLink.click();

  clearCanvas();
  document.getElementById("textInput").value = "";
}
