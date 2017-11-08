const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

// Module to access the Menu API
const Menu = electron.Menu;
//Get the "productName" from package.json
const name = electron.app.getName();

let mainWindow;
//
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

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    //Build the menu from the menuTemplate
    const menu = Menu.buildFromTemplate(menuTemplate);

    //Set the menu to be used
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
