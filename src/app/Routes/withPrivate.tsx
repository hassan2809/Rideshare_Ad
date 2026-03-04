"use client";

import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getLoggedInUser } from "../Services/userService";
import { allRoutes } from "./AllRoutes";
import { PrivateAccessRoles } from "../Utils/types";

export default function withPrivate<P extends object>(
  Component: React.ComponentType<P>,
  accessTo?: PrivateAccessRoles[]
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const user = getLoggedInUser();

    useEffect(() => {
      if (!user) {
        router.push(allRoutes.LOGIN);
        return;
      }

      if (accessTo && !accessTo.includes(user?.role)) {
        notFound();
      }
    }, [user]);

    if (!user || (accessTo && !accessTo.includes(user?.role))) {
      return null; // Prevent flashing the page before redirect
    }

    return <Component {...props} />;
  };
}
