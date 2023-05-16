import React from "react";
import ReactMarkdown from "react-markdown";

const ProjectMarkdown: React.FC<{ children: string }> = ({ children }) => {
  return (
    <ReactMarkdown
      components={{
        p: ({ node, ...props }) => <p {...props} className="" />,
        a: ({ node, ...props }) => (
          <a {...props} className="underline underline-offset-2" />
        ),
        ul: ({ node, ...props }) => <ul {...props} className="list-disc" />,
        li: ({ node, ...props }) => (
          <li {...props} className="list-item list-outside ml-3" />
        ),
        strong: ({ node, ...props }) => (
          <strong {...props} className="font-bold" />
        ),
        em: ({ node, ...props }) => <em {...props} className="italic" />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default ProjectMarkdown;
