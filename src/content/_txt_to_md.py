import os
import re
from datetime import datetime
from slugify import slugify


def write_to_file(path, content):
    with open(path, "w") as f:
        f.write(content)


def clean_date_string(date_str):
    date_str = re.sub(
        r"[^\d-]", "", date_str
    )  # Remove all non-digit and non-hyphen characters
    return date_str.strip()  # Remove any leading/trailing whitespace


def create_hypothesis_content(hypothesis_data):
    return f"""---
title: "{hypothesis_data.get('Belief', '')}"
status: "{hypothesis_data.get('Status', '')}"
why_statement: "{hypothesis_data.get('Why', '')}"
new_thinking_statement: "{hypothesis_data.get('New thinking', '')}"
---
"""


def create_experiment_content(experiment_data):
    return f"""---
title: "{experiment_data['title']}"
date: "{experiment_data['date']}"
---
"""


def process_file(input_file, base_dir):
    with open(input_file, "r") as f:
        content = f.read()

    # Ignore readme and start processing from first experiment
    content = content.split("</readme>")[1]
    experiment_blocks = content.split("#")[1:]

    for experiment_block in experiment_blocks:
        lines = [
            line for line in experiment_block.split("\n") if line.strip()
        ]  # Remove empty lines
        title = lines[0].strip()

        # Find the line that starts with 'Date:'
        date_line = next(line for line in lines if line.startswith("Date:"))
        date_str = clean_date_string(date_line.split(":")[1])
        date = date_str

        experiment_dir_name = slugify(title)
        experiment_dir_path = os.path.join(base_dir, experiment_dir_name)
        os.makedirs(experiment_dir_path, exist_ok=True)

        experiment_content = create_experiment_content({"title": title, "date": date})
        write_to_file(os.path.join(experiment_dir_path, "index.md"), experiment_content)

        if "<hypotheses>" in experiment_block:
            hypotheses_block = experiment_block.split("<hypotheses>")[1].split(
                "</hypotheses>"
            )[0]
            hypotheses = hypotheses_block.split("***")

            os.makedirs(os.path.join(experiment_dir_path, "hypotheses"), exist_ok=True)

            for i, hypothesis in enumerate(hypotheses):
                hypothesis_lines = hypothesis.split("\n")
                hypothesis_data = {}
                for line in hypothesis_lines:
                    if line.strip() != "":
                        key, value = line.split(":")
                        hypothesis_data[key.strip()] = value.strip()

                hypothesis_content = create_hypothesis_content(hypothesis_data)
                write_to_file(
                    os.path.join(
                        experiment_dir_path, "hypotheses", f"hypothesis{i+1}.md"
                    ),
                    hypothesis_content,
                )


def main():
    input_file = "_experiments.txt"
    output_dir = "experiments"
    process_file(input_file, output_dir)


if __name__ == "__main__":
    main()
