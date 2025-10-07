import { Provider } from "@/context/Provider";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeroUIProvider>
        <Provider>
          <Component {...pageProps} />
          <ToastContainer />
        </Provider>
      </HeroUIProvider>
    </>
  );
}
