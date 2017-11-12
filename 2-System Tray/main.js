const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;
const name = electron.app.getName();
// Module to access the Tray API
const Tray = electron.Tray;

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
//Create tray menu template
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

    //Setup the tray and use an icon
    const tray = new Tray(path.join("app", "icon.png"));
    //Build the menu for the tray
    const trayMenu = Menu.buildFromTemplate(trayTemplate);
    const menu = Menu.buildFromTemplate(menuTemplate);

    //Add a tooltip to the tray
    tray.setToolTip("Electron Skeleton");
    //Attach the menu to the tray
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
