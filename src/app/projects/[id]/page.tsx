import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { projectList, type Project } from "@/data/projects"

async function getProjectData(): Promise<Project[]> {
  console.log("getProjectData")
  return projectList
}

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  console.log("ProjectPage")
  const projects = await getProjectData()

  const projectItem = projects.find((project: Project) => {
    return project.id.toString() === params.id
  })

  if (projectItem) {
    return (
      <div className="flex flex-col items-center font-mono">
        <h2 className="font-mono text-lime-400">
          { projectItem.name }
        </h2>
        <Image src={projectItem.thumbnail} alt="Project Sample Image"
          width={1024} height={768} className=""
        />
        <div className="mt-6">
          <p className="text-zinc-400">
            { projectItem.description }
          </p>

          { projectItem.link.length > 0 && (
            <div className="pt-4">
              <Link href={`${projectItem.link}`} target="_blank"
                className="
                  text-zinc-500 underline underline-offset-4
                  hover:text-zinc-500 active:text-zinc-500 visited:text-zinc-500
              ">
                Visit website
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  } else return <></>
}

export default ProjectPage