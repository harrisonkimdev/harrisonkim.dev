

import { IProject } from "@/interfaces"
import projectList from "@/assets/project_list.json"
import ProjectItem from "./(components)/ProjectItem"

const ProjectIndexPage = () => {
return (
  <>
    <h1 className="
      font-mono font-light text-center text-lime-400
    "> Projects </h1>

    <div className="grid md:grid-cols-2 gap-5">
      { projectList.projects.map((project: IProject) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  </>
  )
}

export default ProjectIndexPage