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
    thumbnail: "/images/screenshots/dandycv.png",
    link: "https://dandycv.vercel.app/",
    githubLink: "https://github.com/hhkimmm9/dandycv",
    tags: ["Next.js", "React", "AI", "Image Processing"],
    featured: true
  },
  {
    id: 2,
    name: "Soop Sok",
    description: "A real-time chat application with Firebase.",
    thumbnail: "/images/screenshots/soop-sok.webp",
    link: "https://soop-sok.vercel.app/",
    githubLink: "https://github.com/hhkimmm9/soop-sok",
    tags: ["React", "Firebase", "Real-time"],
    featured: true
  },
  {
    id: 3,
    name: "Gallery",
    description: "This gallery showcases a curated collection of my photography. Each photo highlights the emotions and stories of the subjects, bringing out the depth and beauty in everyday life.",
    thumbnail: "/images/projects/photographer-kim.jpg",
    link: "https://photobook-9mo4.vercel.app/",
    githubLink: "https://github.com/hhkimmm9/photobook",
    tags: ["Next.js", "Photography", "Gallery"],
    featured: true
  }
]; 