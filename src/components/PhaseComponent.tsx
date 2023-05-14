import React from "react";
import ReactMarkdown from "react-markdown";

const PhaseComponent: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <h2>{data.data.title || "No title provided"}</h2>
      <p>Start Date: {data.data.start_date || "No start date provided"}</p>
      <p>End Date: {data.data.end_date || "No end date provided"}</p>
      <ReactMarkdown>
        {data.data.comment || "No comment provided"}
      </ReactMarkdown>
    </div>
  );
};

export default PhaseComponent;
