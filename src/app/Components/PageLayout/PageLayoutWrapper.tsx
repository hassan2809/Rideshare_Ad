"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import PageLayout from "./PageLayout";
import { allRoutes } from "@/app/Routes/AllRoutes";
import { isDriverLoggedIn, isUserLoggedIn } from "@/app/Services/userService";

interface PageLayoutWrapperProps {
  children: React.ReactNode;
}

// Matches pattern routes like '/spots/view/:id'
const matchPath = (pattern: string, pathname: string): boolean => {
  const patternSegments = pattern.split("/").filter(Boolean);
  const pathSegments = pathname.split("/").filter(Boolean);

  if (patternSegments.length !== pathSegments.length) return false;

  return patternSegments.every((segment, index) => {
    return segment.startsWith(":") || segment === pathSegments[index];
  });
};

const matchesAnyRoute = (routes: string[], pathname: string) =>
  routes.some((route) => matchPath(route, pathname));

const specialSx = {
  routes: [
    allRoutes.HOME,
    allRoutes.LOGIN,
    allRoutes.LOGOUT,
    allRoutes.NOT_FOUND,
    allRoutes.GAMES,
    allRoutes.SUDOKU_GAME,
    allRoutes.TRIVIA_GAME,
  ],
  sx: { p: 0 },
};

const hideSidebarAlways = [
  allRoutes.HOME,
  allRoutes.LOGIN,
  allRoutes.LOGOUT,
  allRoutes.NOT_FOUND,
  allRoutes.EXPLORE_SPOTS,
  allRoutes.GAMES,
  allRoutes.TRIVIA_GAME,
  allRoutes.SUDOKU_GAME,
];

const hideSidebarIfNotLoggedIn = [
  allRoutes.FEED,
  allRoutes.VIEW_AD,
  allRoutes.VIEW_BRAND,
  allRoutes.VIEW_INFLUENCER,
  allRoutes.MY_PROFILE,
  allRoutes.VIEW_POST,
  allRoutes.VIEW_SPOT,
];

const hideBackButtonRoutes = [
  allRoutes.ACCOUNT_SETTINGS,
  allRoutes.ADS,
  allRoutes.BRANDS,
  allRoutes.CATEGORIES,
  allRoutes.DASHBOARD,
  allRoutes.HOME,
  allRoutes.INFLUENCERS,
  allRoutes.POSTS,
  allRoutes.SPOTS,
];

const isKnownRoute = (pathname: string): boolean => {
  const allDefinedRoutes = [...Object.values(allRoutes)];

  return matchesAnyRoute(allDefinedRoutes, pathname);
};

const PageLayoutWrapper: React.FC<PageLayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const isDriver = isDriverLoggedIn();
  const isLoggedIn = isUserLoggedIn() && !isDriver;

  const layoutSx = matchesAnyRoute(specialSx.routes, pathname)
    ? specialSx.sx
    : {};

  const shouldHideSidebar =
    !isKnownRoute(pathname) ||
    matchesAnyRoute(hideSidebarAlways, pathname) ||
    (!isLoggedIn && matchesAnyRoute(hideSidebarIfNotLoggedIn, pathname));

  const shouldHideBackButton = matchesAnyRoute(hideBackButtonRoutes, pathname);

  return (
    <PageLayout
      sx={layoutSx}
      hideSidebar={shouldHideSidebar}
      hideBackButton={shouldHideBackButton}
    >
      {children}
    </PageLayout>
  );
};

export default PageLayoutWrapper;
