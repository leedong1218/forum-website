import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button
} from '@mui/material';
import {
  Groups,
  Forum,
} from '@mui/icons-material';
import { boards } from '@/lib/data/personal/detail';
import { TabPanelProps } from '@/lib/types/userProfileType';

// Tab panel component for the parent tabs
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function BoardList() {
  // Sample tab value (in a real component, this would be passed as a prop)
  const tabValue = 1;

  // Handle follow/unfollow action
  const handleFollowToggle = (boardId: number) => {
    console.log(boardId);
  };

  return (
    <TabPanel value={tabValue} index={1}>
      <Grid sx={{display: 'grid', gridTemplateColumns: {xl: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)'}, gap: 3}}>
        {boards.map((board) => {
          return (
            <Grid key={board.id}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
                    borderColor: "rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    pb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: board.color,
                        fontWeight: 600,
                        mr: 1.5,
                        width: 40,
                        height: 40,
                      }}
                    >
                      {board.icon}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, lineHeight: 1.2 }}
                      >
                        {board.name}
                      </Typography>
                      <Chip
                        label={`活躍度: ${board.activityLevel}`}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.65rem",
                          bgcolor:
                            board.activityLevel === "高"
                              ? "#dcfce7"
                              : "#fef3c7",
                          color:
                            board.activityLevel === "高"
                              ? "#16a34a"
                              : "#d97706",
                          fontWeight: 600,
                          mt: 0.5,
                        }}
                      />
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flexGrow: 1,
                    }}
                  >
                    {board.description}
                  </Typography>

                  <Box
                    sx={{ pt: 2, borderTop: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          fontWeight: 500,
                        }}
                      >
                        <Groups sx={{ mr: 0.5, fontSize: 14 }} />
                        {board.members.toLocaleString()} 成員
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          fontWeight: 500,
                        }}
                      >
                        <Forum sx={{ mr: 0.5, fontSize: 14 }} />
                        {board.posts.toLocaleString()} 文章
                      </Typography>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleFollowToggle(board.id)}
                      sx={{
                        bgcolor: 'transparent',
                        color: "text.secondary",
                        border: "1px solid rgba(0,0,0,0.12)",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.04)"
                        },
                      }}
                    >
                      已追蹤
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </TabPanel>
  );
}