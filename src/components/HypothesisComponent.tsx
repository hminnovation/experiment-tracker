import React from "react";
import ReactMarkdown from "react-markdown";

const HypothesisComponent: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <ReactMarkdown>{data.data.belief || "No belief provided"}</ReactMarkdown>
      <p>Completed: {data.data.completed ? "Yes" : "No"}</p>
      <p>Date: {data.data.date || "No date provided"}</p>
      <p>Main Metric: {data.data.main_metric || "No main metric provided"}</p>
      <ReactMarkdown>{data.data.method || "No method provided"}</ReactMarkdown>
      <ReactMarkdown>
        {data.data.new_thinking || "No new thinking provided"}
      </ReactMarkdown>
      <p>Status: {data.data.status || "No status provided"}</p>
      <ReactMarkdown>
        {data.data.why || "No explanation provided"}
      </ReactMarkdown>
    </div>
  );
};

export default HypothesisComponent;
