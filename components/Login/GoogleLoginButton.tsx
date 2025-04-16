// components/Login/GoogleLoginButton.tsx
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useMessageModal } from "@/lib/context/MessageModalContext";
import { ModalTypes } from "@/lib/types/modalType";
import loginAPI from "@/services/Login/loginAPI";
import { Box, Typography, Divider } from "@mui/material";
import styles from "@/styles/pages/Login.module.scss";

export default function GoogleLoginButton() {
  const { setModalProps, setIsShow } = useMessageModal();
  const router = useRouter();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const credential = credentialResponse.credential;
      const res = await loginAPI.googleLogin(credential);

      setModalProps({ type: ModalTypes.SUCCESS, message: "登入成功！" });
      setIsShow(true);
      router.push("/");
    } catch (err: any) {
      setModalProps({ type: ModalTypes.ERROR, message: err.message || "Google 登入失敗" });
      setIsShow(true);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
          或使用其他方式登入
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }} className={styles.googleLoginContainer}>
        <GoogleLogin 
          onSuccess={handleSuccess} 
          onError={() => {
            setModalProps({ type: ModalTypes.ERROR, message: "Google 授權失敗" });
            setIsShow(true);
          }}
          theme="filled_blue"
          shape="rectangular"
          size="large"
          text="signin_with"
          locale="zh_TW"
        />
      </Box>
    </>
  );
}