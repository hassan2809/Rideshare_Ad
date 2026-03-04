"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getLoggedInUser } from "../Services/userService";
import { allRoutes } from "./AllRoutes";

export default function withPublic<P extends object>(
  Component: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const user = getLoggedInUser();

    useEffect(() => {
      if (user) {
        router.push(allRoutes.DASHBOARD);
        return;
      }
    }, [user]);

    if (user) {
      return null; // Prevent flashing the page before redirect
    }

    return <Component {...props} />;
  };
}
