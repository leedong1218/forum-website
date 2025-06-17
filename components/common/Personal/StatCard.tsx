import { Box, Paper, Typography } from "@mui/material";
interface Type {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  count: number;
}

const CARD_STYLES = {
  p: 2,
  borderRadius: 3,
  border: '1px solid rgba(0,0,0,0.06)',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    borderColor: 'rgba(0,0,0,0.12)',
  },
};

const accentColor = "#0ea5e9"; // 主藍色

export const StatCard = ({ icon: Icon, label, count }: Type) => (
  <Paper sx={CARD_STYLES}>
    <Icon sx={{ color: accentColor, mr: 1.5, fontSize: 24 }} />
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
        {count}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  </Paper>
);