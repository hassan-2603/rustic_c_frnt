/**
 * Uploads a menu image to the local backend (backend/images/uploads/).
 * Returns the public path: /images/uploads/<filename>
 */
import { getStoredAdminToken } from "./adminApi";

export async function uploadMenuImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const token = await getStoredAdminToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    headers["x-admin-token"] = token;
  }

  let url = "/api/admin/upload-image";
  if (token) {
    url += `?adminToken=${encodeURIComponent(token)}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || "Image upload failed");
  }

  const json = await res.json();
  const imageUrl: string = json?.data?.imageUrl ?? json?.imageUrl ?? "";
  if (!imageUrl) throw new Error("Backend did not return an image URL");
  return imageUrl;
}
