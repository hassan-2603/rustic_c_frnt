import { requestAdminJson } from "../admin/services/adminApi";

export async function getMenuItems() {
  try {
    const data = await requestAdminJson("/menu");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
}

export async function deleteMenuItem(id: string) {
  if (!id) return;
  try {
    await requestAdminJson(`/menu/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
}