import type { Offer } from "../types";

const API_BASE = "/api/customer";

async function requestJson(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    throw new Error(`Invalid JSON response from ${path}`);
  }

  if (!response.ok) {
    const errorMessage = data?.error || data?.message || response.statusText || "Request failed";
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  return data;
}

export async function getTables() {
  const result = await requestJson(`${API_BASE}/tables`, { method: "GET" });
  return result.data || [];
}

export async function getMenuItems() {
  const result = await requestJson(`/api/menu`, { method: "GET" });
  const items = Array.isArray(result) ? result : result.data || [];
  if (items && items.length > 0) {
    try {
      localStorage.setItem("restaurant_menu", JSON.stringify(items));
    } catch (err) {
      console.warn("localStorage setItem failed:", err);
    }
  }
  return items;
}

export async function getCategories() {
  const result = await requestJson(`/api/categories`, { method: "GET" });
  return Array.isArray(result) ? result : result.data || [];
}

export async function getSession(sessionId, tableReference) {
  const query = new URLSearchParams({ sessionId, tableReference });
  const result = await requestJson(`${API_BASE}/session?${query.toString()}`, { method: "GET" });
  return result.data;
}

export async function getOrders(sessionId) {
  const query = new URLSearchParams({ sessionId });
  const result = await requestJson(`${API_BASE}/orders?${query.toString()}`, { method: "GET" });
  return result.data || [];
}

export async function getOrderStatus(orderId) {
  const query = new URLSearchParams({ orderId });
  const result = await requestJson(`${API_BASE}/order-status?${query.toString()}`, { method: "GET" });
  return result.data;
}

export async function getOffers(): Promise<Offer[]> {
  const result = await requestJson("/api/offers", { method: "GET" });
  return result || [];
}

export function listenToMenuItems(
  callback: (items: any[]) => void,
  pollIntervalMs = 5000
) {
  let active = true;
  let timer: number | undefined;

  async function refresh() {
    if (!active) return;
    try {
      const items = await getMenuItems();
      callback(items);
    } catch (err) {
      console.error("Failed to fetch customer menu items:", err);
    } finally {
      if (active) {
        timer = window.setTimeout(refresh, pollIntervalMs);
      }
    }
  }

  refresh();

  return () => {
    active = false;
    if (timer !== undefined) {
      clearTimeout(timer);
    }
  };
}

/** Continuously polls the tables list so the customer app detects admin-freed tables in real-time. */
export function listenToTables(
  callback: (tables: any[]) => void,
  pollIntervalMs = 4000
) {
  let active = true;
  let timer: number | undefined;

  async function refresh() {
    if (!active) return;
    try {
      const tables = await getTables();
      callback(tables);
    } catch (err) {
      console.error("Failed to fetch tables:", err);
    } finally {
      if (active) {
        timer = window.setTimeout(refresh, pollIntervalMs);
      }
    }
  }

  refresh();

  return () => {
    active = false;
    if (timer !== undefined) {
      clearTimeout(timer);
    }
  };
}

export function listenToCategories(
  callback: (categories: any[]) => void,
  pollIntervalMs = 2000
) {
  let active = true;
  let timer: number | undefined;

  async function refresh() {
    if (!active) return;
    try {
      const categories = await getCategories();
      callback(categories);
    } catch (err) {
      console.error("Failed to fetch customer categories:", err);
    } finally {
      if (active) {
        timer = window.setTimeout(refresh, pollIntervalMs);
      }
    }
  }

  refresh();

  return () => {
    active = false;
    if (timer !== undefined) {
      clearTimeout(timer);
    }
  };
}

export function listenToOffers(
  callback: (offers: Offer[]) => void,
  pollIntervalMs = 5000
) {
  let active = true;
  let timer: number | undefined;

  async function refresh() {
    if (!active) return;
    try {
      const offers = await getOffers();
      callback(offers);
    } catch (err) {
      console.error("Failed to fetch offers:", err);
    } finally {
      if (active) {
        timer = window.setTimeout(refresh, pollIntervalMs);
      }
    }
  }

  refresh();

  return () => {
    active = false;
    if (timer !== undefined) {
      clearTimeout(timer);
    }
  };
}

export async function createOrder(payload) {
  const result = await requestJson(`${API_BASE}/orders`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result.data;
}

export async function callWaiter(payload) {
  const result = await requestJson(`${API_BASE}/waiter-calls`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result.data;
}

export async function requestBill(orderId) {
  const result = await requestJson(`${API_BASE}/request-bill`, {
    method: "POST",
    body: JSON.stringify({ orderId }),
  });
  return result.data;
}

export function listenToSessionOrders(
  sessionId,
  callback,
  pollIntervalMs = 3000
) {
  let active = true;
  let timer;

  async function refresh() {
    if (!active) return;
    try {
      const orders = await getOrders(sessionId);
      callback(orders);
    } catch (err) {
      console.error("Failed to fetch customer session orders:", err);
    } finally {
      if (active) {
        timer = window.setTimeout(refresh, pollIntervalMs);
      }
    }
  }

  refresh();

  return () => {
    active = false;
    if (timer) {
      clearTimeout(timer);
    }
  };
}
