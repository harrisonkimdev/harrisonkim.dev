"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { promises as fs } from 'fs'
import path from 'path'

interface Project {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  link: string;
}

interface ProjectList {
  projects: Project[];
}

async function getProjectData(): Promise<ProjectList> {
  const filePath = path.join(process.cwd(), 'public', 'assets', 'project_list.json')
  const fileData = await fs.readFile(filePath, 'utf8')
  return JSON.parse(fileData)
}

const ProjectPage = async () => {
  const params = useParams()
  const projectList = await getProjectData()

  const projectItem = projectList.projects.find((project: Project) => {
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