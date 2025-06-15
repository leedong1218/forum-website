// pages/_app.tsx
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadingProvider } from "@/lib/context/LoadingContext";
import { MessageModalProvider, useMessageModal } from "@/lib/context/MessageModalContext";
import { NotificationProvider } from "@/lib/context/NotificationContext";
import { setAuthErrorHandler } from "@/lib/utils/authErrorHandler";
import { ModalTypes } from "@/lib/types/modalType";
import "@/styles/main.scss";
import type { AppProps } from "next/app";

// ✅ 加入 toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppContent({ Component, pageProps }: AppProps) {
  const { setModalProps, setIsShow } = useMessageModal();

  useEffect(() => {
    setAuthErrorHandler(
      (msg: string) => {
        setModalProps({
          type: ModalTypes.WARNING,
          message: msg,
          handleClick: () => {
            window.location.href = '/login';
          }
        });
        setIsShow(true);
      },
      (msg: string) => {
        setModalProps({
          type: ModalTypes.ERROR,
          message: msg,
        });
        setIsShow(true);
      }
    );
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
}

export default function App(appProps: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <LoadingProvider>
        <MessageModalProvider>
          <NotificationProvider>
            <AppContent {...appProps} />
          </NotificationProvider>
        </MessageModalProvider>
      </LoadingProvider>
    </GoogleOAuthProvider>
  );
}
