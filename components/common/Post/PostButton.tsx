import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

export default function PostButton() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Button
    onClick={() => router.push('/create-post')}
      variant="contained"
      startIcon={<Add />}
      sx={{
        bgcolor: "white",
        color: theme.palette.primary.dark,
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.99)",
        },
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(14, 165, 233, 0.3)",
        textTransform: "none",
        fontWeight: 600,
        px: 3,
      }}
    >
      發布新文章
    </Button>
  );
}
