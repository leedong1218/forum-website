import { SvgIconComponent } from "@mui/icons-material";

export type BannerType = {
  title: string;
  content?: string;
  icon?: SvgIconComponent;
  children?: React.ReactNode;
};
