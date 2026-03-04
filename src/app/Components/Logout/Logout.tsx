"use client";

import { keyframes } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import CustomButton from "../Common/CustomButton";
import { useRouter } from "next/navigation";
import { allRoutes } from "../../Routes/AllRoutes";
import { navbarHeight } from "../../Utils/spacings";
import { logoutUser } from "../../Services/userService";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { resetUserState } from "@/app/Redux/Slices/userSlice";

const fadeUpAnimation = keyframes`
  0% {
    transform: translateY(40px);
    // transform: translateY(120%);
    opacity: 0;
  }
  75% {
    transform: translateY(-5px);
    // transform: translateY(-15%);
    opacity: 1;
  }
  100% {
    transform: translateY(0px);
    // transform: translateY(0%);
    opacity: 1;
  }
`;

const Logout = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  const backToHome = () => router.push(allRoutes.HOME);

  const handleLogout = () => {
    logoutUser();
    dispatch(resetUserState());
    router.push(allRoutes.HOME);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: `calc(100vh - ${navbarHeight}px)`,
          "& h3": {
            marginBottom: 28,
            animation: `0.3s ${fadeUpAnimation} 0.06s ease-out both`,
          },
          "& button": {
            animation: `0.3s ${fadeUpAnimation} 0.11s ease-out both`,
            "&:nth-of-type(2)": {
              animationDelay: "0.17s",
            },
          },
        }}
      >
        <Typography textAlign='center' variant='h3'>
            {t("Are you sure you want to log out?")}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            width: "100%",
            maxWidth: { xs: 250, sm: 400 },
          }}
        >
          <CustomButton onClick={handleLogout}>{t("Yes")}</CustomButton>
          <CustomButton variant='outlined' onClick={backToHome}>
            {t("No")}
          </CustomButton>
        </Box>
      </Box>
    </>
  );
};

export default Logout;
