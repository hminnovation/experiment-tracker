import HypothesisComponent from "@/components/HypothesisComponent";
import PhaseComponent from "@/components/PhaseComponent";
import ProjectComponent from "@/components/ProjectComponent";
import getProjectsData, { Project } from "@/utils/getProjectsData";
import React from "react";

export async function getStaticProps() {
  const {
    props: { projects },
  } = await getProjectsData();

  return {
    props: {
      projects,
    },
  };
}

// Main project page component
const ProjectsPage: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div className="container mx-auto px-12">
    {projects.map((project, projectIndex) => (
      <div key={projectIndex} className="mb-8">
        <ProjectComponent data={project} />
        <div className="grid grid-cols-3 gap-8">
          {project.phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="">
              <PhaseComponent data={phase} />
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
);

export default ProjectsPage;
