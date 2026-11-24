export type SocialPlatformId =
  | 'instagram'
  | 'linkedin'
  | 'github'
  | 'whatsapp'
  | 'threads'
  | 'facebook';

export interface SocialLinkItem {
  id: SocialPlatformId;
  platform: string;
  handle: string;
  url: string;
}

export interface DeveloperSupportInfo {
  name: string;
  qrisImageSrc: string;
  qrisDownloadName: string;
  qrisMerchantName: string;
  qrisNmid: string;
  repoSlug: string;
  repoUrl: string;
  socialLinks: readonly SocialLinkItem[];
}
