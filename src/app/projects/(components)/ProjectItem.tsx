import Image from "next/image"
import Link from "next/link"
import { IProject } from "@/interfaces"

type TProjectItemProps = {
  project: IProject
}

const ProjectItem = ({ project }: TProjectItemProps) => {
  return (
    <Link href={`projects/${project.id}`}>
      <div className="
        flex flex-col justify-center pb-15 bg-zinc-950 font-mono
      ">
        <Image src={project.thumbnail}
          alt="Project Thumbnail"
          width={1024} height={768}
        />
        <div className="p-4">
          <h2 className="font-mono truncate text-lime-400">
            { project.name }
          </h2>
          <div className="text-zinc-400">
            { project.description }
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectItem