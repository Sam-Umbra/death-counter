const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    hello: () => console.log('hello'),
});