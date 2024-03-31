import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./locale/pt.json"
import en from "./locale/en.json"

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: { ...pt } },
    en: { translation: { ...en } }
  },
  lng: navigator.language || 'en',
})