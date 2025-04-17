import { useEffect, useState } from "react";
import { rules } from "../rules";

export function useMarkdown(markdownText) {
  const [markdownResult, setMarkdownResult] = useState('');
  
  useEffect(() => {
    if(!markdownText) return;
    
    let result = markdownText;
    rules.forEach(([rule, template]) => {
      result = result.replace(rule, template);
    });
    setMarkdownResult(result);    
  }, [markdownText]);

  const setMarkdownText = () => {};
  return [markdownResult, setMarkdownText];
}

