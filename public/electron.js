const { app, ipcMain, BrowserWindow }= require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const Datastore = require('nedb')
let db

function createWindow () {
  // Cria uma janela de navegação.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, "../build/index.html")}`
  )

  // Open the DevTools.
  win.webContents.openDevTools()
}

ipcMain.on('post-user', (event, arg) => {
  db.users.insert(arg, () => {
   event.reply('post-user', 'success');  
  });
})

ipcMain.on('get-all', (event) => {
  db.users.find({}, function (err, docs) {
    event.reply('get-all', docs)
  })
})

ipcMain.on('get-user', (event, arg) => {
  db.users.findOne(arg, function (err, doc) {
    event.reply('get-user', doc)
  });
})

ipcMain.on('put-user', (event, arg, changes) => {
  db.users.update(arg, changes, {returnUpdatedDocs: true}, (...args) => {
    const [,,newDoc] = args
    event.reply('put-user', newDoc)
  })
})

ipcMain.on('delete-user', (event, arg) => {
  db.users.remove(arg, {}, function (err, numRemoved) {
    event.reply('delete-user', numRemoved)
  });
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu 
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('browser-window-created', () => {
  db = new Datastore({inMemoryOnly:true, autoload:true, timestampData:true, });
  
  db.loadDatabase(function (err) {    // Callback is optional
    if(err){
        alert('Sem conexão com banco de dados')
    }
  });

  db.users = new Datastore({filename: './users', autoload:true});

  db.users.insert([{_id:'id1',name:'Caio',age:'27',nationality:'Brasileiro'},
  {_id:'id2',name:'Anderson',age:'32',nationality:'Japonês'},
  {_id:'id3',name:'Felipe',age:'40',nationality:'Americano'}], (err)=>{

  })
})


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})



// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.
