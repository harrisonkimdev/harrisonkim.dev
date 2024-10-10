import Image from "next/image"
import Link from "next/link"

type TProjectItemProps = {
  project: any
}

const ProjectItem = ({ project }: TProjectItemProps) => {
  return (
    <Link href={project.link} target="_blank">
      <div className="
        flex flex-col justify-center
        px-6 pt-6 pb-16 border rounded-md shadow
      ">
        <Image src={project.thumbnail} alt="" width={870} height={902} className="w-full"/>
        <span className="font-mono mt-4 text-xl text-black">
          { project.name }
        </span>
        <div className="flex flex-col mt-2 font-mono text-zinc-400">
          <span>
            { project.description }
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProjectItem