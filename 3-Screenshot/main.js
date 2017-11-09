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

let mainWindow;
let menuTemplate = [
    {
        label: name,
        submenu: [{
            label: "Open",
            accelerator: "CmdOrCtrl+O",
            click: () => {
                electron.dialog.showOpenDialog({ properties: ["openFile", "openDirectory", "multiSelections"] });
            }
        }, {
            label: `About ${name}`,
            role: "about"
        }, {
            type: "separator"
        }, {
            label: "Quit",
            accelerator: "CmdOrCtrl+Q",
            click: function () {
                app.quit();
            }
        }]
    },
    {
        label: "Tools",
        submenu: [
            {
                label: "Open Dev Tools",
                accelerator: "CmdOrCtrl+A",
                click: () => {
                    mainWindow.openDevTools();
                }
            },
            {
                label: "Close Dev Tools",
                accelerator: "CmdOrCtrl+B",
                click: () => {
                    mainWindow.closeDevTools();
                }
            }
        ]
    }
];
let trayTemplate = [
    {
        label: `About ${name}`,
        role: "about"
    }, {
        type: "separator"
    }, {
        label: "Quit",
        click: function () {
            app.quit();
        }
    }
];

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    const tray = new Tray(path.join("app", "skeleton.png"));
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
        mainWindow.webContents.send("capture", __dirname + "/saved_screenshots");
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