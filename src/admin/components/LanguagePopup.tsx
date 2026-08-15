import React from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (translations: Record<string, { name: string; description: string }>) => void;
  initialTranslations?: Record<string, { name: string; description: string }>;
};

const LANGUAGES = [
  { code: "ru", label: "Russian", placeholder: "Русское название" },
  { code: "de", label: "German", placeholder: "Deutscher Name" },
  { code: "es", label: "Spanish", placeholder: "Nombre en español" },
  { code: "kk", label: "Kazakh", placeholder: "Қазақ атауы" },
  { code: "he", label: "Hebrew", placeholder: "שם בעברית" },
  { code: "ja", label: "Japanese", placeholder: "日本語の名前" },
  { code: "ko", label: "Korean", placeholder: "한국어 이름" },
];

export default function LanguagePopup({
  open,
  onClose,
  onSave,
  initialTranslations = {},
}: Props) {
  // Hooks must always be called — early return AFTER hooks
  const [form, setForm] = React.useState<Record<string, { name: string; description: string }>>({});

  React.useEffect(() => {
    if (!open) return;
    // Initialize form with existing translations every time the popup opens
    const initialized: Record<string, { name: string; description: string }> = {};
    for (const lang of LANGUAGES) {
      initialized[lang.code] = {
        name: initialTranslations[lang.code]?.name || "",
        description: initialTranslations[lang.code]?.description || "",
      };
    }
    setForm(initialized);
  }, [initialTranslations, open]);

  if (!open) return null;

  function handleSave() {
    const translations: Record<string, { name: string; description: string }> = {};
    for (const lang of LANGUAGES) {
      // Include every language that has a name in the current form
      if (form[lang.code]?.name) {
        translations[lang.code] = form[lang.code];
      }
    }
    onSave(translations);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold">Menu Item Translations</h2>
            <p className="text-gray-500 text-sm mt-1">
              Add translations for 7 languages (English is the primary name)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {LANGUAGES.map((lang) => (
            <div key={lang.code} className="border rounded-xl p-4">
              <label className="text-sm font-semibold">{lang.label}</label>
              <input
                type="text"
                value={form[lang.code]?.name || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [lang.code]: {
                      ...form[lang.code],
                      name: e.target.value,
                    },
                  })
                }
                placeholder={lang.placeholder}
                className="w-full mt-2 border rounded-lg p-3 text-sm"
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end gap-3 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-olive hover:bg-olive/90 text-white font-semibold"
          >
            Save Translations
          </button>
        </div>
      </div>
    </div>
  );
}
