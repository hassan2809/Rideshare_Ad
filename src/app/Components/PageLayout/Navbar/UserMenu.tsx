"use client";

import { Box, Typography, IconButton } from "@mui/material";
import CustomAvatar from "../../Common/CustomAvatar";
import CustomMenu from "../../Common/CustomMenu";
import { useRouter } from "next/navigation";
import { allRoutes } from "../../../Routes/AllRoutes";
import { useDispatch } from "react-redux";
import { resetUserState } from "../../../Redux/Slices/userSlice";
import {
  LogoutOutlined,
  SettingsOutlined,
  WidgetsOutlined,
} from "@mui/icons-material";
import {
  isDriverLoggedIn,
  isUserLoggedIn,
  logoutUser,
} from "../../../Services/userService";

const UserMenu = ({ user }: { user: any }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isDriver = isDriverLoggedIn();

  const handleLogout = () => {
    logoutUser();
    dispatch(resetUserState());
    router.push(allRoutes.HOME);
  };

  const menuOptions = [
    {
      text: (
        <Box display='flex' alignItems='center' gap={8}>
          <CustomAvatar src={user.picture} />
          <Box>
            <Typography variant='h6' mb={4}>
              {user.name || "User Name"}
            </Typography>
            <Typography fontSize={12} color='text.secondary'>
              {user.email || "user@example.com"}
            </Typography>
          </Box>
        </Box>
      ),
      onClick: () => router.push(allRoutes.MY_PROFILE),
    },
    { isDivider: true },
    {
      icon: WidgetsOutlined,
      text: "Dashboard",
      onClick: () => router.push(allRoutes.DASHBOARD),
    },
    {
      icon: SettingsOutlined,
      text: "Settings",
      onClick: () => router.push(allRoutes.ACCOUNT_SETTINGS),
    },
    { isDivider: true },
    { icon: LogoutOutlined, text: "Log Out", onClick: handleLogout },
  ];

  const handleAvatarClick = () => {
    if (isDriver) {
      router.push(allRoutes.MY_PROFILE);
    } else {
      router.push(allRoutes.LOGIN);
    }
  };

  return isUserLoggedIn() && !isDriver ? (
    <CustomMenu
      anchorComponent={(props: any) => (
        <Box sx={{ cursor: "pointer" }} {...props}>
          <CustomAvatar src={user.picture} />
        </Box>
      )}
      options={menuOptions}
    />
  ) : (
    <IconButton sx={{ p: 0 }} onClick={handleAvatarClick}>
      <CustomAvatar src={user.picture} />
    </IconButton>
  );
};

export default UserMenu;
