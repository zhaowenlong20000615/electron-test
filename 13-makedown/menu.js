const { Menu, BrowserWindow, dialog, app } = require('electron')
const fs = require('fs')
const path = require('path')

const loadFile = async () => {
  const win = BrowserWindow.getFocusedWindow()
  const {filePaths, canceled} = await dialog.showOpenDialog(win, {
    title: '打开 Markdown 文件',
    defaultPath: app.getPath('documents'),
    filters: [{ name: 'Markdown', extensions: ['md', 'txt'] }],
  })

  if(!filePaths) return
  const editor = fs.readFileSync(filePaths[0], 'utf-8')
  win.webContents.send('load', editor)
  // win.webContents.executeJavaScript(`setValue(${editor})`)
}

const saveFile = async () => {
  const win = BrowserWindow.getFocusedWindow()
  const editor = await win.webContents.executeJavaScript('editor.value()')
  const {filePath, canceled} = await dialog.showSaveDialog(win, {
    title: '保存 Markdown 文件',
    defaultPath: path.join(app.getPath('documents'), Date.now() + ''),
    nameFieldPlaceholder: 'untitled.md',
    filters: [{ name: 'Markdown', extensions: ['md', 'txt'] }],
  })
  if(!filePath) return
  fs.writeFileSync(filePath, editor)
  dialog.showMessageBox(win, {
    title: '提示',
    message: '文件保存成功',
  })
}

const menuArr = [
  {
    label: '',
  },
  {
    label: '文件',
    submenu: [
      { 
        label: '打开',
          click: loadFile
      },
      {
        label: '保存',
        click: saveFile
      }
    ]
  },
  {
    label: "编辑",
    submenu: [
      { label: "撤销", role: "undo" },
      { label: "重做", role: "redo" },
      { type: "separator" },
      { label: "剪切", role: "cut" },
      { label: "复制", role: "copy" },
      { label: "粘贴", role: "paste" },
      { label: "全选", role: "selectAll" },
    ],
  },
  {
    label: "格式化",
    submenu: [
      {
        label: "加粗",
        accelerator: "CommandOrControl+B",
        click() {
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-bold");
        },
      },
      {
        label: "斜体",
        accelerator: "CommandOrControl+I",
        click() {
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-italic");
        },
      },
      { type: "separator" },
      {
        label: "标题",
        submenu: [
          {
            label: "一级标题",
            accelerator: "CommandOrControl+1",
            click() {
              // 获取当前聚焦的窗口
              const window = BrowserWindow.getFocusedWindow();
              window.webContents.send("format", "titleLevelOne");
            },
          },
          {
            label: "二级标题",
            accelerator: "CommandOrControl+2",
            click() {
              // 获取当前聚焦的窗口
              const window = BrowserWindow.getFocusedWindow();
              window.webContents.send("format", "titleLevelTwo");
            },
          },
          {
            label: "三级标题",
            accelerator: "CommandOrControl+3",
            click() {
              // 获取当前聚焦的窗口
              const window = BrowserWindow.getFocusedWindow();
              window.webContents.send("format", "titleLevelThree");
            },
          },
          {
            label: "四级标题",
            accelerator: "CommandOrControl+4",
            click() {
              // 获取当前聚焦的窗口
              const window = BrowserWindow.getFocusedWindow();
              window.webContents.send("format", "titleLevelFour");
            },
          },
          {
            label: "五级标题",
            accelerator: "CommandOrControl+5",
            click() {
              // 获取当前聚焦的窗口
              const window = BrowserWindow.getFocusedWindow();
              window.webContents.send("format", "titleLevelFive");
            },
          },
          {
            label: "六级标题",
            accelerator: "CommandOrControl+6",
            click() {
              // 获取当前聚焦的窗口
              const window = BrowserWindow.getFocusedWindow();
              window.webContents.send("format", "titleLevelSix");
            },
          },
        ],
      },
      { type: "separator" },
      {
        label: "有序列表",
        accelerator: "CommandOrControl+O",
        click() {
          // 获取当前聚焦的窗口
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-ordered-list");
        },
      },
      {
        label: "无序列表",
        accelerator: "CommandOrControl+L",
        click() {
          // 获取当前聚焦的窗口
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-unordered-list");
        },
      },
      {
        label: "引用",
        accelerator: "CommandOrControl+-",
        click() {
          // 获取当前聚焦的窗口
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-quote");
        },
      },
      {
        label: "链接",
        accelerator: "CommandOrControl+K",
        click() {
          // 获取当前聚焦的窗口
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-link");
        },
      },
      {
        label: "代码块",
        click() {
          // 获取当前聚焦的窗口
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send("format", "toggle-code");
        },
      },
    ],
  },
  {
    role: "help",
    label: "帮助",
    submenu: [
      {
        label: "有关编辑器",
        click() {
          console.log("有关编辑器");
        },
      },
    ],
  },
]

// 根据当前的环境来决定是否添加开发者工具
if (process.env.NODE_ENV === "development") {
  menuArr.push({
    label: "开发者工具",
    submenu: [
      {
        label: "打开/关闭",
        accelerator:
          process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      { type: "separator" },
      {
        label: "重新加载",
        role: "reload",
        accelerator: "ctrl+R",
      },
    ],
  });
}

if (process.platform === "darwin") {
  menuArr.unshift({
    label: app.getName(),
    submenu: [
      {
        label: "关于编辑器",
        role: "about",
      },
      { type: "separator" },
      {
        label: "退出编辑器",
        role: "quit",
      },
    ],
  });
}

Menu.setApplicationMenu(Menu.buildFromTemplate(menuArr))