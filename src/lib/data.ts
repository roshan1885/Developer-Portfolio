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
    image: {
      id: "alt-preventor",
      description: "Alternate Account Prevention",
      imageUrl: "https://cdn.postimage.me/2026/09/26/Manual-Ecommerce.png",
      imageHint: "dashboard ui"
    },
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'proj-2',
    title: 'Manual Ecommerce',
    description: 'A modern Ecommerce website, specially for those who does not want a payment gateway',
    techStack: ["PostgreSQL", "TypeScript"],
    image: {
      id: "manual-ecommerce",
      description: "E-commerce store with a clean layout",
      imageUrl: "https://cdn.postimage.me/2026/09/26/Alt-Preventor.png",
      imageHint: "ecommerce website"
    },
    liveUrl: 'https://manual-ecommerce.vercel.app',
    githubUrl: 'https://github.com/roshan1885/Manual-Ecommerce',
  },
  {
    id: 'proj-3',
    title: 'FreeWH',
    description: 'A quick and advanced to use web hosting platform that allows users to deploy their websites with just a few clicks, providing a seamless experience for both beginners and experienced developers.',
    techStack: ["PHP", "MySQL", "Docker", "Nginx", "NodeJS", "WHMCS"],
    image: {
      id: "freewh",
      description: "Free Webhosting Provider site",
      imageUrl: "https://cdn.postimage.me/2026/09/26/FreeWH.png",
      imageHint: "Web Servers"
    },
    liveUrl: 'https://freewh.in.eu.org',
    githubUrl: '#',
  },
];
