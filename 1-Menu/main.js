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
//Seup the menu template
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
    },
    {
        label: "Tools",
        submenu: [
            {
                label: "Open Dev Tools",
                accelerator: "CmdOrCtrl+F",
                click: () => {
                    mainWindow.openDevTools();
                }
            },
            {
                label: "Close Dev Tools",
                accelerator: "CmdOrCtrl+G",
                click: () => {
                    mainWindow.closeDevTools();
                }
            }
        ]
    }
];

//If the platform is darwin (Mac) the add a custom Menu and utilise the about fnctionality
if (process.platform === "darwin") {
    menuTemplate.unshift({
        label: app.getName(),
        submenu: [
            {
                label: `About ${name}`,
                role: "about"
            },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" }
        ]
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    //Build the menu from the menuTemplate
    const menu = Menu.buildFromTemplate(menuTemplate);

    //Set the menu to be used for the main window
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
