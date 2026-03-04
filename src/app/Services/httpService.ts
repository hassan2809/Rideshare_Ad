import axios from "axios";
import { logoutUser } from "./userService";
import { toast } from "react-toastify";

const http = axios.create({
  baseURL: `/api`,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Token Expired: ", error);
      logoutUser();
      toast.warn("Token has been expired. Please login again.");
    } else {
      throw (
        error?.response?.data?.message ||
        error?.response?.data ||
        "Something went wrong!"
      );
    }
  }
);

export default http;

// import { logoutUser } from "./userService";
// import { toast } from "react-toastify";

// const BASE_URL = "/api"; // same as axios baseURL

// const handleResponse = async (response: Response) => {
//   if (!response.ok) {
//     if (response.status === 401) {
//       logoutUser();
//       toast.warn("Token has been expired. Please login again.");
//       throw new Error("Unauthorized");
//     }

//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || errorData || "Something went wrong!");
//   }

//   // Attempt to parse JSON response
//   try {
//     return await response.json();
//   } catch {
//     return null;
//   }
// };

// const request = async (
//   method: string,
//   url: string,
//   data?: any,
//   options: RequestInit = {}
// ) => {
//   const config: RequestInit = {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...(options.headers || {}),
//     },
//     ...options,
//   };

//   if (data && !(data instanceof FormData)) {
//     config.body = JSON.stringify(data);
//   } else if (data instanceof FormData) {
//     delete (config.headers as any)["Content-Type"]; // Let browser set it
//     config.body = data;
//   }

//   const response = await fetch(`${BASE_URL}${url}`, config);
//   return handleResponse(response);
// };

// const http = {
//   get: (url: string, options?: RequestInit) =>
//     request("GET", url, null, options),
//   post: (url: string, data?: any, options?: RequestInit) =>
//     request("POST", url, data, options),
//   patch: (url: string, data?: any, options?: RequestInit) =>
//     request("PATCH", url, data, options),
//   delete: (url: string, options?: RequestInit) =>
//     request("DELETE", url, null, options),
// };

// export default http;
