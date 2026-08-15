import { useLanguage } from "../context/LanguageContext";
import { TRANSLATIONS } from "../data/translations";

export function useTranslation() {
  const { language } = useLanguage();

  function t(key: keyof typeof TRANSLATIONS) {
    return (
      TRANSLATIONS[key]?.[language] ??
      TRANSLATIONS[key]?.en ??
      key
    );
  }

  return { t, language };
}