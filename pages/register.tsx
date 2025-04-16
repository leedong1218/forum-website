import RegisterAPI from "@/services/Register/RegisterAPI";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getCaptcha } from "@/services/Captcha/captchaAPI";
import {
  VpnKeyOutlined as VpnKeyOutlinedIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  RefreshOutlined as RefreshOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon
} from "@mui/icons-material";
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
import styles from "@/styles/pages/Login.module.scss";
import { useRouter } from "next/router";
import { useMessageModal } from "@/lib/context/MessageModalContext";
import { ModalTypes } from "@/lib/types/modalType";

interface RegisterFormInputs {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  captcha_value: string;
}

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { setIsShow, setModalProps } = useMessageModal();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();

  const [captcha, setCaptcha] = useState({ key: "", image_url: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [animatedFocus, setAnimatedFocus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    fetchCaptcha();

    const loginContainer = document.querySelector(`.${styles.loginContainer}`);
    if (loginContainer) {
      const floatingLines = document.createElement("div");
      floatingLines.className = styles.floatingLines;
      for (let i = 0; i < 10; i++) {
        const line = document.createElement("div");
        line.className = styles.line;
        floatingLines.appendChild(line);
      }
      loginContainer.appendChild(floatingLines);
    }
  }, []);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      await RegisterAPI.register({
        username: data.username,
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        captcha_key: captcha.key,
        captcha_value: data.captcha_value,
      });
  
      router.push('/verify-email');
      
    } catch (error: any) {
      setModalProps({
        type: ModalTypes.ERROR,
        message: error?.message || "註冊失敗，請稍後再試。",
      });
      setIsShow(true);
      fetchCaptcha(); // 刷新驗證碼
    } finally {
      setIsLoading(false);
    }
  };  

  const handleFieldFocus = (fieldName: string) => setAnimatedFocus(fieldName);
  const handleFieldBlur = () => setAnimatedFocus("");

  return (
    <div className={styles.loginContainer}>
      <Fade in={true} timeout={800}>
        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          elevation={3}
          sx={{ p: 4, borderRadius: 2 }}
          className={`${styles.registerPaper} ${styles.formFadeIn}`}
        >
          <Typography variant="h5" className={styles.registerTitle}>
            註冊新帳號
          </Typography>

          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="電子郵件"
            variant="outlined"
            className={animatedFocus === "email" ? styles.activeField : ""}
            onFocus={() => handleFieldFocus("email")}
            onBlur={handleFieldBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
            {...register("email", {
              required: "電子郵件是必填的",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "無效的電子郵件格式",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <div className={styles.gridContainer} style={{ marginBottom: "1rem" }}>
            <TextField
              fullWidth
              label="帳號"
              variant="outlined"
              className={animatedFocus === "username" ? styles.activeField : ""}
              onFocus={() => handleFieldFocus("username")}
              onBlur={handleFieldBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              {...register("username", {
                required: "帳號是必填的",
                minLength: {
                  value: 4,
                  message: "帳號長度不得小於4個字元",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: "帳號只能包含英文、數字和底線",
                },
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <TextField
              fullWidth
              label="姓名"
              variant="outlined"
              className={animatedFocus === "name" ? styles.activeField : ""}
              onFocus={() => handleFieldFocus("name")}
              onBlur={handleFieldBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              {...register("name", {
                required: "姓名是必填的",
                minLength: {
                  value: 2,
                  message: "姓名長度不得小於2個字元",
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </div>

          <div className={styles.gridContainer} style={{ marginBottom: "1rem" }}>
            <TextField
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
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password", {
                required: "密碼是必填的",
                minLength: {
                  value: 8,
                  message: "密碼長度不得小於8個字元",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message: "密碼必須包含大小寫字母和數字",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              fullWidth
              label="確認密碼"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              className={animatedFocus === "confirmPassword" ? styles.activeField : ""}
              onFocus={() => handleFieldFocus("confirmPassword")}
              onBlur={handleFieldBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("confirmPassword", {
                required: "請確認密碼",
                validate: (value) => value === watch("password") || "密碼不一致",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </div>

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
              className={styles.registerButton}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "註冊"}
            </Button>

            <Typography variant="body2" align="center">
              已有帳號？
              <Link
                component="span"
                className={styles.switchPageLink}
                onClick={() => router.push("/login")}
              >
                登入
              </Link>
            </Typography>
          </div>
        </Paper>
      </Fade>
    </div>
  );
}
