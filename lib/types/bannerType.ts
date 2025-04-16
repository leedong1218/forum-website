
export type BannerType = {
  title: string;
  content?: string;
  avatarUrl?: string | null;
  bgColor?: string;
  textColor?: string;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
};
