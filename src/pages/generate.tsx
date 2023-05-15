import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";

interface FormState {
  hypothesis: string;
  method: string;
  date: string;
  completed: string;
  mainMetric: string;
  status: string;
  rationale: string;
  evidence: string[];
  newThinking: string;
}

const methods = [
  "Unknown",
  "Thought experiment",
  "Market Analysis",
  "Interview(s)",
  "Survey(s)",
  "Prototype",
  "Data Analysis",
  "Field Trial",
];
const metrics = ["Desirability", "Strategic fit", "Feasibility", "Viability"];
const statuses = [
  "Unstarted",
  "In progress",
  "Validated",
  "Invalidated",
  "Other",
];

const MyForm: FC = () => {
  const [form, setForm] = useState<FormState>({
    hypothesis: "-",
    rationale: "-",
    method: methods[0], // default to the first item in the methods array
    date: "-", // date field is left blank by default
    completed: "False", // default to 'False' for the completed field
    mainMetric: metrics[0], // default to the first item in the metrics array
    status: statuses[0], // default to the first item in the statuses array
    evidence: [""],
    newThinking: "-",
  });

  const [copyStatus, setCopyStatus] = useState<string>("Copy");
  const lastEvidenceRef = useRef(null);

  const addEvidence = () => {
    setForm((prevForm) => ({
      ...prevForm,
      evidence: [...prevForm.evidence, ""], // Append an empty string to the evidence array
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      addEvidence();
    }
  };

  useEffect(() => {
    if (lastEvidenceRef.current) {
      (lastEvidenceRef.current as any).focus();
    }
  }, [form.evidence]);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      Object.entries(form)
        .map(([key, value]) => {
          const formattedKey =
            key === "mainMetric"
              ? "Main metric"
              : key === "newThinking"
              ? "New thinking"
              : key.replace(/^./, (str) => str.toUpperCase());
          if (key === "evidence") {
            // Handle evidence array specially
            return `${formattedKey}:\n${value
              .map((evidence: string) => `- ${evidence}`)
              .join("\n")}\n`;
          }
          return `${formattedKey}: ${value}\n`;
        })
        .join("")
    );
    setCopyStatus("Copied");
    setTimeout(() => setCopyStatus("Copy"), 400);
  };

  const handleRemoveEvidence = (index: number) => {
    const newEvidence = [...form.evidence];
    newEvidence.splice(index, 1);
    setForm({ ...form, evidence: newEvidence });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    if (e.target.name === "evidence") {
      // If changing an evidence field, update the specific evidence string that changed
      const newEvidence = [...form.evidence];
      newEvidence[index!] = e.target.value;
      setForm({
        ...form,
        evidence: newEvidence,
      });
    } else {
      const value =
        e.target.name === "completed"
          ? e.target.value === "True"
            ? "True"
            : "False"
          : e.target.value;
      setForm({
        ...form,
        [e.target.name]: value,
      });
    }
  };

  return (
    <div className="space-y-4 max-w-5xl grid mt-12 gap-x-8 grid-cols-4 mx-auto text-white">
      <div className="col-span-2">
        <div>
          <label className="block mt-4">Hypothesis:</label>
          <input
            type="text"
            name="hypothesis"
            value={form.hypothesis}
            onChange={handleChange}
            className="mt-1 block w-full text-black rounded-md border-black shadow-sm"
          />
        </div>
        <div>
          <label className="block mt-4">Rationale:</label>
          <input
            type="text"
            name="rationale"
            value={form.rationale}
            onChange={handleChange}
            className="mt-1 block w-full text-black rounded-md border-black shadow-sm"
          />
        </div>
        <div className="grid grid-cols-3 gap-x-4">
          <div className="col-span-2">
            <label className="block mt-4">Method:</label>
            <select
              name="method"
              value={form.method}
              onChange={handleChange}
              className="mt-1 block w-full text-black rounded-md border-black shadow-sm"
            >
              {methods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block mt-4">Date:</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="mt-1 block w-full text-black rounded-md border-black shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-4">
          <div className="col-span-1">
            <label className="block mt-4">Completed:</label>
            <select
              name="completed"
              value={form.completed}
              onChange={handleChange}
              className="mt-1 block w-full text-black rounded-md border-black shadow-sm"
            >
              <option value="False">False</option>
              <option value="True">True</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block mt-4">Main metric:</label>
            <select
              name="mainMetric"
              value={form.mainMetric}
              onChange={handleChange}
              className="mt-1 block w-full text-black rounded-md border-black shadow-sm"
            >
              {metrics.map((metric) => (
                <option key={metric} value={metric}>
                  {metric}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block mt-4">Status:</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-1 block w-full text-black rounded-md border-black shadow-sm"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mt-4">Evidence:</label>
          {form.evidence.map((evidence, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                ref={
                  index === form.evidence.length - 1 ? lastEvidenceRef : null
                }
                type="text"
                name="evidence"
                value={evidence}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={handleKeyDown}
                className="mt-1 block w-full text-black rounded-md border-black shadow-sm flex-grow"
              />
              <button
                onClick={() => handleRemoveEvidence(index)}
                className="p-1 bg-red-500 text-white rounded-full"
              >
                x
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addEvidence}
            className="mt-2 bg-white text-black border-black rounded p-1"
          >
            + Add Evidence
          </button>
        </div>
        <div>
          <label className="block mt-4">New Thinking:</label>
          <input
            type="text"
            name="newThinking"
            value={form.newThinking}
            onChange={handleChange}
            className="mt-1 block w-full text-black rounded-md border-black shadow-sm"
          />
        </div>
      </div>
      <div className="col-span-2">
        <div className="relative">
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 bg-white border-black text-black px-3 opacity-80 rounded"
          >
            {copyStatus}
          </button>
        </div>

        <pre className="border p-4 rounded mb-12 whitespace-pre-wrap font-sans">
          {Object.entries(form).map(([key, value]) => {
            const formattedKey =
              key === "mainMetric"
                ? "Main metric"
                : key === "newThinking"
                ? "New thinking"
                : key.replace(/^./, (str) => str.toUpperCase());

            if (key === "evidence") {
              // Handle evidence array specially
              return (
                <div key={key}>
                  <strong className="font-black opacity-60">
                    {formattedKey}:
                  </strong>
                  <ul>
                    {value.map((evidence: string, index: number) => (
                      <li key={index}>- {evidence}</li>
                    ))}
                  </ul>
                </div>
              );
            }

            return (
              <div key={key}>
                <strong className="font-black opacity-60">
                  {formattedKey}:
                </strong>{" "}
                {value}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

export default MyForm;
