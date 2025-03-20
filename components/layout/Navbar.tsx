import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '系統公告',
    title: '系統公告',
    icon: <DashboardIcon />,
  },
  {
    segment: '所有看板',
    title: '所有看板',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: '所有文章',
    title: '所有文章',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: '追蹤看板',
  },
//   {
//     segment: 'reports',
//     title: 'Reports',
//     icon: <BarChartIcon />,
//     children: [
//       {
//         segment: 'sales',
//         title: 'Sales',
//         icon: <DescriptionIcon />,
//       },
//       {
//         segment: 'traffic',
//         title: 'Traffic',
//         icon: <DescriptionIcon />,
//       },
//     ],
//   },
  {
    segment: '搞笑版',
    title: '搞笑版',
    icon: <LayersIcon />,
  },
  {
    segment: '搞笑版',
    title: '搞笑版',
    icon: <LayersIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function Navbar({ children }: { children: React.ReactNode }) {

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
    >
      <DashboardLayout>
        <PageContainer>
          {children}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
