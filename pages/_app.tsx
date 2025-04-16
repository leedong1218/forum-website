// pages/_app.tsx
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadingProvider } from "@/lib/context/LoadingContext";
import { MessageModalProvider, useMessageModal } from "@/lib/context/MessageModalContext";
import { setAuthErrorHandler } from "@/lib/utils/authErrorHandler";
import { ModalTypes } from "@/lib/types/modalType";
import "@/styles/main.scss";
import type { AppProps } from "next/app";

function AppContent({ Component, pageProps }: AppProps) {
  const { setModalProps, setIsShow } = useMessageModal();

  useEffect(() => {
    setAuthErrorHandler(
      // 錯誤處理（會跳轉）
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
      // 警告處理（只顯示）
      (msg: string) => {
        setModalProps({
          type: ModalTypes.ERROR,
          message: msg,
        });
        setIsShow(true);
      }
    );
  }, []);

  return <Component {...pageProps} />;
}

export default function App(appProps: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <LoadingProvider>
        <MessageModalProvider>
          <AppContent {...appProps} />
        </MessageModalProvider>
      </LoadingProvider>
    </GoogleOAuthProvider>
  );
}
