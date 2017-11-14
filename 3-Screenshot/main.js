const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;
const name = electron.app.getName();
const Tray = electron.Tray;
//Setup a global keyboard shortcut
const globalShortcut = electron.globalShortcut;
//Setup the Electron shell to allow shell commands
const shell = electron.shell;
//Setup screenshot folder path
const screenshotPath = path.join(__dirname, "saved_screenshots");

let mainWindow;
//Add View menu for screenshots
let menuTemplate = [
    {
        label: "File",
        submenu: [{
            label: "Open",
            accelerator: "CmdOrCtrl+O",
            click: () => {
                electron.dialog.showOpenDialog({ properties: ["openFile", "openDirectory", "multiSelections"] });
            }
        }, {
            type: "separator"
        }, {
            label: "Quit",
            accelerator: "CmdOrCtrl+Q",
            click: () => {
                app.quit();
            }
        }]
    }, {
        label: "View",
        submenu: [
            {
                label: "Saved Directory",
                click: () => {
                    shell.openItem(screenshotPath);
                }
            }
        ]
    }, {
        label: "Tools",
        submenu: [
            {
                label: "Open Dev Tools",
                accelerator: "CmdOrCtrl+F",
                click: () => {
                    mainWindow.openDevTools();
                }
            }, {
                label: "Close Dev Tools",
                accelerator: "CmdOrCtrl+G",
                click: () => {
                    mainWindow.closeDevTools();
                }
            }
        ]
    }
];
let trayTemplate = [
    {
        label: "Quit",
        click: () => {
            app.quit();
        }
    }
];

if (process.platform === "darwin") {
    menuTemplate.unshift({
        label: app.getName(),
        submenu: [
            {
                label: `About ${name}`,
                role: "about"
            }, {
                type: "separator"
            }, {
                role: "hide"
            }, {
                role: "hideothers"
            }, {
                role: "unhide"
            }
        ]
    });
    trayTemplate.unshift({
        label: `About ${name}`,
        role: "about"
    }, {
        type: "separator"
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    let iconPath = path.join(__dirname, "app/icon.png");
    const tray = new Tray(iconPath);
    const trayMenu = Menu.buildFromTemplate(trayTemplate);
    const menu = Menu.buildFromTemplate(menuTemplate);

    tray.setToolTip("Electron Skeleton");
    tray.setContextMenu(trayMenu);

    Menu.setApplicationMenu(menu);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "app/index.html"),
        protocol: "file:",
        slashes: true
    }));

    mainWindow.on("closed", function () {
        mainWindow = null;
    });

    //Setup and register the global keyboard shortcut
    globalShortcut.register("CmdOrCtrl+D", () => {
        mainWindow.webContents.send("capture", screenshotPath);
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});

app.disableHardwareAcceleration();
