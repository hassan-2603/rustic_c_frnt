import { requestAdminJson } from "./adminApi";

export async function markPaid(id: string, paymentMethod: string) {
  return await requestAdminJson(`/orders/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      paymentStatus: "Paid",
      paymentMethod,
    }),
  });
}
