import React, { memo, useEffect, useRef, useState } from "react";
import { useMarkdown } from "./hooks/useMarkdown";
import { inputVal } from "./mock/makedown";

const App = memo(() => {
  const [value, setValue] = useState("");
  const markdownResultRef = useRef(null)
  const [markdownResult] = useMarkdown(value)

  useEffect(() => setValue(inputVal), [])
  
  useEffect(() => {
    markdownResultRef.current.innerHTML = markdownResult
  }, [markdownResult])

  const changeValue = (e) => {
    setValue(e.target.value)
    markdownResult.current.innerHTML = e.target.value
  }

  return (
    // <!-- 最外层的容器 -->
    <div className="container">
      {/* <!-- 标题 --> */}
      <h1 className="heading">Markdown解析器</h1>
      <div className="preview">
        {/* <!-- 预览部分分为左右两侧 --> */}
        {/* <!-- 左侧输入文本部分 --> */}
        <div>
          <h2 className="align">Markdown文本</h2>
          <textarea className="inf" value={value} onChange={changeValue}></textarea>
        </div>
        {/* <!-- 右侧预览部分 --> */}
        <div>
          <h2 className="align">效果预览</h2>
          <div className="info" ref={markdownResultRef}></div>
        </div>
      </div>
    </div>
  );
});

export default App;
