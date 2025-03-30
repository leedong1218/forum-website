import { NotificationsActive } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function SubscribeButton() {
  return (
    <Button
      variant="outlined"
      startIcon={<NotificationsActive />}
      sx={{
        borderColor: "rgba(255,255,255,0.5)",
        color: "white",
        "&:hover": {
          borderColor: "white",
          bgcolor: "rgba(255,255,255,0.1)",
        },
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
      }}
    >
      訂閱通知
    </Button>
  );
}
