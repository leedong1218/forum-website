import { LoadingProvider } from "@/lib/context/LoadingContext";
import { MessageModalProvider } from "@/lib/context/MessageModalContext";
import "@/styles/main.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <MessageModalProvider>
        <Component {...pageProps} />
      </MessageModalProvider>
    </LoadingProvider>
  );
}
