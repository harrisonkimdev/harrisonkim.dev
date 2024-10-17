import Image from "next/image"
import Link from "next/link"
import { IProject } from "@/interfaces"

type TProjectItemProps = {
  project: IProject
}

const ProjectItem = ({ project }: TProjectItemProps) => {
  return (
    <Link href={`projects/${project.id}`} className="
      flex flex-col justify-center pb-15 bg-zinc-950 font-mono
    ">
      <Image src={project.thumbnail}
        alt="Project Thumbnail" width={1024} height={768}
        className="h-full object-cover"
      />
      <div className="p-4">
        <h2 className="font-mono font-light truncate text-lime-400">
          { project.name }
        </h2>
        <div className="text-zinc-400">
          { project.description }
        </div>
      </div>
    </Link>
  )
}

export default ProjectItem