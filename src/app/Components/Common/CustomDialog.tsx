import { Dialog, DialogContent, IconButton } from "@mui/material";
import { ReactNode } from "react";
import { borderRadius } from "../../Utils/spacings";
import { Close } from "@mui/icons-material";

interface CustomDialogProps {
  open: boolean;
  onClose?: () => void;
  maxWidth?: number | string;
  contentStyle?: any;
  children?: ReactNode;
  iconColor?: string;
  scrollType?: "body" | "paper";
}

const CustomDialog = ({
  open,
  onClose,
  children,
  maxWidth = 440,
  contentStyle,
  iconColor = "black",
  scrollType,
  ...rest
}: CustomDialogProps) => {
  return (
    <Dialog
      open={open}
      scroll={scrollType}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: borderRadius.xl, maxWidth, width: "100%" },
      }}
      sx={{ zIndex: 1200 }}
      {...rest}
    >
      <DialogContent
        style={{
          width: "100%",
          position: "relative",
          padding: 32,
          ...contentStyle,
        }}
      >
        {!!onClose && (
          <IconButton
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              bgColor: "white",
              zIndex: 1000,
              color: iconColor,
            }}
            onClick={onClose}
          >
            <Close />
          </IconButton>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
