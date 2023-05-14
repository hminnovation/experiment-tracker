import os
import re
import yaml
from slugify import slugify


def snake_case(s):
    return re.sub(r"\W+", "_", s.lower())


def write_to_file(path, content):
    with open(path, "w") as f:
        f.write(content)


def clean_date_string(date_str):
    date_str = re.sub(
        r"[^\d-]", "", date_str
    )  # Remove all non-digit and non-hyphen characters
    return date_str.strip()  # Remove any leading/trailing whitespace


def create_hypothesis_content(hypothesis_data):
    yaml_content = yaml.dump(
        {snake_case(key): value for key, value in hypothesis_data.items()},
        allow_unicode=True,
        default_flow_style=False,
    )
    return f"---\n{yaml_content}---\n"


def create_phase_content(phase_name, phase_data):
    phase_content = [f"title: {phase_name}"]
    for key, value in phase_data.items():
        phase_content.append(f"{key}: {value}")
    return "---\n" + "\n".join(phase_content) + "\n---\n"


def create_project_content(project_name, project_data):
    return f"""---
title: "{project_name}"
start_date: "{project_data.get('Start date', '')}"
completed: "{project_data.get('Completed', '')}"
started: "{project_data.get('Started', '')}"
phase: "{project_data.get('Phase', '')}"
description: "{project_data.get('Project description', '')}"
---
"""


def process_file(input_file, base_dir):
    with open(input_file, "r") as f:
        content = f.read()

    project_blocks = content.split("#")[1:]

    for project_block in project_blocks:
        lines = [
            line for line in project_block.split("\n") if line.strip()
        ]  # Remove empty lines
        title = lines[0].strip()

        project_dir_name = slugify(title)
        project_dir_path = os.path.join(base_dir, project_dir_name)
        os.makedirs(project_dir_path, exist_ok=True)

        project_info = lines[1:6]
        project_data = {}
        for line in project_info:
            key, value = line.split(":")
            project_data[key.strip()] = value.strip()

        project_content = create_project_content(title, project_data)
        write_to_file(os.path.join(project_dir_path, "index.md"), project_content)

        phase_blocks = project_block.split("~~~")[1:]
        for i in range(0, len(phase_blocks), 2):
            phase_name = phase_blocks[i]
            phase_block = phase_blocks[i + 1]

            phase_lines = [line for line in phase_block.split("\n") if line.strip()]

            phase_dir_name = slugify(phase_name)
            phase_dir_path = os.path.join(project_dir_path, phase_dir_name)
            os.makedirs(phase_dir_path, exist_ok=True)

            phase_data = {}
            for line in phase_lines[:3]:
                key, value = line.split(":") if ":" in line else (line, "Unspecified")
                key = snake_case(key.strip())
                value = value.strip()

                # assign a default value if value is "Unstarted", "Unfinished", or "No comment"
                if value.lower() in ["unstarted", "unfinished", "no comment"]:
                    value = ""

                phase_data[key] = value

            phase_content = create_phase_content(phase_name, phase_data)
            write_to_file(os.path.join(phase_dir_path, "index.md"), phase_content)

            if "<hypotheses>" in phase_block:
                hypotheses_block = phase_block.split("<hypotheses>")[1].split(
                    "</hypotheses>"
                )[0]
                hypotheses = hypotheses_block.split("***")

                os.makedirs(os.path.join(phase_dir_path, "hypotheses"), exist_ok=True)

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
                            phase_dir_path, "hypotheses", f"hypothesis{i+1}.md"
                        ),
                        hypothesis_content,
                    )


def main():
    input_file = "_projects.txt"
    output_dir = "projects"
    process_file(input_file, output_dir)


if __name__ == "__main__":
    main()
