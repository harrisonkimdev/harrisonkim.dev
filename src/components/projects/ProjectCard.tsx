'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="card overflow-hidden flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
        
        <p className="text-gray-300 mb-4 flex-1">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 bg-black/30 border border-gray-800 rounded-full text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <Link 
            href={project.link} 
            target="_blank"
            rel="noopener noreferrer" 
            className="btn btn-primary flex items-center gap-2 text-sm"
          >
            <FiExternalLink size={14} /> 
            Visit Site
          </Link>
          
          {project.githubLink && (
            <Link 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline flex items-center gap-2 text-sm"
            >
              <FiGithub size={14} /> 
              Code
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 