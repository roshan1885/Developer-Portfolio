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
      imageUrl: '/images/placeholder.png',
      description: 'A placeholder image',
      imageHint: 'abstract'
    };
  }
  return img;
};
export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Alt Preventor',
    description: 'An advanced handler which will detect, manage and prevent alt accounts on platforms, ensuring a secure and authentic user experience.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    image: {
      id: 'alt-preventor',
      description: 'Alternate Account Prevention',
      imageUrl: '/images/Alt-Preventor.png',
      imageHint: 'dashboard ui',
    },
    liveUrl: '#',
  },
  {
    id: 'proj-2',
    title: 'Manual Ecommerce',
    description:  'A modern Ecommerce website, specially for those who does not want a payment gateway',
    techStack: ['PostgreSQL', 'TypeScript'],
    image: {
      id: 'manual-ecommerce',
      description: 'E-commerce store with a clean layout',
      imageUrl: '/images/Manual-Ecommerce.png',
      imageHint: 'ecommerce website',
    },
    liveUrl: 'https://manual-ecommerce.vercel.app',
    githubUrl: 'https://github.com/roshan1885/Manual-Ecommerce',
  },
  {
    id: 'proj-3',
    title: 'FreeWH',
    description: 'A quick and advanced to use web hosting platform that allows users to deploy their websites with just a few clicks, providing a seamless experience for both beginners and experienced developers.',
    techStack: [
      'PHP',
      'MySQL',
      'Docker',
      'Nginx',
      'NodeJS',
      'WHMCS',
    ],
    image: {
      id: 'freewh',
      description: 'Free Webhosting Provider site',
      imageUrl: '/images/FreeWH.png',
      imageHint: 'web servers',
    },
    liveUrl: 'https://freewh.in.eu.org',
  },
  {
    id: 'proj-4',
    title: 'Roblox Game Site',
    description: 'A fully customizable site for a Roblox game, allowing players to access game-related information, updates, and community features in one convenient location. It also offers an organised user management and staff dashboard for efficient administration and moderation of the game community.',
    techStack: [
      "TypeScript",
      "NodeJS",
      "PostgreSQL",
      "Vite",
      "Supabase",
    ],
    image: {
      id: 'roblox-game-site',
      description: 'Roblox Game Site',
      imageUrl: '/images/Roblox-Game-Site.png',
      imageHint: 'roblox game website',
    },
    liveUrl: 'https://roblox-game-site-psi.vercel.app',
    githubUrl: 'https://github.com/roshan1885/roblox-game-site',
  },
];