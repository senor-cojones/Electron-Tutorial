var path = require("path");
var notificationOptions = [
    {
        title: "Skeleton Notification",
        body: "Hello from the Skeleton App!",
        icon: path.join(__dirname, "skeleton.png")
    }
];

function fireNotification() {
    new Notification(options[0].title, options[0]);
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".appNotify").addEventListener("click", fireNotification);
});
