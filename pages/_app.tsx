import "@/styles/globals.css";
import "@/styles/progress.css";
// import 'nprogress/nprogress.css';
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Router from 'next/router';
import NProgress from 'nprogress'
import { SidebarContextProvider } from "../contexts/SidebarContext";
import { ThemeContextProvider } from "../contexts/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <SidebarContextProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </SidebarContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};
export default appWithTranslation(App);
