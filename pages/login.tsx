// LoginForm.tsx
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import loginAPI from '@/services/Login/loginAPI';
import { getCaptcha } from '@/services/Captcha/captchaAPI';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Container,
  Paper,
  InputAdornment,
  Fade
} from '@mui/material';


interface LoginFormInputs {
  email: string;
  password: string;
  captcha_value: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [captcha, setCaptcha] = useState({ key: '', image_url: '' });

  const fetchCaptcha = async () => {
    const data = await getCaptcha();
    setCaptcha({
      key: data.key,
      image_url: data.image_url.replace('/backend', ''),
    });
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log(data.captcha_value);
    try {
      const res = await loginAPI.login(
        data.email,
        data.password,
        captcha.key,
        data.captcha_value
      );
      alert(res.message || '登入成功！');
    } catch (error: any) {
      alert(error.message || '登入失敗');
      fetchCaptcha(); // 刷新驗證碼
    }
  };  

  return (
    <Container maxWidth="sm">
      <Fade in={true} timeout={800}>
        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          elevation={3}
          sx={{ p: 4, mt: 8, borderRadius: 2 }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            登入
          </Typography>

          <TextField
            fullWidth
            label="帳號"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
            {...register('email', { required: '帳號是必填的' })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="密碼"
            type="password"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyOutlinedIcon />
                </InputAdornment>
              ),
            }}
            {...register('password', { required: '密碼是必填的' })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 3 }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              驗證碼
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${captcha.image_url?.replace('/backend', '')}`}
                alt="captcha"
                style={{ height: '50px' }}
              />
              <Button
                variant="outlined"
                startIcon={<RefreshOutlinedIcon />}
                onClick={fetchCaptcha}
              >
                重新產生
              </Button>
            </Stack>

            <TextField
              fullWidth
              label="請輸入驗證碼"
              variant="outlined"
              {...register('captcha_value', { required: '驗證碼是必填的' })}
              error={!!errors.captcha_value}
              helperText={errors.captcha_value?.message}
              sx={{ mt: 2 }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ py: 1.5, fontWeight: 600 }}
          >
            登入
          </Button>
        </Paper>
      </Fade>
    </Container>
  );
}
