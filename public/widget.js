(function () {
    const script = document.currentScript;
    const src = new URL(script.src);
    const params = new URLSearchParams(src.search);

    const color = params.get("color") || "#000"; // Default color is black
    const fontSize = params.get("fontSize") || "16px"; // Default font size
    const width = params.get("width") || "300px"; // Default width
    const height = params.get("height") || "400px"; // Default height
    const boxShadow =
        params.get("boxShadow") || "0px 4px 8px rgba(0, 0, 0, 0.1)"; // Default box shadow

    const chatBox = document.createElement("div");
    chatBox.id = "chat-box";
    chatBox.style.position = "fixed";
    chatBox.style.bottom = "10px";
    chatBox.style.right = "10px";
    chatBox.style.width = width;
    chatBox.style.height = height;
    chatBox.style.border = "1px solid #ccc";
    chatBox.style.backgroundColor = "#fff";
    chatBox.style.color = color;
    chatBox.style.fontSize = fontSize;
    chatBox.style.boxShadow = boxShadow;
    chatBox.innerHTML = `<h2>Atai natural</h2><p>Welcome to our chat service!</p>`;

    document.body.appendChild(chatBox);
})();
