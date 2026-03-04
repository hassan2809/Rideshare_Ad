"use client";

import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Loader from "../Common/Loader";
import { Box, CssBaseline, SxProps, Toolbar } from "@mui/material";
import { navbarHeight, sidebarWidth } from "../../Utils/spacings";
import LayoutSidebar from "./Sidebar/LayoutSidebar";
import { isChrome, isChromiumBased, isOpera } from "@/app/Utils/utils";
import useViewportHeightFix from "@/app/(root)/useViewportHeightFix";

const PageLayout = ({
  children,
  loading,
  hideBackButton,
  backButtonPath,
  hideLayout,
  hideSidebar,
  sx,
}: {
  children?: ReactNode;
  loading?: boolean;
  hideBackButton?: boolean;
  backButtonPath?: string;
  hideLayout?: boolean;
  hideSidebar?: boolean;
  sx?: SxProps;
}) => {
  useViewportHeightFix();

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top when a new page opens
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return !hideLayout ? (
    <Box
      sx={{
        position: "relative",
        ...(isChrome || isOpera || isChromiumBased
          ? // ? { height: "100svh", maxHeight: "100svh" }
            {
              // height: "100lvh",
              // maxHeight: "100lvh",
              // minHeight: "100lvh",
              height: "var(--app-height)",
              maxHeight: "var(--app-height)",
              minHeight: "var(--app-height)",

              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden",
            }
          : {}),

        display: "flex",
        backgroundColor: "#fff",
      }}
    >
      <CssBaseline />
      <Loader open={loading} />
      <Navbar
        handleDrawerToggle={handleDrawerToggle}
        backButtonPath={backButtonPath}
        hideBackButton={hideBackButton}
        hideSidebar={hideSidebar}
      />

      {!hideSidebar && (
        <LayoutSidebar
          open={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: hideSidebar
            ? "100%"
            : { sm: `calc(100% - ${sidebarWidth}px)` },
          p: { xs: 24, sm: "42px 60px" },

          // TODO: LIST
          // 🔥 work on lazy loading, screens taking time to load

          ...(isChrome || isOpera
            ? // ? { height: "100svh", maxHeight: "100svh", overflowY: "auto" }
              {
                // height: "100lvh",
                // maxHeight: "100lvh",
                // minHeight: "100lvh",
                height: "var(--app-height)",
                maxHeight: "var(--app-height)",
                minHeight: "var(--app-height)",
                overflowY: "auto",
              }
            : { minHeight: "100svh" }),
          ...sx,
        }}
      >
        {children}
        <Toolbar
          sx={{
            minHeight: `${navbarHeight}px !important`,
            height: navbarHeight,
          }}
        />
      </Box>
    </Box>
  ) : (
    <>{children}</>
  );
};

export default PageLayout;
