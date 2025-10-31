import { SocialLink } from '@/infrastructure/constants';
import { socialService } from '@/infrastructure/services';
import { useMemo } from 'react';

export const useSocialLinks = (): SocialLink[] => {
  return useMemo(() => {
    return socialService.getSocialLinks();
  }, []);
};
