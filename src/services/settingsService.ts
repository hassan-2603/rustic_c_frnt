import { requestAdminJson } from "../admin/services/adminApi";

export async function getMenuVersion() {
  try {
    const data = await requestAdminJson("/settings/menu-version");
    return (data && data.menuVersion) || 1;
  } catch (error) {
    console.error("Failed to fetch menu version:", error);
    return 1;
  }
}

export async function increaseMenuVersion() {
  try {
    await requestAdminJson("/settings/menu-version", { method: "PUT" });
  } catch (error) {
    console.error("Failed to increase menu version:", error);
    throw error;
  }
}