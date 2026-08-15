import { requestAdminJson } from "./adminApi";

export { listenOrders as listenToOrders } from "./orderApi";
export { listenTables as listenToTables } from "./tableApi";
export { listenToWaiterCalls } from "./waiterApi";

export function listenToMenu(callback: (menu: any[]) => void) {
  let active = true;

  const load = async () => {
    try {
      const data = await requestAdminJson("/menu");
      if (active) callback(data);
    } catch (err) {
      console.error("Error loading admin menu:", err);
    }
  };

  load();
  const interval = setInterval(load, 5000);
  return () => {
    active = false;
    clearInterval(interval);
  };
}

export function listenToBills(callback: (bills: any[]) => void) {
  let active = true;

  const load = async () => {
    try {
      const data = await requestAdminJson("/orders");
      if (active) callback(data.filter((order: any) => order.status === "Completed"));
    } catch (err) {
      console.error("Error loading admin bills:", err);
    }
  };

  load();
  const interval = setInterval(load, 5000);
  return () => {
    active = false;
    clearInterval(interval);
  };
}
