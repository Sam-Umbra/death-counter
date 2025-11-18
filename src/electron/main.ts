import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";
import Database from "better-sqlite3";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  const db = new Database(path.join(app.getAppPath(), "database", "app.db"));

  db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
  `).run();

    ipcMain.handle("db:getUsers", () => {
      return db.prepare("SELECT * from users").all();
    });

    ipcMain.handle("db:addUser", (event, name:string) => {
      return db.prepare("INSERT INTO users (name) VALUES (?)").run(name);
    });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
  }
});
