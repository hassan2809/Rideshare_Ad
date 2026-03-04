"use client";

import { useEffect } from "react";
import { getLoggedInUser } from "../Services/userService";
import { useDispatch, useSelector } from "../Redux/reduxHooks";
import { saveUserState, selectUser } from "../Redux/Slices/userSlice";
import { getUserObjectForRedux } from "../Services/profileService";

export default function ProfileInitializer() {
  const user = getLoggedInUser();
  const reduxUser = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && !reduxUser._id) {
      const data = getUserObjectForRedux(user);
      dispatch(saveUserState(data));
    }
  }, [user, reduxUser]);

  return null;
}
