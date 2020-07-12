import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import React from "react";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      showLineNumbers={false}
    >
      {value}
    </SyntaxHighlighter>
  );
};

const Markdown = ({ source }) => (
  <ReactMarkdown
    source={source}
    renderers={{ code: CodeBlock }}
    linkTarget="_blank"
  />
);

export default Markdown;
