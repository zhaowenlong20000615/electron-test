const { ipcRenderer } = require("electron")

const editor = new SimpleMDE({
    element: document.getElementById('editor'),
    spellChecker: false,
    autosave: {
        enabled: true,
    }
})

const setValue = (value) => {
  editor.value(value)
}

ipcRenderer.on('load', (event, value) => {
    editor.value(value)
})

ipcRenderer.on("format", (_, arg) => {
    // 接下来，根据不同的参数，调用 simpleMDE 提供的方法即可
    switch (arg) {
      case "toggle-bold": {
        editor.toggleBold();
        break;
      }
      case "toggle-italic": {
        editor.toggleItalic();
        break;
      }
      case "titleLevelOne": {
        editor.toggleHeading1();
        break;
      }
      case "titleLevelTwo": {
        editor.toggleHeading2();
        break;
      }
      case "titleLevelThree": {
        editor.toggleHeading3();
        break;
      }
      case "titleLevelFour": {
        editor.toggleHeading4();
        break;
      }
      case "titleLevelFive": {
        editor.toggleHeading5();
        break;
      }
      case "titleLevelSix": {
        editor.toggleHeading6();
        break;
      }
      case "toggle-ordered-list": {
        editor.toggleOrderedList();
        break;
      }
      case "toggle-unordered-list": {
        editor.toggleUnorderedList();
        break;
      }
      case "toggle-code": {
        editor.toggleCodeBlock();
        break;
      }
      case "toggle-quote": {
        editor.toggleBlockquote();
        break;
      }
      case "toggle-link": {
        editor.drawLink();
        break;
      }
    }
  });

  // 接下来实现拖拽加载文档功能
// 这一块儿直接使用 HTML5 的拖拽 API 即可

const body = document.querySelector("body");

body.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  // 获取到用户拖拽的文件的内容
  if (e.dataTransfer.items) {
    for (let item of e.dataTransfer.items) {
      // 检查当前项是否为文件
      if (item.kind === "file") {
        // 拿到文件具体信息（包含文件名字、文件路径）
        const file = item.getAsFile();
        // 接下来就读取这些信息
        const reader = new FileReader();
        // 当文件读取完成之后，会触发 onload 事件
        reader.onload = (e) => {
          editor.value(e.target.result);
        };
        // 以文本的形式去读取文件内容
        reader.readAsText(file);
      }
    }
  }
});

