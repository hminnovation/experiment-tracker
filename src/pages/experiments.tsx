import { useState } from "react";
import getExperimentsData, { ExperimentData } from "@/utils/getExperimentsData";

export async function getStaticProps() {
  const { experimentsData } = await getExperimentsData();

  return {
    props: {
      experimentsData,
    },
  };
}

type StatusFilterType = {
  Validated: boolean;
  Invalidated: boolean;
  Other: boolean;
};

// Declare a type for the showStatements
type ShowStatementsType = {
  why_statement: boolean;
  new_thinking_statement: boolean;
};

export default function ExperimentsPage({
  experimentsData,
}: {
  experimentsData: ExperimentData[];
}) {
  const STATUS_OPTIONS = ["Validated", "Invalidated", "Other"];
  const STATEMENT_OPTIONS = [
    { name: "why_statement", label: "Show 'Why' Statements" },
    { name: "new_thinking_statement", label: "Show 'New Thinking' Statements" },
  ];

  const [statusFilter, setStatusFilter] = useState<StatusFilterType>({
    Validated: true,
    Invalidated: true,
    Other: true,
  });

  const [showStatements, setShowStatements] = useState<ShowStatementsType>({
    why_statement: true,
    new_thinking_statement: true,
  });

  const handleStatementChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    statementName: string
  ) => {
    setShowStatements((prevState) => ({
      ...prevState,
      [statementName]: e.target.checked,
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusFilter((prevStatus) => ({
      ...prevStatus,
      [e.target.name]: e.target.checked,
    }));
  };

  const filteredExperimentsData = experimentsData.filter((experiment) =>
    experiment.hypotheses.some(
      (hypothesis) =>
        (hypothesis.status === "Validated" && statusFilter.Validated) ||
        (hypothesis.status === "Invalidated" && statusFilter.Invalidated) ||
        (["Validated", "Invalidated"].indexOf(hypothesis.status) === -1 &&
          statusFilter.Other)
    )
  );

  return (
    <div className="max-w-4xl mx-auto">
      <form>
        {STATUS_OPTIONS.map((status) => (
          <label key={status}>
            <input
              type="checkbox"
              name={status}
              checked={statusFilter[status as keyof StatusFilterType]}
              onChange={handleStatusChange}
            />
            {status}
          </label>
        ))}
        <div className="clear-both"></div>
        {STATEMENT_OPTIONS.map((option) => (
          <label key={option.name}>
            <input
              type="checkbox"
              checked={showStatements[option.name as keyof ShowStatementsType]}
              onChange={(e) => handleStatementChange(e, option.name)}
            />
            {option.label}
          </label>
        ))}
      </form>
      {filteredExperimentsData.map((experiment, i) => (
        <div key={i}>
          <h2 className="font-semibold text-2xl mb-2">{experiment.title}</h2>
          <p className="mb-4">{experiment.date}</p>
          {experiment.hypotheses.map((hypothesis, j) => (
            <div key={j}>
              <h3 className="font-semibold text-xl mb-2">{hypothesis.title}</h3>
              <h3 className="uppercase mb-2">status: {hypothesis.status}</h3>
              {showStatements.why_statement && (
                <div
                  dangerouslySetInnerHTML={{ __html: hypothesis.why_statement }}
                />
              )}
              {showStatements.new_thinking_statement && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: hypothesis.new_thinking_statement,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
