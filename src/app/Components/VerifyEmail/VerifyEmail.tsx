import { useEffect, useState } from "react";
import { allRoutes } from "../../Routes/AllRoutes";
import { Box, Typography } from "@mui/material";
import { navbarHeight } from "../../Utils/spacings";
import CustomButton from "../Common/CustomButton";
import { EmailVerifiedImage } from "../../Utils/Images";
import { toast } from "react-toastify";
import { resendVerifyEmail, verifyEmail } from "../../Services/userService";
import Loader from "../Common/Loader";

import { useParams, useRouter } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();
  const { token, userId }: { token: string; userId: string } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (token || userId) {
      handleVerifyEmail();
    } else {
      router.push(allRoutes.HOME);
    }

    // if (!isFirstRender.current) {
    // 	if (token || userId) {
    // 		handleVerifyEmail();
    // 	} else {
    // 		router.push(allRoutes.HOME);
    // 	}
    // } else {
    // 	isFirstRender.current = false; // set to false after the initial render
    // }
  }, [token, userId]);

  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      const { data }: any = await verifyEmail(userId ?? "", token ?? "");

      if (
        data.message?.message === "Invalid link" ||
        data.message?.message?.includes("Error")
      ) {
        toast.error("Invalid or expired link!");
        setError(true);
      } else {
        toast.success("Email verified successfully!");
      }
    } catch (error: any) {
      toast.error(error);
      setError(true);
    }
    setLoading(false);
  };

  const handleLoginClick = () => router.push(allRoutes.HOME);

  const handleResentVerification = async () => {
    setLoading(true);
    try {
      const res = await resendVerifyEmail(userId ?? "");
      if (res.success) {
        toast.success("Verification link resent on your email!");
      }
    } catch (error: any) {
      toast.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Loader open={loading} />
      <Box
        sx={{
          width: { xs: "100%", sm: 400 },
          mx: "auto",
          height: `calc(100vh - ${navbarHeight}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 24,
          p: 32,
        }}
      >
        <img
          src={EmailVerifiedImage.src}
          alt=''
          style={{ maxWidth: 250, marginBottom: 32 }}
        />
        <Typography variant='h2' textAlign='center'>
          {loading
            ? "Verifying your email address!"
            : error
            ? "Invalid or exired link!"
            : "Great! Your email has been verified!"}
        </Typography>

        {!error && (
          <Typography textAlign='center'>{"You're all set to go!"}</Typography>
        )}
        <CustomButton
          fullWidth
          onClick={error ? handleResentVerification : handleLoginClick}
        >
          {error ? "Resend" : "Login"}
        </CustomButton>
      </Box>
    </>
  );
};

export default VerifyEmail;
