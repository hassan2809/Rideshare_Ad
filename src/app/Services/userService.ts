import { jwtDecode } from "jwt-decode";
import { UserState, saveUserState } from "../Redux/Slices/userSlice";
import { AppDispatch } from "../Redux/store";
import { accessTokenKey, roles } from "../Utils/enums";
import http from "./httpService";
import Cookies from "js-cookie";
import { PrivateAccessRoles } from "../Utils/types";
import { getUserObjectForRedux } from "./profileService";

const apiEndpoint = "/auth";

// =====|  User Service  |=====

const UserService = {
  // login: (userData: any) => http.post(`${apiEndpoint}/login-installer`, userData),
  login: (userData: any) => http.post(`${apiEndpoint}/login`, userData),
  signUp: (userData: any) => http.post(`${apiEndpoint}/signup`, userData),
  verifyEmail: (userId: string, token: string) =>
    http.patch(`${apiEndpoint}/verify-email/${userId}/${token}`),
  resendVerifyEmail: (userId: string) =>
    http.post(`${apiEndpoint}/resend-verification/${userId}`),
  verifyTokenService: (token: string) =>
    http.get(`${apiEndpoint}/decode-referral-link/${token}`, {
      headers: getAuthHeader(),
    }),
};

// =====|  APIs  |=====

export const loginUser =
  (data: { email: string; password: string }) =>
  async (dispatch: AppDispatch): Promise<any> => {
    const { user, token }: any = await UserService.login(data);

    if (user?._id) {
      if (token) setJwtToken(token);

      // setting user data in Redux
      const data = getUserObjectForRedux(user);
      dispatch(saveUserState(data));
    }

    return user;

    // TODO
    // 3- check location errors
    // 4- add translations of spots routes
  };

export const signUpUser =
  (userData: UserState, isSocialLogin?: boolean) =>
  async (dispatch: AppDispatch): Promise<any> => {
    try {
      const data = {
        name: userData.name,
        email: userData.email?.toLowerCase(),
        password: userData.password,
        address: userData.address,
        electricity_usage: userData.bill,
        imageUrl: userData.picture ?? "",
        ...(isSocialLogin
          ? {
              googleId: userData._id,
              isgooglesignup: true,
            }
          : {}),
      };

      const { data: user } = await UserService.signUp(data);

      if (user) {
        if (isSocialLogin) {
          // we're only setting token for google users, because other users have to verify their emails first
          setJwtToken(user?.access_token);
        }

        if (user?.user?.user) {
          const userForRedux = {
            id: user?.user?.user?._id,
            bill: user?.user?.user?.power_usage?.toString(),
            address: user?.user?.user?.address,
            name: user?.user?.user?.name,
            email: user?.user?.user?.email,
            role: user?.user?.user?.role,
            picture: user?.user?.user?.imageUrl || userData.picture || "",
          };
          dispatch(saveUserState(userForRedux));
        }
      }

      return user;
    } catch (error) {
      console.error("signUpUser (API): ", error);
      throw error;
    }
  };

export const verifyEmail = async (
  userId: string,
  token: string
): Promise<any | void> => {
  return UserService.verifyEmail(userId, token);
};

export const resendVerifyEmail = async (
  userId: string
): Promise<any | void> => {
  return UserService.resendVerifyEmail(userId);
};

export const setJwtToken = (token: string) => {
  const decodedToken: any = jwtDecode(token);
  if (decodedToken) {
    Cookies.set(accessTokenKey, token, { expires: 30 });
  }
};

export const getJwtToken = (): string => {
  return Cookies.get(accessTokenKey) ?? "";
};

export const getAuthHeader = () => {
  return { Authorization: `Bearer ${getJwtToken()}` };
};

export const isUserLoggedIn = (): boolean => {
  return !!Cookies.get(accessTokenKey);
};

export const logoutUser = () => {
  Cookies.remove(accessTokenKey);
};

export const getLoggedInUser = (): null | { role: PrivateAccessRoles } => {
  if (!isUserLoggedIn()) return null;

  try {
    const loggedInUser: any = jwtDecode(Cookies.get(accessTokenKey) || "");
    return loggedInUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const isSuperAdminLoggedIn = (): boolean => {
  const loggedInUser: any = getLoggedInUser();
  return loggedInUser?.role === roles.ADMIN || false;
};

export const isBrandLoggedIn = (): boolean => {
  const loggedInUser: any = getLoggedInUser();
  return loggedInUser?.role === roles.BRAND || false;
};

export const isInfluencerLoggedIn = (): boolean => {
  const loggedInUser: any = getLoggedInUser();
  return loggedInUser?.role === roles.INFLUENCER || false;
};

export const isDriverLoggedIn = (): boolean => {
  const loggedInUser: any = getLoggedInUser();
  return loggedInUser?.role === roles.DRIVER || false;
};

export const verifyTokenService = (data: any) => {
  return UserService.verifyTokenService(data);
};
