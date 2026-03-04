"use client";

import { useEffect, useState } from "react";
import i18n, { languageKey } from "./i18n";
import Loader from "../Components/Common/Loader";

export const I18nInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem(languageKey) || "en";
    i18n.changeLanguage(savedLang).then(() => {
      setReady(true);
    });
  }, []);

  if (!ready) return <Loader open />;

  return <>{children}</>;
};
