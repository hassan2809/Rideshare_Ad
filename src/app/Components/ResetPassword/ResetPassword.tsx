import { useParams, useRouter } from "next/navigation";
import SetPasswordDialog from "./SetPasswordDialog";
import { useEffect, useState } from "react";
import { allRoutes } from "../../Routes/AllRoutes";
import { Box } from "@mui/material";
import { navbarHeight } from "../../Utils/spacings";

const ResetPassword = () => {
  const router = useRouter();
  const { token, userId }: { token: string; userId: string } = useParams();

  const [setPasswordDialog, setSetPasswordDialog] = useState<boolean>(false);

  useEffect(() => {
    if (token || userId) {
      openSetPasswordDialog();
    } else {
      router.push(allRoutes.HOME);
    }
  }, []);

  const openSetPasswordDialog = () => setSetPasswordDialog(true);
  const closeSetPasswordDialog = () => router.push(allRoutes.HOME);

  return (
    <>
      <Box sx={{ width: "100vw", height: `100vh - ${navbarHeight}` }} />
      <SetPasswordDialog
        token={token}
        userId={userId}
        open={setPasswordDialog}
        onClose={closeSetPasswordDialog}
      />
    </>
  );
};

export default ResetPassword;
