import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import loginAPI from "@/services/Login/loginAPI";
import { getCaptcha } from "@/services/Captcha/captchaAPI";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
  InputAdornment,
  Fade,
  Link,
  CircularProgress,
  IconButton,
} from "@mui/material";

// 導入模組化 SCSS 樣式
import styles from "@/styles/pages/Login.module.scss";
import { useRouter } from "next/router";
import { useMessageModal } from "@/lib/context/MessageModalContext";
import { ModalTypes } from "@/lib/types/modalType";

interface LoginFormInputs {
  email: string;
  password: string;
  captcha_value: string;
}

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { setIsShow, setModalProps } = useMessageModal();

  const [captcha, setCaptcha] = useState({ key: "", image_url: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [animatedFocus, setAnimatedFocus] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const fetchCaptcha = async () => {
    try {
      const data = await getCaptcha();
      setCaptcha({
        key: data.key,
        image_url: data.image_url.replace("/backend", ""),
      });
    } catch (error) {
      console.error("獲取驗證碼失敗", error);
    }
  };

  useEffect(() => {
    localStorage.removeItem('access_token');
    fetchCaptcha();

    // 添加懸浮線條動畫元素
    const loginContainer = document.querySelector(`.${styles.loginContainer}`);
    if (loginContainer) {
      const floatingLines = document.createElement("div");
      floatingLines.className = styles.floatingLines;

      // 創建10條線
      for (let i = 0; i < 10; i++) {
        const line = document.createElement("div");
        line.className = styles.line;
        floatingLines.appendChild(line);
      }

      loginContainer.appendChild(floatingLines);
    }
  }, []);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const res = await loginAPI.login(
        data.email,
        data.password,
        captcha.key,
        data.captcha_value
      );

      setModalProps({
        type: ModalTypes.SUCCESS,
        message: res.message || "登入成功！",
      });
      setIsShow(true);

      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setModalProps({
        type: ModalTypes.ERROR,
        message: error.message || "登入失敗",
      });
      setIsShow(true);

      fetchCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldFocus = (fieldName: string) => {
    setAnimatedFocus(fieldName);
  };

  const handleFieldBlur = () => {
    setAnimatedFocus("");
  };

  return (
    <div className={styles.loginContainer}>
      <Fade in={true} timeout={800}>
        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          elevation={3}
          sx={{ p: 4, borderRadius: 2 }}
          className={`${styles.loginPaper} ${styles.formFadeIn}`}
        >
          <Typography variant="h5" className={styles.loginTitle}>
            登入系統
          </Typography>

          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="帳號"
            variant="outlined"
            className={animatedFocus === "email" ? styles.activeField : ""}
            onFocus={() => handleFieldFocus("email")}
            onBlur={handleFieldBlur}
            placeholder="請輸入e-mail"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
            {...register("email", { required: "帳號是必填的" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="密碼"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            className={animatedFocus === "password" ? styles.activeField : ""}
            onFocus={() => handleFieldFocus("password")}
            onBlur={handleFieldBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="切換密碼可見性"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("password", { required: "密碼是必填的" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Box className={styles.captchaSection}>
            <Typography variant="body2" className={styles.captchaTitle}>
              驗證碼
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${captcha.image_url?.replace("/backend", "")}`}
                alt="captcha"
                style={{ height: "50px" }}
                className={styles.captchaImage}
              />
              <Button
                variant="outlined"
                startIcon={<RefreshOutlinedIcon />}
                onClick={fetchCaptcha}
                className={styles.refreshButton}
                disabled={isLoading}
              >
                重新產生
              </Button>
            </Stack>

            <TextField
              fullWidth
              label="請輸入驗證碼"
              variant="outlined"
              className={animatedFocus === "captcha" ? styles.activeField : ""}
              onFocus={() => handleFieldFocus("captcha")}
              onBlur={handleFieldBlur}
              {...register("captcha_value", { required: "驗證碼是必填的" })}
              error={!!errors.captcha_value}
              helperText={errors.captcha_value?.message}
              sx={{ mt: 2, mb: 0 }}
            />
          </Box>

          <div className={styles.formActions}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "登入系統"
              )}
            </Button>

            <Typography variant="body2" align="center">
              還沒有帳號？
              <Link
                component="span"
                className={styles.switchPageLink}
                onClick={() => router.push("/register")}
              >
                註冊新帳號
              </Link>
            </Typography>
          </div>
        </Paper>
      </Fade>
    </div>
  );
}
