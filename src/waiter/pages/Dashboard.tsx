
import { useEffect, useState } from "react";

import OrderCard from "../components/OrderCard";

import {
  listenOrders,
  acceptOrder,
  rejectOrder,
  serveOrder,
  endSession,
  updateOrderStatus,
} from "../services/waiterService";

export default function Dashboard() {

  const waiter = JSON.parse(
    sessionStorage.getItem("waiter") || "{}"
  );

  const [orders, setOrders] = useState<any[]>([]);

  const [paymentOrder, setPaymentOrder] = useState<any>(null);

  useEffect(() => {

    const unsubscribe =
      listenOrders(setOrders);

    return unsubscribe;

  }, []);

  async function handleAcceptOrder(order: any) {
  await acceptOrder(order.id, waiter);
}

async function handleRejectOrder(order: any) {
  await rejectOrder(order.id);
}

async function handleReadyOrder(order: any) {
  console.log("READY", order);
}

async function handleServedOrder(order: any) {
  await serveOrder(order.id);
}
const newOrders = orders.filter(
  (o: any) =>
    o.status === "Pending" &&
    !o.waiterId
);

const myOrders = orders.filter(
  (o: any) =>
    o.waiterId === waiter.id &&
    (
      o.status === "Accepted" ||
      o.status === "Preparing" ||
      o.status === "Ready" ||
      o.status === "Served" ||
      o.status === "Bill Requested" ||
      o.status === "Payment Done"
    )
);
function handlePaymentDone(order: any) {
  setPaymentOrder(order);
}
async function completePayment(method: string) {
  if (!paymentOrder) return;

  await updateOrderStatus(
    paymentOrder.id,
    "Payment Done",
    {
      paymentMethod: method,
    }
  );

  setPaymentOrder(null);
}
async function handleEndSession(order: any) {
  await endSession(order);
}

  return (

    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold">

        Welcome {waiter.name}

      </h1>

      <p className="text-gray-500 mb-8">
  Manage your assigned orders
</p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        <div>

<h2 className="text-2xl font-bold mb-5">
New Orders
</h2>

{newOrders.map(order => (
  <OrderCard
    key={order.id}
    order={order}
    buttonText="Accept"
    onAction={handleAcceptOrder}
    onReject={handleRejectOrder}
  />
))}

</div>
<div>

<h2 className="text-2xl font-bold mb-5">
My Orders
</h2>

{myOrders.map((order) => (
  <OrderCard
    key={order.id}
    order={order}
    buttonText={
  order.status === "Accepted"
    ? "Waiting for Kitchen..."
    : order.status === "Preparing"
    ? "Preparing..."
    : order.status === "Ready"
    ? "🍽 Serve Food"
    : order.status === "Served"
    ? "Served"
    : order.status === "Bill Requested"
    ? "💰 Payment Done"
    : order.status === "Payment Done"
    ? "End Session"
    : "Waiting..."
}
   onAction={
  order.status === "Ready"
    ? handleServedOrder
    : order.status === "Bill Requested"
    ? handlePaymentDone
    : order.status === "Payment Done"
    ? handleEndSession
    : undefined
}
  />
))}

</div>

      </div>
      {paymentOrder && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl p-5 sm:p-8 w-full max-w-[420px]">

      <h2 className="text-2xl font-bold mb-6">
        Select Payment Method
      </h2>

      <div className="grid gap-4">

        <button
          onClick={() => completePayment("UPI")}
          className="bg-green-600 text-white rounded-xl py-4 font-semibold hover:bg-green-700"
        >
          UPI
        </button>

        <button
          onClick={() => completePayment("Card")}
          className="bg-blue-600 text-white rounded-xl py-4 font-semibold hover:bg-blue-700"
        >
          Card
        </button>

        <button
          onClick={() => completePayment("Cash")}
          className="bg-orange-500 text-white rounded-xl py-4 font-semibold hover:bg-orange-600"
        >
          Cash
        </button>

      </div>

    </div>

  </div>
)}

    </div>

  );

}