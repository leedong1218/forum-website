import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCaptcha } from "@/services/Captcha/captchaAPI";
import UserAPI from "@/services/User/UserAPI";
import { useMessageModal } from "@/lib/context/MessageModalContext";
import { ModalTypes } from "@/lib/types/modalType";
import {
  Box, Button, TextField, Typography, Stack, Paper, CircularProgress,
  InputAdornment, Fade, styled
} from "@mui/material";
import {
  EmailOutlined, RefreshOutlined, Send, Edit
} from "@mui/icons-material";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.main}40 100%)`,
  padding: theme.spacing(2),
}));

const PaperBox = styled(Paper)(({ theme }) => ({
  maxWidth: 580,
  width: "100%",
  padding: theme.spacing(5),
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
}));

const CaptchaImage = styled("img")(({ theme }) => ({
  height: 56,
  cursor: "pointer",
  borderRadius: 8,
  border: `1px solid ${theme.palette.grey[300]}`,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
}));

interface Inputs {
  email: string;
  captcha_value: string;
}

export default function EmailVerificationForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>();
  const [captcha, setCaptcha] = useState({ key: "", image_url: "" });
  const [loading, setLoading] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const { setModalProps, setIsShow } = useMessageModal();

  const fetchCaptcha = async () => {
    try {
      const res = await getCaptcha();
      setCaptcha({ key: res.key, image_url: res.image_url.replace("/backend", "") });
    } catch {
      setModalProps({
        type: ModalTypes.ERROR,
        message: "載入驗證碼失敗",
      });
      setIsShow(true);
    }
  };

  useEffect(() => {
    const init = async () => {
      fetchCaptcha();
      try {
        const res = await UserAPI.selfEmail();
        const email = res.data?.email;
        if (email) setValue("email", email);
      } catch {
        setModalProps({
          type: ModalTypes.ERROR,
          message: "無法取得使用者信箱",
        });
        setIsShow(true);
      }
    };
    init();
  }, []);

  const onSubmit = async (data: Inputs) => {
    setLoading(true);
    try {
      await UserAPI.verifyEmail({
        email: data.email,
        captcha_key: captcha.key,
        captcha_value: data.captcha_value,
      });
      setModalProps({
        type: ModalTypes.SUCCESS,
        message: `驗證信已發送至 ${data.email}`,
      });
      setIsShow(true);
      fetchCaptcha();
    } catch (err: any) {
      const errorText = err?.message || "發送失敗，請稍後再試。";
      setModalProps({ type: ModalTypes.ERROR, message: errorText });
      setIsShow(true);
      fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const toggleEmailEdit = () => {
    setEmailDisabled(!emailDisabled);
  };

  return (
    <Container>
      <Fade in timeout={500}>
        <PaperBox>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight="bold" mb={1} color="primary.main">
              驗證電子郵件
            </Typography>
            <Typography variant="body2" color="text.secondary">
              請確認您的電子郵件地址，以完成帳號驗證程序
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              電子郵件
            </Typography>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <TextField
                placeholder="your@email.com"
                fullWidth
                disabled={emailDisabled}
                {...register("email", {
                  required: "請輸入電子郵件",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "無效的電子郵件格式",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined color="primary" />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: emailDisabled ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }
                }}
              />
              <Button
                variant={emailDisabled ? "outlined" : "contained"}
                color={emailDisabled ? "primary" : "info"}
                onClick={toggleEmailEdit}
                sx={{
                  minWidth: '120px',
                  height: 56,
                  boxShadow: emailDisabled ? 'none' : 2,
                  transition: 'all 0.2s ease-in-out',
                }}
                startIcon={<Edit />}
              >
                {emailDisabled ? "修改信箱" : "確認"}
              </Button>
            </Stack>

            <Typography variant="subtitle2" color="text.secondary" mt={3} mb={1}>
              請輸入驗證碼
            </Typography>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <TextField
                placeholder="輸入驗證碼"
                size="medium"
                {...register("captcha_value", { required: "請輸入驗證碼" })}
                error={!!errors.captcha_value}
                helperText={errors.captcha_value?.message}
                sx={{ width: '40%' }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CaptchaImage
                  src={`${process.env.NEXT_PUBLIC_API_URL}${captcha.image_url}`}
                  onClick={fetchCaptcha}
                  alt="驗證碼"
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={fetchCaptcha}
                  startIcon={<RefreshOutlined />}
                  sx={{ height: 56 }}
                >
                  重新整理
                </Button>
              </Box>
            </Stack>

            <Button
              fullWidth
              variant="contained"
              endIcon={<Send />}
              type="submit"
              disabled={loading}
              sx={{
                mt: 4,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 2,
                boxShadow: 3,
                background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 5,
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {loading ? <CircularProgress size={24} /> : "發送驗證信"}
            </Button>
          </form>
        </PaperBox>
      </Fade>
    </Container>
  );
}
