import { SocialLink } from "../constants";
import { SOCIAL_LINKS } from "../constants/social.constants";


class SocialService {
  getSocialLinks(): SocialLink[] {
    return SOCIAL_LINKS;
  }

  getSocialLinkById(id: string): SocialLink | undefined {
    return SOCIAL_LINKS.find((link) => link.id === id);
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

export const socialService = new SocialService();
