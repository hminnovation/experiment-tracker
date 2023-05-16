import React from "react";
import ProjectMarkdown from "./ProjectMarkdown";
import DateComponent from "./DateComponent";

const HypothesisComponent: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <h2>{data.data.title || "No title provided"}</h2>
      <ProjectMarkdown>
        {data.data.hypothesis || "No hypothesis provided"}
      </ProjectMarkdown>
      <p>Completed: {data.data.completed ? "Yes" : "No"}</p>
      <p>
        Date:
        {<DateComponent dateString={data.data.start_date} /> ||
          "No date provided"}
      </p>
      <p>Main Metric: {data.data.main_metric || "No main metric provided"}</p>
      <p>Method: {data.data.method || "No method provided"}</p>
      <ProjectMarkdown>
        {data.data.evidence || "No evidence provided"}
      </ProjectMarkdown>
      <ProjectMarkdown>
        {data.data.new_thinking || "No new thinking provided"}
      </ProjectMarkdown>
      <p>Status: {data.data.status || "No status provided"}</p>
    </div>
  );
};

export default HypothesisComponent;
