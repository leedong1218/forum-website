import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Button,
  Stack,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  Fade
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface LoginFormInputs {
  userName: string;
  password: string;
  email?: string;
  confirmPassword?: string;
  captcha?: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  const [selectedTab, setSelectedTab] = useState<string>("登入");
  const [captcha, setCaptcha] = useState<string>("");
  const [userCaptcha, setUserCaptcha] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<string>("");
  const screenSizeRef = useRef<string>("");
  
  // Track screen size for responsive design
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let size = "";
      if (width < 600) size = "xs";
      else if (width < 900) size = "sm";
      else if (width < 1200) size = "md";
      else size = "lg";
      
      if (screenSizeRef.current !== size) {
        screenSizeRef.current = size;
        setScreenSize(size);
      }
    };
    
    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate captcha
  const generateCaptcha = () => {
    const chars = '0123456789';
    const captchaLength = 4;
    let result = '';
    for (let i = 0; i < captchaLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  // Regenerate captcha when tab changes or on component mount
  useEffect(() => {
    generateCaptcha();
  }, [selectedTab]);

  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    // Captcha validation
    if (userCaptcha !== captcha) {
      alert("驗證碼錯誤");
      generateCaptcha(); // Regenerate captcha after failed attempt
      return;
    }

    console.log(data);
    if (selectedTab === "登入") {
      // Login logic
      console.log("Login attempt:", {
        userName: data.userName,
        password: data.password
      });
    } else {
      // Registration logic
      console.log("Registration attempt:", {
        userName: data.userName,
        email: data.email,
        password: data.password
      });
    }

    // Reset form and captcha after successful submission
    reset();
    setUserCaptcha("");
    generateCaptcha();
  };

  return (
    <Container 
      disableGutters 
      maxWidth={false}
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f9fc',
        padding: { xs: 2, sm: 3, md: 4 }
      }}>
      <Fade in={true} timeout={800}>
        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "520px", md: "600px" },
            p: { xs: 2.5, sm: 3, md: 5 },
            borderRadius: { xs: 2, md: 3 },
            background: "linear-gradient(145deg, #ffffff, #f8f9ff)",
            border: "1px solid rgba(25,118,210,0.08)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
            overflowX: "hidden"
          }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ 
                fontWeight: 700, 
                color: "#1976d2",
                letterSpacing: '1px',
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
              }}
            >
              {selectedTab}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                px: { xs: 1, sm: 2 },
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}
            >
              {selectedTab === "登入" ? "歡迎回來，請輸入您的帳號和密碼" : "建立一個新帳號，開始您的旅程"}
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={selectedTab}
            exclusive
            onChange={(e, newValue) => {
              if (newValue !== null) {
                setSelectedTab(newValue);
              }
            }}
            size={screenSize === "xs" ? "small" : "medium"}
            sx={{ 
              mb: { xs: 3, md: 4 }, 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center',
              '& .MuiToggleButtonGroup-grouped': {
                border: '1px solid rgba(25,118,210,0.12)',
                '&:not(:first-of-type)': {
                  borderRadius: { xs: '0 12px 12px 0', md: '0 16px 16px 0' },
                },
                '&:first-of-type': {
                  borderRadius: { xs: '12px 0 0 12px', md: '16px 0 0 16px' },
                },
              }
            }}
          >
            <ToggleButton
              value="登入"
              aria-label="login"
              sx={{ 
                px: 4, 
                py: 1,
                fontWeight: selectedTab === "登入" ? 600 : 400,
                color: selectedTab === "登入" ? '#ffffff' : '#1976d2',
                backgroundColor: selectedTab === "登入" ? '#1976d2' : 'transparent',
                '&:hover': {
                  backgroundColor: selectedTab === "登入" ? '#1565c0' : 'rgba(25,118,210,0.08)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              登入
            </ToggleButton>
            <ToggleButton
              value="註冊"
              aria-label="register"
              sx={{ 
                px: 4, 
                py: 1,
                fontWeight: selectedTab === "註冊" ? 600 : 400,
                color: selectedTab === "註冊" ? '#ffffff' : '#1976d2',
                backgroundColor: selectedTab === "註冊" ? '#1976d2' : 'transparent',
                '&:hover': {
                  backgroundColor: selectedTab === "註冊" ? '#1565c0' : 'rgba(25,118,210,0.08)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              註冊
            </ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="帳號"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              {...register("userName", {
                required: "帳號是必填的",
                minLength: {
                  value: 4,
                  message: "帳號至少需要4個字元"
                }
              })}
              error={!!errors.userName}
              helperText={errors.userName?.message}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                    borderWidth: '2px'
                  }
                }
              }}
            />

            {selectedTab === "註冊" && (
              <TextField
                fullWidth
                label="電子郵件"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                {...register("email", {
                  required: "電子郵件是必填的",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "無效的電子郵件地址"
                  }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            )}

            <TextField
              fullWidth
              label="密碼"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password", {
                required: "密碼是必填的",
                minLength: {
                  value: 6,
                  message: "密碼至少需要6個字元"
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: "密碼需包含至少一個字母和一個數字"
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            {selectedTab === "註冊" && (
              <TextField
                fullWidth
                label="確認密碼"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register("confirmPassword", {
                  required: "請再次輸入密碼",
                  validate: (value) =>
                    value === passwordValue || "兩次輸入的密碼不一致"
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            )}

            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                驗證碼
              </Typography>
              
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{
                  display: 'flex',
                  alignItems: { xs: 'stretch', sm: 'center' },
                  width: '100%'
                }}
              >
                <Box
                  sx={{
                    width: { xs: '100%', sm: '150px' },
                    height: '50px',
                    backgroundColor: 'rgba(25,118,210,0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 2,
                    userSelect: 'none',
                    letterSpacing: '8px',
                    paddingLeft: '8px',
                    fontWeight: 'bold',
                    fontSize: { xs: '22px', sm: '24px' },
                    color: '#1976d2',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  {captcha}
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<RefreshOutlinedIcon />}
                  onClick={generateCaptcha}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                    width: { xs: '100%', sm: 'auto' },
                    textTransform: 'none',
                    boxShadow: 'none'
                  }}
                >
                  重新產生
                </Button>
              </Stack>

              <TextField
                fullWidth
                label="請輸入驗證碼"
                variant="outlined"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                error={userCaptcha !== captcha && userCaptcha.length > 0}
                helperText={
                  userCaptcha !== captcha && userCaptcha.length > 0
                    ? "驗證碼不正確"
                    : ""
                }
                sx={{ 
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: '#1976d2',
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#1565c0',
                  boxShadow: '0 8px 16px rgba(21,101,192,0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {selectedTab}
            </Button>

            {selectedTab === "登入" && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  忘記密碼？ <Button color="primary" sx={{ textTransform: 'none', fontWeight: 600, p: 0, minWidth: 'auto' }}>重設密碼</Button>
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 4, opacity: 0.7 }}>
              <Typography variant="body2" color="text.secondary">
                或者
              </Typography>
            </Divider>

            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center"
            >
              <Button
                variant="outlined"
                sx={{
                  py: 1,
                  px: 3,
                  borderRadius: 2,
                  borderColor: 'rgba(59, 89, 152, 0.5)',
                  color: '#3b5998',
                  textTransform: 'none',
                  flex: { xs: '1', sm: '0 1 auto' },
                  '&:hover': {
                    borderColor: '#3b5998',
                    backgroundColor: 'rgba(59, 89, 152, 0.04)'
                  }
                }}
              >
                Facebook 登入
              </Button>
              <Button
                variant="outlined"
                sx={{
                  py: 1,
                  px: 3,
                  borderRadius: 2,
                  borderColor: 'rgba(219, 68, 55, 0.5)',
                  color: '#db4437',
                  textTransform: 'none',
                  flex: { xs: '1', sm: '0 1 auto' },
                  '&:hover': {
                    borderColor: '#db4437',
                    backgroundColor: 'rgba(219, 68, 55, 0.04)'
                  }
                }}
              >
                Google 登入
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}