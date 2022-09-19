const { app, BrowserWindow } = require("electron");
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    icon: __dirname + "/assets/images/favicon.ico",
    autoHideMenuBar: true,
  });

  win.loadFile("index.html");

  win.once("ready-to-show", () => {
    win.show();
  });
}
app.whenReady().then(() => {
  createWindow();
});
