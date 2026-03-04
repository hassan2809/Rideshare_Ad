"use client";

import { Box, Typography } from "@mui/material";
import { borderRadius } from "../../Utils/spacings";
import colors from "../../Utils/colors";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const HomeCard = ({
  animationDelay,
  href,
  text,
  disabled,
  isGameCard,
}: {
  href?: string;
  text: string;
  animationDelay?: number;
  disabled?: boolean;
  isGameCard?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <Link href={href || ""} prefetch>
      <Box
        className='pop-out-animation'
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: { xs: 200, sm: isGameCard ? 200 : 270 },
          // minHeight: { xs: 200, sm: isGameCard ? 230 : 350 },
          boxShadow: `5px 5px 15px 0 ${colors.primary}70`,
          width: "100%",
          minWidth: "100%",
          padding: 35,
          borderRadius: borderRadius.xl,
          transition: "all ease 0.2s",
          animationDelay: `${animationDelay}s`,
          bgcolor: "primary.main",

          ...(disabled
            ? {
                cursor: "not-allowed",
                opacity: `0.75 !important`,
              }
            : {
                cursor: "pointer",
                "&:hover": {
                  boxShadow: `5px 30px 30px 0 ${colors.primary}80`,
                },
              }),
        }}
      >
        {isGameCard && <div className='ribbon'>{t("$25 Prize")}</div>}
        <Typography
          variant='h2'
          fontWeight={900}
          textAlign='center'
          fontSize={isGameCard ? { sm: 24, xs: 20 } : { sm: 34, xs: 30 }}
          lineHeight={1}
          color='white'
          sx={{
            textShadow: `1px 1px 1px #000, -1px 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000`,
          }}
        >
          {t(text)}
        </Typography>
        {disabled && (
          <Typography
            textAlign='center'
            lineHeight={1}
            color='white'
            position='absolute'
            bottom={20}
            sx={{
              textShadow: `1px 1px 1px #000, -1px 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000`,
            }}
          >
            {t("Coming Soon...")}
          </Typography>
        )}
      </Box>
    </Link>
  );
};

export default HomeCard;
