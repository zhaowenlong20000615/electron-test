import { ipcRenderer } from "electron";
import React, { memo } from "react";
import "./index.css";

const ControlBtns = memo(() => {
  // 拖拽逻辑
  let offset = null; // 记录用户拖动的偏移值
  let isDragging = false; // 记录用户是否正在拖动

  function onMouseDown(e) {
    // 进入此分支，说明用户是在最上方按下的鼠标
    // 可以进行拖拽操作
    isDragging = true;
    // 记录当前用户按下鼠标这一刻的 offset 的值
    offset = {
      x: e.screenX - window.screenX,
      y: e.screenY - window.screenY,
    };
    document.onmousemove = (e) => {
      if (isDragging) {
        // 计算窗口新的位置
        const x = e.screenX - offset.x;
        const y = e.screenY - offset.y;
        // 更新窗口位置
        window.moveTo(x, y);
      }
    };
    document.onmouseup = () => {
      // 鼠标抬起的时候，拖拽结束
      isDragging = false;
      offset = null;
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }

  // 关闭应用
  function closeWindow() {
    ipcRenderer.send("closeWindow");
  }
  // 最小化应用
  function minimaizeWindow() {
    ipcRenderer.send("minimaizeWindow");
  }

  return (
    <div className="controlBtns" onMouseDown={onMouseDown}>
      <div className="closeBtn fa-solid fa-close" onClick={closeWindow}></div>
      <div className="minimizeBtn fa-solid fa-angle-down" onClick={minimaizeWindow}></div>
    </div>
  );
});

export default ControlBtns;
