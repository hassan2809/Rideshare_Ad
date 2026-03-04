"use client";

import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";
import { store } from "../Redux/store";
import createAppTheme from "../theme";
import PageLayoutWrapper from "../Components/PageLayout/PageLayoutWrapper";
import "react-toastify/dist/ReactToastify.css";
import "../globals.css";
import { I18nInitializer } from "./i18Initializer";
import ProfileInitializer from "./ProfileInitializer";

const theme = createAppTheme();

export default function RootProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <I18nInitializer>
          <PageLayoutWrapper>{children}</PageLayoutWrapper>
          <ProfileInitializer />
          <ToastContainer hideProgressBar autoClose={2500} />
        </I18nInitializer>
      </Provider>
    </ThemeProvider>
  );
}
