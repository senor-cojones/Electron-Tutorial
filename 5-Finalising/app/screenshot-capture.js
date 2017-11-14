const electron = require("electron");
const fileSystem = require("fs");
const path = require("path");
const desktopCapturer = electron.desktopCapturer;
const ipc = electron.ipcRenderer;
const window = electron.window;

function onCapture(event, targetDir) {
    getImageSource(desktopCapturer, window, source => {
        const png = source.thumbnail.toPng();
        const filePath = path.join(targetDir, Math.floor(Math.random() * 20) + ".png");

        createScreenshot(png, filePath);
    });
}

function getImageSource(desktopCapturer, window, done) {
    const options = {
        types: ["window"],
        thumbnailSize: {
            width: 800,
            height: 600
        }
    };

    desktopCapturer.getSources(options, (error, sources) => {
        if (error) return console.log("Cannot capture window:", error);

        const isImageSource = source => source.name === "Electron Skeleton App";

        done(sources.filter(isImageSource)[0]);
    });
}

function createScreenshot(png, filePath) {
    fileSystem.writeFile(filePath, png, error => {
        if (error) return console.log("Failed to save screenshot:", error);
    });
}

ipc.on("capture", onCapture);
