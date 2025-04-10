const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", () => (drawing = true));
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseout", () => (drawing = false));
canvas.addEventListener("mousemove", draw);

// ✅ Touch support
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
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 4, 0, 2 * Math.PI);
  ctx.fill();
}

// ✅ Touch drawing handler
function drawTouch(e) {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, 2 * Math.PI);
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

  // Save text label
  const label = `${imageName},${text}\n`;
  const blob = new Blob([label], { type: "text/csv" });
  const labelLink = document.createElement("a");
  labelLink.download = "labels.csv";
  labelLink.href = URL.createObjectURL(blob);
  labelLink.click();

  clearCanvas();
  document.getElementById("textInput").value = "";
}
