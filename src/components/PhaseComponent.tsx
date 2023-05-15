import React from "react";
import ReactMarkdown from "react-markdown";

const PhaseComponent: React.FC<{ data: any }> = ({ data }) => {
  // const title =
  return (
    <div>
      {/* Note, I don't think the below "Not title provided" would ever be shown */}
      <h2 className="text-xl uppercase">
        {data.data.title + " phase" || "No title provided"}
      </h2>
      <p>Start Date: {data.data.start_date || "No start date provided"}</p>
      <p>End Date: {data.data.end_date || "No end date provided"}</p>
      <h3 className="mt-4 text-lg font-semibold">Phase outline</h3>
      <ReactMarkdown className="mb-8">
        {data.data.comment || "No comment provided"}
      </ReactMarkdown>
    </div>
  );
};

export default PhaseComponent;
