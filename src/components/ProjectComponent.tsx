import React from "react";
import ReactMarkdown from "react-markdown";

const ProjectComponent: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl">{data.data.title || "No title provided"}</h1>
      <h3 className="mt-4 text-lg font-semibold">Project description</h3>
      <ReactMarkdown className="mb-2">
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
