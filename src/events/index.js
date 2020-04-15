//https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

export const eventEmitter = ipcRenderer

