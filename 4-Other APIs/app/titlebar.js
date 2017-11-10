const electron = require("electron");
const app = electron.app;

function closeWindow() {
        app.quit();
}

function createImage(imageID, imageURL) {
    var image = document.createElement("img");

    image.setAttribute("id", imageID);
    image.src = imageURL;

    return image;
}

function createButton(buttonID, buttonName, imageURL, action) {
    var button = document.createElement("div");

    button.setAttribute("class", buttonName);
    var buttonImage = createImage(buttonID, imageURL);

    button.appendChild(buttonImage);

    button.onclick = action;

    return button;
}

function addTitlebar(titleBarText) {
    var titlebar = document.createElement("div");
    var titleBarName = "appTitleBar";

    titlebar.setAttribute("id", titleBarName);
    titlebar.setAttribute("class", titleBarName);

    var icon = document.createElement("div");

    icon.setAttribute("class", titleBarName + "Icon");
    icon.appendChild(createImage(titleBarName + "icon", "skeleton.png"));
    titlebar.appendChild(icon);

    var title = document.createElement("div");

    title.setAttribute("class", titleBarName + "Text");
    title.innerText = titleBarText;
    titlebar.appendChild(title);

    var closeButton = createButton(titleBarName + "CloseButton", titleBarName + "CloseButton", "close.png", closeWindow);

    titlebar.appendChild(closeButton);

    var divider = document.createElement("div");

    divider.setAttribute("class", titleBarName + "Divider");
    titlebar.appendChild(divider);

    document.body.appendChild(titlebar);
}

function updateContentStyle() {
    var content = document.getElementById("content");

    if (!content)
        return;

    var left = 0;
    var top = 0;
    var width = window.outerWidth;
    var height = window.outerHeight;

    var titlebar = document.getElementById("appTitleBar");

    if (titlebar) {
        height -= titlebar.offsetHeight;
        top += titlebar.offsetHeight;
    }

    var contentStyle = "position: absolute; ";

    contentStyle += "left: " + left + "px; ";
    contentStyle += "top: " + top + "px; ";
    contentStyle += "width: " + width + "px; ";
    contentStyle += "height: " + height + "px; ";
    content.setAttribute("style", contentStyle);
}

// window.onresize = function () {
//     updateContentStyle();
// };

window.onload = function () {
    addTitlebar("Skeleton");
    // updateContentStyle();
};
