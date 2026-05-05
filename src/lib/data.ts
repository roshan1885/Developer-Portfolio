import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  image: ImagePlaceholder;
  liveUrl?: string;
  githubUrl?: string;
}

const getImage = (id: string): ImagePlaceholder => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        // Fallback image
        return {
            id: 'fallback',
            imageUrl: 'https://picsum.photos/seed/fallback/600/400',
            description: 'A placeholder image',
            imageHint: 'abstract'
        };
    }
    return img;
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Alt Preventor',
    description: 'An advanced handler which will detect, manage and prevent alt accounts on platforms, ensuring a secure and authentic user experience.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    image: getImage('project-1'),
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'proj-2',
    title: 'YAMDB',
    description: 'A perfect bot which will help you manage all your data and even your discord server with ease and efficiency.',
    techStack: ["Node.JS", "PostgreSQL", "Discord.js", "TypeScript"],
    image: getImage('project-2'),
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'proj-3',
    title: 'FreeWH',
    description: 'A quick and advanced to use web hosting platform that allows users to deploy their websites with just a few clicks, providing a seamless experience for both beginners and experienced developers.',
    techStack: ["PHP", "MySQL", "Docker", "Nginx", "NodeJS", "WHMCS"],
    image: getImage('project-3'),
    liveUrl: 'https://freewh.in.eu.org',
    githubUrl: '#',
  },
];
