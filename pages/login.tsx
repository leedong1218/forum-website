import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "800px",
        p: 5,
        borderRadius: 2,
        background: "#fff",
        border: "1px solid rgba(25,118,210,0.2)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 600, mb: 3, color: "#263238" }}
      >
        {selectedTab}
      </Typography>

      <ToggleButtonGroup
        value={selectedTab}
        exclusive
        onChange={(e, newValue) => {
          if (newValue !== null) {
            setSelectedTab(newValue);
          }
        }}
        sx={{ mb: 2, width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <ToggleButton
          value="登入"
          aria-label="login"
          sx={{ px: 4, borderRadius: "8px 0 0 8px" }}
        >
          登入
        </ToggleButton>
        <ToggleButton 
          value="註冊" 
          aria-label="register" 
          sx={{ px: 4, borderRadius: "0 8px 8px 0" }}
        >
          註冊
        </ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="帳號"
          variant="outlined"
          {...register("userName", { 
            required: "帳號是必填的",
            minLength: {
              value: 4,
              message: "帳號至少需要4個字元"
            }
          })}
          error={!!errors.userName}
          helperText={errors.userName?.message}
          sx={{ mb: 2 }}
        />

        {selectedTab === "註冊" && (
          <TextField
            fullWidth
            label="電子郵件"
            variant="outlined"
            {...register("email", {
              required: "電子郵件是必填的",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "無效的電子郵件地址"
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
          />
        )}

        <TextField
          fullWidth
          label="密碼"
          type="password"
          variant="outlined"
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
          sx={{ mb: 2 }}
        />

        {selectedTab === "註冊" && (
          <TextField
            fullWidth
            label="確認密碼"
            type="password"
            variant="outlined"
            {...register("confirmPassword", {
              required: "請再次輸入密碼",
              validate: (value) => 
                value === passwordValue || "兩次輸入的密碼不一致"
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{ mb: 2 }}
          />
        )}

        <Stack 
          direction="row" 
          spacing={2} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2 
          }}
        >
          <Box
            sx={{
              width: '150px',
              height: '50px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 2,
              userSelect: 'none',
              letterSpacing: '10px',
              fontWeight: 'bold',
              fontSize: '24px',
              color: '#1976d2'
            }}
          >
            {captcha}
          </Box>
          <Button 
            variant="outlined" 
            onClick={generateCaptcha}
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
          sx={{ mb: 2 }}
        />

        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          sx={{ 
            mt: 2, 
            py: 1.5,
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          {selectedTab}
        </Button>
      </Box>
    </Box>
  );
}