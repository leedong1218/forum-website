// components/Login/CaptchaSection.tsx
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/RefreshOutlined";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { LoginFormInputs } from "./LoginForm";
import styles from "@/styles/pages/Login.module.scss";

interface Props {
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  captcha: { key: string; image_url: string };
  fetchCaptcha: () => void;
  disabled: boolean;
}

export default function CaptchaSection({ register, errors, captcha, fetchCaptcha, disabled }: Props) {
  return (
    <Box className={styles.captchaSection}>
      <Typography variant="body2" className={styles.captchaTitle}>
        驗證碼
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${captcha.image_url}`}
          alt="captcha"
          style={{ height: "50px" }}
          className={styles.captchaImage}
        />
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={fetchCaptcha}
          className={styles.refreshButton}
          disabled={disabled}
        >
          重新產生
        </Button>
      </Stack>

      <TextField
        fullWidth
        label="請輸入驗證碼"
        variant="outlined"
        margin="normal"
        {...register("captcha_value", { required: "驗證碼是必填的" })}
        error={!!errors.captcha_value}
        helperText={errors.captcha_value?.message}
        sx={{ mt: 2, mb: 0 }}
      />
    </Box>
  );
}