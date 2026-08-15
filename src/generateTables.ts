import { DEFAULT_TABLE_AREAS } from "./utils/tableUtils";
import { requestAdminJson } from "./admin/services/adminApi";

export async function generateTables() {
  console.log("Starting table generation...");

  try {
    for (const area of DEFAULT_TABLE_AREAS) {
      for (let i = 1; i <= area.count; i++) {
        const tableKey = `${area.key}-${i}`;
        console.log("Creating table", tableKey);

        await requestAdminJson("/tables", {
          method: "POST",
          body: JSON.stringify({
            area: area.key,
            areaLabel: area.label,
            tableNumber: i,
          }),
        });
      }
    }

    console.log("✅ Default restaurant tables created successfully!");
  } catch (error) {
    console.error("Generation error:", error);
  }
}