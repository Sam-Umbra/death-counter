import { ipcRenderer } from "electron";
const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    getUsers: () => ipcRenderer.invoke('db:getUsers'),
    addUser: (name:string) => ipcRenderer.invoke('db:addUser', name),
});