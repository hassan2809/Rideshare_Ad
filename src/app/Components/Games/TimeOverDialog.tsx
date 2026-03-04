import { Box, Button, Typography } from "@mui/material";

import * as React from "react";
import CustomDialog from "../Common/CustomDialog";
import { useTranslation } from "react-i18next";
import { ReplayOutlined } from "@mui/icons-material";

const TimeOverDialog = ({
  open,
  onRestart,
}: {
  open: boolean;
  onRestart?: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <CustomDialog open={open}>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography
          className='pop-out-animation'
          variant='h2'
          textAlign='center'
          mb={12}
        >
          {t("⏰ Time's Up!")}
        </Typography>
        <Typography className='pop-out-animation' mb={24}>
          {t("You failed to answer in time.")}
        </Typography>
        <Button
           className='pop-out-animation'
          variant='contained'
          onClick={onRestart}
          endIcon={<ReplayOutlined />}
        >
          {t("Restart Game")}
        </Button>
      </Box>
    </CustomDialog>
  );
};
export default TimeOverDialog;
