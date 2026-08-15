import { createContext, useContext, useState } from "react";

type Language =
  | "en"
  | "ru"
  | "de"
  | "es"
  | "kk"
  | "he"
  | "ja"
  | "ko";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");

    return (saved as Language) || "en";
  });

  function changeLanguage(lang: Language) {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}