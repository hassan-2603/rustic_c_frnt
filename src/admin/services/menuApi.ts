import { requestAdminJson } from "./adminApi";

const BASE = "/menu";

export async function getMenuItems() {
  return await requestAdminJson(`${BASE}`);
}

export async function addMenuItem(item: any) {
  return await requestAdminJson(`${BASE}`, {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export async function updateMenuItem(id: string, item: any) {
  return await requestAdminJson(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(item),
  });
}

export async function deleteMenuItem(id: string) {
  return await requestAdminJson(`${BASE}/${id}`, {
    method: "DELETE",
  });
}
