// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translationEN } from "../Translations/en";
import { translationFR } from "../Translations/fr";

export const languageKey = "osherLanguage";

export const languages = {
  ENGLISH: "en",
  FRENCH: "fr",
};

// Safe default init — don't use localStorage here
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    fr: { translation: translationFR },
  },
  fallbackLng: "en",
  lng: "en", // Default language; will be overridden on client
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false, // if you’re not using suspense
  },
});

export default i18n;
