import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win: BrowserWindow | null = null;

const createWindow = () => {
   win = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
      },
   });

   if (process.env.VITE_DEV_SERVER_URL) {
      win.loadURL(process.env.VITE_DEV_SERVER_URL);
      win.webContents.openDevTools();
   } else {
      win.loadFile(path.join(__dirname, '../dist/index.html'));
   }
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') app.quit();
});
