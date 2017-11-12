const electron = require("electron");
const remote = electron.remote;
const closeButton = document.querySelector(".appClose");
let appWindow = remote.app;

function closeWindow() {
    appWindow.quit();
}

closeButton.addEventListener("click", closeWindow);
