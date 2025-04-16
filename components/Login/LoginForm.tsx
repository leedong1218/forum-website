import { Paper, Fade, Typography } from "@mui/material";
import styles from "@/styles/pages/Login.module.scss";
import { getCaptcha } from "@/services/Captcha/captchaAPI";
import loginAPI from "@/services/Login/loginAPI";
import { useMessageModal } from "@/lib/context/MessageModalContext";
import { ModalTypes } from "@/lib/types/modalType";
import EmailPasswordFields from "./EmailPasswordFields";
import CaptchaSection from "./CaptchaSection";
import LoginActions from "./LoginActions";
import GoogleLoginButton from "./GoogleLoginButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface LoginFormInputs {
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
  const router = useRouter();
  const { setIsShow, setModalProps } = useMessageModal();

  const [captcha, setCaptcha] = useState({ key: "", image_url: "" });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCaptcha = async () => {
    try {
      const data = await getCaptcha();
      setCaptcha({
        key: data.key,
        image_url: data.image_url.replace("/backend", ""),
      });
    } catch (err) {
      console.error("獲取驗證碼失敗", err);
    }
  };

  useEffect(() => {
    localStorage.removeItem("access_token");
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
      const res = await loginAPI.login(data.email, data.password, captcha.key, data.captcha_value);
      setModalProps({ type: ModalTypes.SUCCESS, message: res.message || "登入成功！" });
      setIsShow(true);
      router.push("/");
    } catch (err: any) {
      setModalProps({ type: ModalTypes.ERROR, message: err.message || "登入失敗" });
      setIsShow(true);
      fetchCaptcha();
    } finally {
      setIsLoading(false);
    }
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

          <EmailPasswordFields
            register={register}
            errors={errors}
          />
          
          <CaptchaSection
            register={register}
            errors={errors}
            captcha={captcha}
            fetchCaptcha={fetchCaptcha}
            disabled={isLoading}
          />
          
          <LoginActions loading={isLoading} />
          <GoogleLoginButton />
        </Paper>
      </Fade>
    </div>
  );
}