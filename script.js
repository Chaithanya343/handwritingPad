const canvas = document.getElementById("drawingCanvas");
const penColorInput = document.getElementById("penColor");
const penSizeInput = document.getElementById("penSize");

// Setup canvas size
canvas.width = 500;
canvas.height = 500;

// Create Signature Pad
const signaturePad = new SignaturePad(canvas, {
  backgroundColor: "white",
  penColor: penColorInput.value,
  minWidth: parseFloat(penSizeInput.value),
  maxWidth: parseFloat(penSizeInput.value),
});

// Dynamic pen color and size updates
penColorInput.addEventListener("input", () => {
  signaturePad.penColor = penColorInput.value;
});

penSizeInput.addEventListener("input", () => {
  const size = parseFloat(penSizeInput.value);
  signaturePad.minWidth = size;
  signaturePad.maxWidth = size;
});

function clearCanvas() {
  signaturePad.clear();
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
  link.href = signaturePad.toDataURL("image/png");
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
