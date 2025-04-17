// 主要负责提供分词的功能

const markdownText = `
## 标题
这是一个段落。

- 列表项 1
- 列表项 2

这是第二个段落。

1. 西瓜
2. 哈密瓜
`;

function tokenize(markdownText) {
  debugger
  // 将获取到的 markdown 文本按照行来进行分割
  const lines = markdownText.split("\n");
  // 用于存储解析出来的 token
  const tokens = [];

  // 遍历每一行
  for (const line of lines) {
    // 接下来咱们就需要对每一行进行一个判断
    // 判断它究竟是哪一种 Markdown 元素
    if (line.startsWith("#")) {
      // 如果该字符串是以 # 开头，那么说明是一个标题
      // 接下来我们需要确定标题的级别
      const level = line.match(/^#+/)[0].length;
      // 接下来再来获取标题相关的文本
      const text = line.slice(level).trim();
      // 形成 token 推入到 tokens 数组里面
      tokens.push({
        type: "heading",
        level,
        text,
      });
    } else if (line.startsWith("- ")) {
      // 进入此分支我们认为这是一个无序列表
      // 之后要做的事情实际上和上面是一样的
      const text = line.slice(2).trim();
      tokens.push({
        type: "list-item",
        ordered: false,
        text,
      });
    } else if (line.match(/^\d+\./)) {
      // 查看该行是否是以数字和 . 开头
      // 如果是以数字和 . 开头，那么我们认为是一个有序列表
      const text = line.slice(2).trim();
      tokens.push({
        type: "list-item",
        ordered: true,
        text,
      });
    } else if (line.trim() !== "") {
      // 如果该行不是空行，那么我们就将其视为段落
      tokens.push({
        type: "paragraph",
        text: line.trim(),
      });
    }
  }

  return tokens;
}

console.log( tokenize(markdownText));



