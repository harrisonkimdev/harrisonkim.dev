"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import projectList from "@/assets/project_list.json"

const ProjectPage = () => {
  const params = useParams()

  const projectItem = projectList.projects.find((project) => project.id === Number(params.id))

  if (projectItem) {
    return (
      <div className="flex flex-col items-center">
        <h2>{ projectItem.name }</h2>
        <Image src={projectItem.thumbnail} alt="Project Sample Image"
          width={1024} height={768} className=""
        />
        <div className="mt-12">
          <h4>Description:</h4>
          <p>{ projectItem.description }</p>
          { projectItem.link.length > 0 && (
            <div className="py-8">
              <hr className="pb-6" />
              <Link href={`${projectItem.link}`} target="_blank">
                <span className="font-medium">Visit website</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  } else return <></>
}

export default ProjectPage