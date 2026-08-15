export type TableAreaConfig = {
  key: string;
  label: string;
  count: number;
};

export const DEFAULT_TABLE_AREAS: TableAreaConfig[] = [
  { key: "deck-area", label: "Deck Area", count: 15 },
  { key: "dine-in-area", label: "Dine in area", count: 20 },
  { key: "courtyard-area", label: "Courtyard area", count: 15 },
  { key: "chillout-area", label: "Chillout area", count: 10 },
];

export function buildTableKey(area: string, tableNumber: number | string) {
  const normalizedArea = String(area || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${normalizedArea || "table"}-${String(tableNumber)}`;
}

export function getAreaLabel(area?: string | null) {
  const match = DEFAULT_TABLE_AREAS.find((item) => item.key === area);
  return match?.label || area || "Unassigned Area";
}

export function getTableDisplayName(table: any) {
  if (!table) return "";

  if (table.displayName) return table.displayName;

  const areaLabel = table.areaLabel || getAreaLabel(table.area);
  const tableNumber = table.tableNumber;
  const reference = table.tableKey || table.id || table.tableReference || table.reference;

  if (typeof reference === "string" && reference.includes("-") && !tableNumber && !table.area) {
    return reference;
  }

  if (areaLabel && tableNumber) {
    return `${areaLabel} - Table ${tableNumber}`;
  }

  if (tableNumber) {
    return `Table ${tableNumber}`;
  }

  return "";
}

export function getTableReference(table: any) {
  if (!table) return "";

  return table.tableKey || table.id || buildTableKey(table.area || table.areaLabel || "", table.tableNumber ?? "");
}

export function normalizeTableReference(reference?: string | number | null) {
  if (reference === null || reference === undefined || reference === "") return "";
  return String(reference)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function resolveTableFromReference(tables: any[], reference?: string | number | null) {
  if (!reference) return null;

  const normalizedReference = normalizeTableReference(reference);

  if (!normalizedReference || /^\d+$/.test(normalizedReference)) {
    return null;
  }

  return (
    tables.find((table) => {
      const tableKey = normalizeTableReference(table.tableKey || table.id);
      const displayName = normalizeTableReference(getTableDisplayName(table));
      const areaKey = normalizeTableReference(table.area);
      const areaLabel = normalizeTableReference(table.areaLabel || getAreaLabel(table.area));
      const tableNumber = normalizeTableReference(table.tableNumber);
      const areaTableRef = normalizeTableReference(`${table.area || table.areaLabel || ""}-${table.tableNumber || ""}`);
      const labelledRef = normalizeTableReference(`${areaLabel || areaKey || ""}-${tableNumber}`);

      return (
        tableKey === normalizedReference ||
        displayName === normalizedReference ||
        areaKey === normalizedReference ||
        areaTableRef === normalizedReference ||
        labelledRef === normalizedReference ||
        normalizeTableReference(`${table.area || ""}-${table.tableNumber || ""}`) === normalizedReference
      );
    }) || null
  );
}
