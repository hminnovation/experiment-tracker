import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Hypothesis {
  data: {
    [key: string]: any;
  };
  content: string;
}

export interface Phase {
  data: {
    [key: string]: any;
  };
  content: string;
  hypotheses: Hypothesis[];
}

export interface Project {
  data: {
    [key: string]: any;
  };
  content: string;
  phases: Phase[];
}

const getProjectsData = async () => {
  const contentDirectory = path.join(process.cwd(), "src/content/projects");

  // Filter out hidden files and directories
  const projectNames = fs
    .readdirSync(contentDirectory)
    .filter((dir) => !dir.startsWith(".") && !dir.startsWith("_"));

  const projects: Project[] = projectNames.map((projectName) => {
    const projectDirectory = path.join(contentDirectory, projectName);
    const projectFilePath = path.join(projectDirectory, "index.md");
    const projectContent = fs.readFileSync(projectFilePath, "utf-8");
    console.log(`Project Content: ${projectContent}`);

    let { data, content } = matter(projectContent);
    data = JSON.parse(JSON.stringify(data));

    const phaseNames = fs
      .readdirSync(projectDirectory)
      .filter(
        (dir) =>
          !dir.startsWith(".") && !dir.startsWith("_") && dir !== "index.md"
      );

    const phases: Phase[] = phaseNames.map((phaseName) => {
      const phaseDirectory = path.join(projectDirectory, phaseName);
      const phaseFilePath = path.join(phaseDirectory, "index.md");
      const phaseContent = fs.readFileSync(phaseFilePath, "utf-8");

      let { data, content } = matter(phaseContent);
      data = JSON.parse(JSON.stringify(data));

      const hypothesesDirectory = path.join(phaseDirectory, "hypotheses");
      const hypothesisNames = fs
        .readdirSync(hypothesesDirectory)
        .filter(
          (file) =>
            !file.startsWith(".") &&
            !file.startsWith("_") &&
            fs.statSync(path.join(hypothesesDirectory, file)).isFile()
        );

      const hypotheses: Hypothesis[] = hypothesisNames.map((hypothesisName) => {
        const hypothesisFilePath = path.join(
          hypothesesDirectory,
          hypothesisName
        );
        const hypothesisContent = fs.readFileSync(hypothesisFilePath, "utf-8");

        let { data, content } = matter(hypothesisContent);
        data = JSON.parse(JSON.stringify(data)); // This line converts all Date objects to strings

        return { data, content: marked(content) };
      });

      return { data, content: marked(content), hypotheses };
    });

    return { data, content: marked(content), phases };
  });

  return { props: { projects } };
};

export default getProjectsData;
