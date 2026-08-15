import { menuItems } from "../data/menudata";
import { requestAdminJson } from "../admin/services/adminApi";

export async function uploadMenu() {
  console.log("Uploading menu...");

  for (const item of menuItems) {
    await requestAdminJson("/menu", { method: "POST", body: JSON.stringify(item) });
    console.log(item.name);
  }

  console.log("DONE");
}