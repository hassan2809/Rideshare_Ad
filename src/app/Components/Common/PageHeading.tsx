import { Typography, TypographyVariant } from "@mui/material";
import * as React from "react";

const PageHeading = ({
  variant = "h1",
  mb = 42,
  animationDelay = 0,
  mt,
  children,
}: {
  variant?: TypographyVariant;
  mb?: number | string;
  animationDelay?: number;
  mt?: number | string;
  children: React.ReactNode;
}) => {
  const isSmallHeading = ["h3", "h4", "h5", "h6", "p"].includes(variant);

  return (
    <Typography
      className='pop-out-animation'
      variant={variant}
      textAlign='center'
      lineHeight={1}
      sx={{
        animationDelay: `${animationDelay}s`,
        mt,
        mb,
        fontWeight: 900,
        textShadow: `1px 1px 1px #fff, -1px 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff,  ${
          isSmallHeading ? 2 : 3
        }px ${isSmallHeading ? 2 : 3}px 0 black`,
      }}
    >
      {children}
    </Typography>
  );
};

export default PageHeading;
