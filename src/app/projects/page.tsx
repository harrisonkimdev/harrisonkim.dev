'use client';

import { useState } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilter from '@/components/projects/ProjectFilter';
import { projectList } from '@/data/projects';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string | null>(null);
  
  const filteredProjects = filter 
    ? projectList.filter(project => project.tags.includes(filter))
    : projectList;

  return (
    <div className="flex flex-col">
      <h1 className="section-title text-3xl">My Projects</h1>
      
      <ProjectFilter activeFilter={filter} setFilter={setFilter} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center mt-12 text-gray-400">
          No projects found with the selected filter.
        </div>
      )}
    </div>
  );
}