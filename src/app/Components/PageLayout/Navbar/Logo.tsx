"use client";

import { Box } from "@mui/material";
import { OsherLogo } from "../../../Utils/Images";
import { useRouter } from "next/navigation";
import { allRoutes } from "../../../Routes/AllRoutes";

const Logo = ({
  isVisible = true,
  forSidebar,
  onClick,
}: {
  isVisible?: boolean;
  forSidebar?: boolean;
  onClick?: () => void;
}) => {
  const router = useRouter();

  return (
    <Box
      component='img'
      src={OsherLogo.src}
      alt='Osher Logo'
      sx={{
        cursor: "pointer",
        display: isVisible ? "inline-block" : { sm: "none" },
        height: forSidebar ? "60px" : { xs: "30px", sm: "45px" },
        width: forSidebar ? "100%" : "auto",
        objectFit: "contain",
      }}
      onClick={() => {
        router.push(allRoutes.HOME);
        if (onClick) onClick();
      }}
    />
  );
};

export default Logo;
