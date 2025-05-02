'use client';

import { useMemo } from 'react';
import { projectList } from '@/data/projects';

interface ProjectFilterProps {
  activeFilter: string | null;
  setFilter: (filter: string | null) => void;
}

const ProjectFilter = ({ activeFilter, setFilter }: ProjectFilterProps) => {
  // Get unique tags from all projects
  const uniqueTags = useMemo(() => {
    const allTags = projectList.flatMap(project => project.tags);
    return Array.from(new Set(allTags)).sort();
  }, []);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            activeFilter === null
              ? 'bg-primary text-black'
              : 'bg-accent text-gray-300 hover:bg-gray-800'
          }`}
        >
          All
        </button>

        {uniqueTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === tag
                ? 'bg-primary text-black'
                : 'bg-accent text-gray-300 hover:bg-gray-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilter; 