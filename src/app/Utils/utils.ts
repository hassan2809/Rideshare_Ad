import * as EmailValidator from "email-validator";
import { States } from "./enums";

export const formatNumber = (value: string | number) => {
  const isDecimalValue =
    parseFloat((value || 0).toString()) !== parseInt((value || 0).toString());
  const numOfDecimals = isDecimalValue ? 2 : 0;

  return parseFloat(
    parseFloat((value || 0).toString()).toFixed(numOfDecimals)
  ).toLocaleString();
};

export const validatePassword = (password: string | undefined) => {
  return password
    ? password?.length < 5
      ? "Password length must be at least 5 characters"
      : // : password?.search(/[A-Z]/) < 0
        // ? "Password requires at least one uppercase letter"
        // : password?.search(/[a-z]/) < 0
        // ? "Password requires at least one lowercase letter"
        // : password?.search(/[0-9]/) < 0
        // ? "Password requires at least one number"
        ""
    : "Password cannot be empty";
  // ? password?.length < 8
  // 	? "Password length must be at least 8 characters"
  // 	: password?.search(/[A-Z]/) < 0
  // 	? "Password requires at least one uppercase letter"
  // 	: password?.search(/[a-z]/) < 0
  // 	? "Password requires at least one lowercase letter"
  // 	: password?.search(/[0-9]/) < 0
  // 	? "Password requires at least one number"
  // 	: ""
  // : "Password cannot be empty";
};

export const validateEmail = (email: string | undefined) => {
  return email
    ? !EmailValidator.validate(email)
      ? "Enter a valid email"
      : ""
    : "Email cannot be empty";
};

export const findStateFromCoords = (lat: number, lng: number) => {
  for (const state of States) {
    if (
      lat >= state.latMin &&
      lat <= state.latMax &&
      lng >= state.lngMin &&
      lng <= state.lngMax
    ) {
      return state.value;
    }
  }
  return "";
};

export const capitalizeText = (text: string) => {
  return text.split("")[0].toUpperCase() + text.slice(1);
};

export const isVideoFromUrl = (url?: string) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov|qt)(\?.*)?$/i.test(url);
};

export const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const formatSeconds = (seconds: number | string) => {
  if (seconds === undefined) return "-";

  seconds = Number(seconds);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins > 0) {
    return `${mins}m${secs}s`;
  }
  return `${secs}s`;
};

// Detect if the browser is Opera or Google Chrome
export const isOpera =
  typeof window !== "undefined" &&
  (!!(window as any)?.opr || navigator.userAgent.indexOf("OPR/") > -1);

export const isChrome =
  typeof window !== "undefined" &&
  /Chrome/.test(navigator.userAgent) &&
  /Google Inc/.test(navigator.vendor) &&
  !isOpera;

declare global {
  interface Window {
    chrome?: any;
  }
}

export const isChromiumBased =
  typeof window !== "undefined" &&
  (!!window.chrome ||
    /Chromium|Chrome|CriOS|Edg|Brave|OPR|SamsungBrowser/i.test(
      navigator.userAgent
    ));
