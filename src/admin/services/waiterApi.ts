import { requestAdminJson } from "./adminApi";

const BASE = "/waiters";
const CALLS_BASE = "/waiter-calls";

export const listenWaiterCalls = listenToWaiterCalls;

export function listenToWaiterCalls(callback: (calls: any[]) => void) {
  let active = true;

  const load = async () => {
    try {
      const data = await requestAdminJson(`${CALLS_BASE}`);
      if (active) callback(data);
    } catch (err) {
      console.error("Error loading waiter calls:", err);
    }
  };

  load();
  const interval = setInterval(load, 5000);

  return () => {
    active = false;
    clearInterval(interval);
  };
}

export async function getWaiters() {
  return await requestAdminJson(`${BASE}`);
}

export async function addWaiter(waiter: any) {
  return await requestAdminJson(`${BASE}`, {
    method: "POST",
    body: JSON.stringify(waiter),
  });
}

export async function updateWaiter(id: string, waiter: any) {
  return await requestAdminJson(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(waiter),
  });
}

export async function deleteWaiter(id: string) {
  return await requestAdminJson(`${BASE}/${id}`, {
    method: "DELETE",
  });
}
