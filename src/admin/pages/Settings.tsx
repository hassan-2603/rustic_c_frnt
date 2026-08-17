import { useState } from "react";
import { Printer, Settings as SettingsIcon, Globe } from "lucide-react";
import { translateEntireMenu } from "../services/translateMenu";
import {
  DEFAULT_PRINTER_SETTINGS,
  getPrinterSettings,
  savePrinterSettings,
  testPrinter,
  type PrinterSettings,
} from "../services/printerService";

export default function Settings() {
  const [printer, setPrinter] = useState<PrinterSettings>(getPrinterSettings);
  const [message, setMessage] = useState("");

  function updatePrinter<K extends keyof PrinterSettings>(key: K, value: PrinterSettings[K]) {
    setPrinter((current) => ({ ...current, [key]: value }));
    setMessage("");
  }

  function handleSavePrinter() {
    savePrinterSettings(printer);
    setMessage("Printer settings saved on this PC.");
  }

  async function handleTestPrint() {
    try {
      await testPrinter(printer);
      setMessage("Test print sent successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Test print failed.");
    }
  }

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

        <div className="border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Printer size={20} />
            Printer Settings
          </h2>
          <p className="text-gray-500 mt-2">Configure the printer connected to this restaurant PC.</p>

          <div className="grid gap-4 md:grid-cols-2 mt-6">
            <label className="text-sm font-medium">
              Printer name
              <input value={printer.printerName} onChange={(e) => updatePrinter("printerName", e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2" />
            </label>
            <label className="text-sm font-medium">
              Connection type
              <select value={printer.connectionType} onChange={(e) => updatePrinter("connectionType", e.target.value as PrinterSettings["connectionType"])} className="mt-1 w-full border rounded-lg px-3 py-2">
                <option value="network">Network</option>
                <option value="windows">USB/Windows Printer</option>
              </select>
            </label>
            <label className="text-sm font-medium">
              IP address
              <input value={printer.ipAddress} onChange={(e) => updatePrinter("ipAddress", e.target.value)} disabled={printer.connectionType !== "network"} placeholder="192.168.0.10" className="mt-1 w-full border rounded-lg px-3 py-2 disabled:bg-gray-100" />
            </label>
            <label className="text-sm font-medium">
              Port
              <input type="number" min="1" max="65535" value={printer.port} onChange={(e) => updatePrinter("port", Number(e.target.value))} disabled={printer.connectionType !== "network"} className="mt-1 w-full border rounded-lg px-3 py-2 disabled:bg-gray-100" />
            </label>
            <label className="text-sm font-medium">
              Paper width
              <select value={printer.paperWidth} onChange={(e) => updatePrinter("paperWidth", e.target.value as "80mm")} className="mt-1 w-full border rounded-lg px-3 py-2">
                <option value="80mm">80mm</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm font-medium self-end pb-2">
              <input type="checkbox" checked={printer.autoCut} onChange={(e) => updatePrinter("autoCut", e.target.checked)} />
              Auto cut
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button onClick={handleSavePrinter} className="bg-olive text-white px-5 py-2 rounded-xl font-semibold">Save Printer Settings</button>
            <button onClick={handleTestPrint} className="border border-olive text-olive px-5 py-2 rounded-xl font-semibold">Test Print</button>
            {message && <span className="text-sm text-gray-600">{message}</span>}
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