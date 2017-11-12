const path = require("path");
const notificationOptions = [
    {
        title: "Skeleton Notification",
        body: "Hello from the Skeleton App!",
        icon: path.join(__dirname, "skeleton.png")
    }
];

function fireNotification() {
    new Notification(notificationOptions[0].title, notificationOptions[0]);
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".appNotify").addEventListener("click", fireNotification);
});
