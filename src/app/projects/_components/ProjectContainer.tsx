import projectList from "@/assets/project_list.json"
import ProjectItem from "./ProjectItem"

import { IProject } from "@/interfaces"

const ProjectContainer = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      { projectList.projects.map((project: IProject) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  )
}

export default ProjectContainer