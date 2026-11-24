import type { DeveloperSupportInfo } from '@/types';
import { REPO_LINKS } from './repos';

export const DEVELOPER_SUPPORT: DeveloperSupportInfo = {
  name: 'Muhammad Yazid Akbar',
  qrisImageSrc: '/assets/images/support-qris.jpg',
  qrisDownloadName: 'support-qris-muhammad-yazid-akbar.jpg',
  qrisMerchantName: 'MUHAMMAD YAZID AKBAR',
  qrisNmid: 'ID1026623664764',
  repoSlug: REPO_LINKS.projectRepoSlug,
  repoUrl: REPO_LINKS.projectRepo,
  socialLinks: [
    {
      id: 'instagram',
      platform: 'Instagram',
      handle: '@_akbyzd',
      url: 'https://instagram.com/_akbyzd',
    },
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      handle: 'in/yazidakbar',
      url: 'https://linkedin.com/in/yazidakbar',
    },
    {
      id: 'github',
      platform: 'GitHub',
      handle: '@Yazz803',
      url: 'https://github.com/Yazz803',
    },
    {
      id: 'whatsapp',
      platform: 'WhatsApp',
      handle: '+62 812-9021-5655',
      url: 'https://wa.me/6281290215655',
    },
    {
      id: 'threads',
      platform: 'Threads',
      handle: '@_akbyzd',
      url: 'https://threads.com/@_akbyzd',
    },
    {
      id: 'facebook',
      platform: 'Facebook',
      handle: 'Lolsecz501',
      url: 'https://facebook.com/Lolsecz501',
    },
  ],
};
