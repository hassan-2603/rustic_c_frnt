import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  variant?: 'large' | 'dropdown';
}

const LANGUAGES_DATA: { value: Language; label: string; code: string }[] = [
  { value: 'English', label: 'English', code: 'EN' },
  { value: 'Russian', label: 'Русский', code: 'RU' },
  { value: 'German', label: 'Deutsch', code: 'DE' },
  { value: 'Spanish', label: 'Español', code: 'ES' },
  { value: 'Kazakh', label: 'Қазақша', code: 'KK' },
  { value: 'Hebrew', label: 'עברית', code: 'HE' },
  { value: 'Japanese', label: '日本語', code: 'JA' },
  { value: 'Korean', label: '한국어', code: 'KO' },
];

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  variant = 'large',
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'large') {
    return (
      <div className="w-full max-w-2xl mx-auto" id="language-selector-large">
        <label className="block text-center font-serif text-sm italic text-soft-gray mb-4 tracking-wide uppercase">
          Select Your Language / Выберите Язык
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LANGUAGES_DATA.map((lang) => {
            const isSelected = currentLanguage === lang.value;
            return (
              <button
                key={lang.value}
                onClick={() => onLanguageChange(lang.value)}
                className={`py-3.5 px-4 rounded-xl border text-sm font-medium tracking-wide transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? 'border-olive bg-olive/5 text-olive font-semibold shadow-sm'
                    : 'border-light-gray bg-white text-charcoal hover:border-gold hover:bg-cream/40'
                }`}
                id={`lang-select-${lang.value}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`text-[10px] tracking-widest font-bold opacity-60 px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-olive/10 text-olive' : 'bg-cream text-soft-gray'}`}>
                    {lang.code}
                  </span>
                  <span>{lang.label}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-olive flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Dropdown style for Menu Header
  return (
    <div className="relative" ref={dropdownRef} id="language-selector-dropdown-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-light-gray hover:border-gold hover:bg-cream/40 transition-all duration-300 text-charcoal cursor-pointer"
        id="language-dropdown-trigger"
      >
        <Globe className="w-4 h-4 text-olive" />
        <span className="text-xs font-semibold tracking-wider uppercase">
          {LANGUAGES_DATA.find((l) => l.value === currentLanguage)?.code || 'EN'}
        </span>
        <ChevronDown className={`w-3 h-3 text-soft-gray transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border border-light-gray shadow-xl rounded-xl py-1.5 z-50 origin-top-right transition-all duration-300"
          id="language-dropdown-menu"
        >
          {LANGUAGES_DATA.map((lang) => {
            const isSelected = currentLanguage === lang.value;
            return (
              <button
                key={lang.value}
                onClick={() => {
                  onLanguageChange(lang.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-olive/5 text-olive font-semibold'
                    : 'text-charcoal hover:bg-cream/50 hover:text-olive'
                }`}
                id={`lang-dropdown-option-${lang.value}`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-[9px] font-bold tracking-tight text-soft-gray opacity-80 w-5">
                    {lang.code}
                  </span>
                  {lang.label}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-olive" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
