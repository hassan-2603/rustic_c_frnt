export type PrinterSettings = {
  printerName: string;
  connectionType: "network" | "windows";
  ipAddress: string;
  port: number;
  paperWidth: "80mm";
  autoCut: boolean;
};

export const DEFAULT_PRINTER_SETTINGS: PrinterSettings = {
  printerName: "Rustic Charm Printer",
  connectionType: "network",
  ipAddress: "",
  port: 9100,
  paperWidth: "80mm",
  autoCut: true,
};

const STORAGE_KEY = "rustic_charm_printer_settings";
const CONNECTOR_URL = "http://127.0.0.1:17890";

export function getPrinterSettings(): PrinterSettings {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return { ...DEFAULT_PRINTER_SETTINGS, ...saved };
  } catch {
    return DEFAULT_PRINTER_SETTINGS;
  }
}

export function savePrinterSettings(settings: PrinterSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function toPrintBill(order: any) {
  return {
    orderNumber: order.orderNumber,
    waiterName: order.waiterName,
    date: (order.createdAt?.toDate?.() || new Date()).toLocaleString(),
    items: (order.items || []).map((item: any) => ({
      name: item.name,
      quantity: item.quantity,
      amount: item.price * item.quantity,
    })),
    total: order.total,
    discountAmount: order.discountAmount || 0,
    finalTotal: order.finalTotal,
  };
}

async function connectorRequest(path: string, body: unknown) {
  const response = await fetch(`${CONNECTOR_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Print connector failed");
  return result;
}

export async function testPrinter(settings: PrinterSettings) {
  return connectorRequest("/test-print", { settings });
}

export async function printBillThroughConnector(order: any) {
  return connectorRequest("/print", {
    settings: getPrinterSettings(),
    bill: toPrintBill(order),
  });
}