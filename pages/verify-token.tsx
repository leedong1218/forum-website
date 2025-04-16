import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserAPI from "@/services/User/UserAPI";
import { useMessageModal } from "@/lib/context/MessageModalContext";
import { ModalTypes } from "@/lib/types/modalType";

import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Fade,
  styled,
  Button,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: theme.spacing(2),
  background: `linear-gradient(to bottom right, ${theme.palette.grey[100]}, ${theme.palette.grey[200]})`,
}));

const MessageBox = styled(Paper)(({ theme }) => ({
  maxWidth: 520,
  width: "100%",
  padding: theme.spacing(5),
  borderRadius: 16,
  textAlign: "center",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
}));

export default function VerifyTokenPage() {
  const router = useRouter();
  const token = router.query.token as string;
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const { setModalProps, setIsShow } = useMessageModal();

  const [hasCalled, setHasCalled] = useState(false);

  useEffect(() => {
    if (hasCalled || !token || typeof token !== "string" || token.trim() === "") return;
  
    setHasCalled(true);
    UserAPI.verifyToken(token)
      .then((res) => {
        setStatus("success");
        setMessage(res.message || "信箱驗證成功！");
      })
      .catch((err) => {
        const msg = err?.message || "驗證失敗";
        setStatus("error");
        setMessage(msg);
        setModalProps({ type: ModalTypes.ERROR, message: msg });
        setIsShow(true);
      });
  }, [token]);
  
  

  return (
    <Container>
      <Fade in timeout={600}>
        <MessageBox>
          {status === "loading" ? (
            <>
              <CircularProgress />
              <Typography mt={3}>驗證中，請稍候…</Typography>
            </>
          ) : (
            <>
              {status === "success" ? (
                <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
              ) : (
                <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
              )}
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {status === "success" ? "驗證成功" : "驗證失敗"}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {message}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={() => router.push("/login")}
              >
                前往登入頁
              </Button>
            </>
          )}
        </MessageBox>
      </Fade>
    </Container>
  );
}
