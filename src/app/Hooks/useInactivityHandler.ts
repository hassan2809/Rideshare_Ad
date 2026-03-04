import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { allRoutes } from "../Routes/AllRoutes";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const useInactivityHandler = (
  timeoutMinutes = 10,
  redirectPath = allRoutes.HOME
) => {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        toast.warn(t("Screen was idle for more than ") + 10 + t(" minutes"));
        router.push(redirectPath);
      }, timeoutMinutes * 60 * 1000);
    };

    const events = ["mousemove", "keydown", "click"];

    events.forEach((event) =>
      document.addEventListener(event, resetInactivityTimer)
    );

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) =>
        document.removeEventListener(event, resetInactivityTimer)
      );
    };
  }, [router, timeoutMinutes, redirectPath]);
};

export default useInactivityHandler;
