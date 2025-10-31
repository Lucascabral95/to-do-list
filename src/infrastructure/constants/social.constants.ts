import { FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa6';
import { SocialLink } from './socialLink.constants';

export const SOCIAL_LINKS = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/Lucascabral95',
    icon: FaGithub,
    ariaLabel: 'Visitar perfil de GitHub',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://facebook.com/profile',
    icon: FaFacebook,
    ariaLabel: 'Visitar perfil de Facebook',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/lucascabral195',
    icon: FaInstagram,
    ariaLabel: 'Visitar perfil de Instagram',
  },
] as const satisfies SocialLink[];
