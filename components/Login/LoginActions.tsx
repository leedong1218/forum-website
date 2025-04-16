// components/Login/LoginActions.tsx
import { Button, Typography, Link, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import styles from "@/styles/pages/Login.module.scss";

interface Props {
  loading: boolean;
}

export default function LoginActions({ loading }: Props) {
  const router = useRouter();

  return (
    <div className={styles.formActions}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        className={styles.loginButton}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "登入系統"
        )}
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        還沒有帳號？
        <Link 
          component="span" 
          onClick={() => router.push("/register")} 
          underline="hover" 
          className={styles.switchPageLink}
          sx={{ ml: 1, cursor: "pointer" }}
        >
          註冊新帳號
        </Link>
      </Typography>
    </div>
  );
}