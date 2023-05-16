import HypothesisComponent from "@/components/HypothesisComponent";
import PhaseComponent from "@/components/PhaseComponent";
import ProjectComponent from "@/components/ProjectComponent";
import getProjectsData, { Project } from "@/utils/getProjectsData";
import React from "react";

export async function getStaticProps() {
  const {
    props: { projects },
  } = await getProjectsData();

  let experimentCount = 0;
  let hypothesisCount = 0;
  let invalidatedHypothesisCount = 0;
  let validatedHypothesisCount = 0;
  let startedPhaseCount = 0;
  let inProgressHypothesisCount = 0;

  projects.forEach((project) => {
    project.phases.forEach((phase) => {
      // If comment key is not undefined, increment phase count
      if (
        phase.data.comment !== undefined &&
        phase.data.comment !== null &&
        phase.data.comment.trim() !== ""
      ) {
        startedPhaseCount++;
      }

      phase.hypotheses.forEach((hypothesis) => {
        // If hypothesis key is not undefined, increment hypothesis count
        // Check the status of hypothesis
        if (hypothesis.data.status === "Invalidated") {
          invalidatedHypothesisCount++;
        } else if (hypothesis.data.status === "Validated") {
          validatedHypothesisCount++;
        } else if (hypothesis.data.status === "In progress") {
          inProgressHypothesisCount++;
        }
        if (hypothesis.data.hypothesis !== undefined) {
          hypothesisCount++;
        }
      });
    });

    // Assuming every project is an experiment
    experimentCount++;
  });

  return {
    props: {
      projects,
      experimentCount,
      hypothesisCount,
      invalidatedHypothesisCount,
      validatedHypothesisCount,
      inProgressHypothesisCount,
      startedPhaseCount,
    },
  };
}

// Main project page component
const ProjectsPage: React.FC<{
  projects: Project[];
  experimentCount: number;
  hypothesisCount: number;
  startedPhaseCount: number;
  validatedHypothesisCount: number;
  invalidatedHypothesisCount: number;
  inProgressHypothesisCount: number;
}> = ({
  projects,
  experimentCount,
  hypothesisCount,
  startedPhaseCount,
  validatedHypothesisCount,
  invalidatedHypothesisCount,
  inProgressHypothesisCount,
}) => (
  <div className="container mx-auto p-12">
    <h2>Number of Experiments: {experimentCount}</h2>
    <h2>
      Number of Hypotheses: {hypothesisCount} (validated:
      {validatedHypothesisCount}, invalidated: {invalidatedHypothesisCount}, in
      progress: {inProgressHypothesisCount})
    </h2>
    <h2>Number of Phases Started: {startedPhaseCount}</h2>
    <div className="container mx-auto p-12">
      {projects.map((project, projectIndex) => (
        <div key={projectIndex} className="mb-8 border-b border-white py-12">
          <ProjectComponent data={project} />
          <div className="grid grid-cols-3 gap-8">
            {project.phases.map((phase, phaseIndex) => (
              <div key={phaseIndex} className="">
                <PhaseComponent data={phase} />
                <h3 className="mt-4 text-lg font-semibold">Phase hypotheses</h3>
                {phase.hypotheses.map((hypothesis, hypothesisIndex) => (
                  <div key={hypothesisIndex} className="mb-4">
                    <HypothesisComponent data={hypothesis} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProjectsPage;
