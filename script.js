async function uploadPhoto() {
  const input = document.getElementById("photoInput");
  const status = document.getElementById("status");
  if (!input.files.length) {
    status.textContent = "Please select a photo!";
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = async function() {
    const base64Data = reader.result;
    const formData = new FormData();
    formData.append("name", file.name);
    formData.append("type", file.type);
    formData.append("file", base64Data);

    const uploadURL = "https://script.google.com/macros/s/AKfycbyXSNfHdABLmmsLBTzTFV2zSclLXeBjLTEszeLTfrii1TKgwT24XwdeQvkPK4oWiFye/exec"; // replace this

    status.textContent = "Uploading...";
    const response = await fetch(uploadURL, { method: "POST", body: formData });
    const text = await response.text();
    status.textContent = text;
  };

  reader.readAsDataURL(file);
}
