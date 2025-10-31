'use client';

import { useSocialLinks } from '@/presentation/hooks';
import './Footer.scss';

const Footer = () => {
  const socialLinks = useSocialLinks();

  return (
    <footer className="footer-definitivo" role="contentinfo">
      <div className="contenedor">

        <nav className="iconos" aria-label="Enlaces a redes sociales">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <div key={link.id} className="iconic">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  title={link.name}
                >
                  <IconComponent className="icon-footer" aria-hidden="true" />
                </a>
              </div>
            );
          })}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
