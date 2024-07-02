(function () {
    const params = new URLSearchParams(window.location.search);
    const widgetId = params.get("widgetId");

    if (widgetId) {
        const chatBox = document.createElement("div");
        chatBox.id = "chat-box";
        chatBox.style.position = "fixed";
        chatBox.style.bottom = "10px";
        chatBox.style.right = "10px";
        chatBox.style.width = "300px";
        chatBox.style.height = "400px";
        chatBox.style.border = "1px solid #ccc";
        chatBox.style.backgroundColor = "#fff";
        chatBox.innerHTML = `<h2>Chat Widget - ID: ${widgetId}</h2><p>Welcome to our chat service!</p>`;

        document.body.appendChild(chatBox);
    } else {
        console.error("Widget ID is missing");
    }
})();
