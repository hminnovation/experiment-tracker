import React from "react";
import ReactMarkdown from "react-markdown";

const ProjectComponent: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <h1>{data.data.title || "No title provided"}</h1>
      <ReactMarkdown>
        {data.data.description || "No description provided"}
      </ReactMarkdown>
      <p>Started: {data.data.started ? "Yes" : "No"}</p>
      <p>Completed: {data.data.completed ? "Yes" : "No"}</p>
      <p>Phase: {data.data.phase || "No phase provided"}</p>
      <p>Start Date: {data.data.start_date || "No start date provided"}</p>
    </div>
  );
};

export default ProjectComponent;
