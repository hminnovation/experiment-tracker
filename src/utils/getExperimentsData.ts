import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface HypothesisData {
  title: string;
  status: string;
  why_statement: string;
  new_thinking_statement: string;
}

export interface ExperimentData {
  title: string;
  date: string;
  hypotheses: HypothesisData[];
}

const getExperimentsData = async () => {
  const experimentsDir = path.join(process.cwd(), "src/content/experiments");
  const experimentFolders = fs.readdirSync(experimentsDir);

  let experimentsData = experimentFolders.map((folder) => {
    const experimentFilePath = path.join(experimentsDir, folder, "index.md");
    const fileContents = fs.readFileSync(experimentFilePath, "utf8");

    // Use gray-matter to parse the experiment's metadata
    const { data } = matter(fileContents);

    // Read the hypotheses for this experiment
    const hypothesesDir = path.join(experimentsDir, folder, "hypotheses");
    const hypothesisFiles = fs.readdirSync(hypothesesDir);

    const hypothesesData: HypothesisData[] = hypothesisFiles.map((file) => {
      const hypothesisFilePath = path.join(hypothesesDir, file);
      const fileContents = fs.readFileSync(hypothesisFilePath, "utf8");

      // Use gray-matter to parse the hypothesis's metadata
      const { data } = matter(fileContents);

      // Use marked to parse markdown in the 'why_statement' and 'new_thinking_statement'
      data.why_statement = marked(data.why_statement);
      data.new_thinking_statement = marked(data.new_thinking_statement);

      return data as HypothesisData;
    });

    return {
      ...data,
      hypotheses: hypothesesData,
    } as ExperimentData;
  });

  // Sort the experiments data by date
  experimentsData.sort((a, b) => {
    const dateA = Number(a.date.split("-").join(""));
    const dateB = Number(b.date.split("-").join(""));
    return dateB - dateA; // For descending order
  });

  return {
    experimentsData,
  };
};

export default getExperimentsData;
