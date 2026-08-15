import { requestAdminJson } from "./adminApi";

const BASE = "/categories";

export async function getCategories() {
  return await requestAdminJson(`${BASE}`);
}

export async function addCategory(category: any) {
  return await requestAdminJson(`${BASE}`, {
    method: "POST",
    body: JSON.stringify(category),
  });
}

export async function updateCategory(id: string, category: any) {
  return await requestAdminJson(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(category),
  });
}

export async function deleteCategory(id: string) {
  return await requestAdminJson(`${BASE}/${id}`, {
    method: "DELETE",
  });
}
