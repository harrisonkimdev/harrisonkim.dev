export interface Project {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  link: string;
  githubLink?: string;
  tags: string[];
  featured: boolean;
}

export const projectList: Project[] = [
  {
    id: 1,
    name: "dandycv",
    description: "A simple and easy-to-use AI-powered image editing program.",
    thumbnail: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=800&auto=format&fit=crop",
    link: "https://dandycv.vercel.app/",
    githubLink: "https://github.com/hhkimmm9/dandycv",
    tags: ["Next.js", "React", "AI", "Image Processing"],
    featured: true
  },
  {
    id: 2,
    name: "Soop Sok",
    description: "A real-time chat application with Firebase.",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
    link: "https://soop-sok.vercel.app/",
    githubLink: "https://github.com/hhkimmm9/soop-sok",
    tags: ["React", "Firebase", "Real-time"],
    featured: true
  },
  {
    id: 3,
    name: "Gallery",
    description: "This gallery showcases a curated collection of my photography. Each photo highlights the emotions and stories of the subjects, bringing out the depth and beauty in everyday life.",
    thumbnail: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?q=80&w=800&auto=format&fit=crop",
    link: "https://photobook-9mo4.vercel.app/",
    githubLink: "https://github.com/hhkimmm9/photobook",
    tags: ["Next.js", "Photography", "Gallery"],
    featured: true
  }
]; 