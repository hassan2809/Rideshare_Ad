"use client";

import { Box } from "@mui/material";
import VolumeButtons from "./VolumeButtons";
import LanguageSelector from "./LanguageSelector";
import { DarkModeOutlined, ArrowBackOutlined } from "@mui/icons-material";
import CustomButton from "../../Common/CustomButton";
import { useTranslation } from "react-i18next";
import BrightnessButtons from "./BrightnessButtons";
import { useRouter } from "next/navigation";

const NavMenu = ({
  backButtonPath,
  hideBackButton,
  onNap,
}: {
  backButtonPath?: string;
  hideBackButton?: boolean;
  onNap: () => void;
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleBack = () => {
    // if (backButtonPath) {
    //   router.push(backButtonPath);
    // } else if (navigationType === "POP") {
    //   // No meaningful history (i.e., direct visit or refresh)
    //   router.push(allRoutes.HOME);
    // } else {
    //   // Go back in app navigation history
    //   router.push(-1);
    // }
    if (backButtonPath) {
      router.push(backButtonPath);
    } else {
      router.back();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 3, sm: 18 },
        width: { xs: "120px !important", sm: "auto !important" },
        flexWrap: { xs: "wrap", sm: "auto" },
        justifyContent: "flex-end",

        "& button": {
          p: 2,
          minWidth: { xs: 35, sm: 46 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 0, sm: 4 },
          fontSize: { sm: 10, xs: 0 },
          fontWeight: 500,
          color: "text.primary",
        },
        "& svg": {
          width: { xs: 20, sm: 28 },
          height: { xs: 20, sm: 28 },
        },
      }}
    >
      {!hideBackButton && (
        <CustomButton variant='text' onClick={handleBack}>
          <ArrowBackOutlined />
          {t("Back")}
        </CustomButton>
      )}
      <LanguageSelector />
      <BrightnessButtons />
      <VolumeButtons />
      <CustomButton variant='text' onClick={onNap}>
        <DarkModeOutlined />
        {t("Nap")}
      </CustomButton>
    </Box>
  );
};

export default NavMenu;
