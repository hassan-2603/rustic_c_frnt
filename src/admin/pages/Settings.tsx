import { Settings as SettingsIcon, Globe } from "lucide-react";
import { translateEntireMenu } from "../services/translateMenu";

export default function Settings() {
  async function handleTranslate() {
    const ok = confirm(
      "This will translate your menu into all supported languages.\n\nContinue?"
    );

    if (!ok) return;

    try {
      await translateEntireMenu();

      alert("✅ Menu translated successfully.");
    } catch (err) {
      console.error(err);
      alert("❌ Translation failed. Check console.");
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon size={28} />
          <div>
            <h1 className="text-2xl font-bold">
              Restaurant Settings
            </h1>

            <p className="text-gray-500">
              Manage restaurant tools and utilities.
            </p>
          </div>
        </div>

        <div className="border rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Globe size={20} />
              Translate Entire Menu
            </h2>

            <p className="text-gray-500 mt-2">
              Automatically translate every menu item's
              name and description into Russian, German,
              Spanish, Kazakh, Hebrew, Japanese and Korean.
            </p>
          </div>

          <button
            onClick={handleTranslate}
            className="bg-olive text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90"
          >
            🌍 Translate Menu
          </button>
        </div>
      </div>
    </div>
  );
}