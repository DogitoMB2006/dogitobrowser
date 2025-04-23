const { app, BrowserWindow } = require('electron');
const path = require('path'); // <-- ESTA LÍNEA

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
        webviewTag: true // ¡Esto es clave!
      }
      
  });

  win.loadFile('index.html');
  win.setTitle('Dogito Browser');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
