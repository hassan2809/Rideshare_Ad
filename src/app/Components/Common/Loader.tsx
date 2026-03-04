import { Backdrop, CircularProgress } from "@mui/material";

interface LoaderProps {
  open?: boolean;
  handleClose?: any;
}

const Loader = ({ open = false, handleClose }: LoaderProps) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress
        color='primary'
        size={40}
        sx={{ width: 40, height: 40 }}
      />
    </Backdrop>
  );
};

export default Loader;
