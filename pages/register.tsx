import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getCaptcha } from "@/services/Captcha/captchaAPI";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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

// 註冊 API 服務
const registerAPI = {
  register: async (
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    captchaKey: string,
    captchaValue: string
  ) => {
    // 實際專案中，這裡應該是真正的API調用
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "註冊成功！" });
      }, 1000);
    });
  },
};

interface RegisterFormInputs {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  captcha_value: string;
}

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<RegisterFormInputs>();

  const [captcha, setCaptcha] = useState({ key: "", image_url: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [animatedFocus, setAnimatedFocus] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
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
    
    // 添加懸浮線條動畫元素
    const loginContainer = document.querySelector(`.${styles.loginContainer}`);
    if (loginContainer) {
      const floatingLines = document.createElement('div');
      floatingLines.className = styles.floatingLines;
      
      // 創建10條線
      for (let i = 0; i < 10; i++) {
        const line = document.createElement('div');
        line.className = styles.line;
        floatingLines.appendChild(line);
      }
      
      loginContainer.appendChild(floatingLines);
    }
  }, []);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const res = await registerAPI.register(
        data.name,
        data.email,
        data.phone,
        data.password,
        data.confirmPassword,
        captcha.key,
        data.captcha_value
      );
      setRegisterSuccess(true);
      setTimeout(() => {
        if (onSwitchToLogin) {
          onSwitchToLogin();
        } else {
          router.push("/login");
        }
      }, 2000);
    } catch (error: any) {
      alert(error.message || "註冊失敗");
      fetchCaptcha(); // 刷新驗證碼
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

  if (registerSuccess) {
    return (
      <div className={styles.loginContainer}>
        <Fade in={true} timeout={800}>
          <Paper
            elevation={3}
            sx={{ p: 4, borderRadius: 2 }}
            className={`${styles.registerPaper} ${styles.formFadeIn}`}
          >
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2 }}>
                註冊成功！
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                您的帳號已成功創建，即將自動跳轉到登入頁面...
              </Typography>
              <CircularProgress size={24} />
            </Box>
          </Paper>
        </Fade>
      </div>
    );
  }

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

          <div className={styles.gridContainer} style={{marginBottom: '1rem'}}>
            <TextField
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

            <TextField
              fullWidth
              label="手機號碼"
              variant="outlined"
              className={animatedFocus === "phone" ? styles.activeField : ""}
              onFocus={() => handleFieldFocus("phone")}
              onBlur={handleFieldBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIphoneOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              {...register("phone", {
                required: "手機號碼是必填的",
                pattern: {
                  value: /^09\d{8}$/,
                  message: "請輸入有效的台灣手機號碼",
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </div>

          <div className={styles.gridContainer} style={{marginBottom: '1rem'}}>
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
                      aria-label="切換密碼可見性"
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
                      aria-label="切換確認密碼可見性"
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
                validate: (value) =>
                  value === watch("password") || "密碼不一致",
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
              className={styles.registerButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "註冊"
              )}
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