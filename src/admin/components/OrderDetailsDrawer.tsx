import { useState, useEffect } from "react";
import OrderTimeline from "./OrderTimeline";
import {
  X,
  Receipt,
  Clock,
  Hash,
  ShoppingBag,
  Percent,
} from "lucide-react";
import { updateOrderDiscount } from "../services/orderService";
import { printBillThroughConnector, getCaptainName } from "../services/printerService";

import StatusBadge from "./StatusBadge";

type Props = {
  open: boolean;
  order: any;
  onClose: () => void;
};

export default function OrderDetailsDrawer({
  open,
  order,
  onClose,
}: Props) {
  if (!open || !order) return null;

  const [isDiscountFormOpen, setIsDiscountFormOpen] = useState(false);
  const [discountType, setDiscountType] = useState<'percent' | 'flat'>('percent');
  const [discountValue, setDiscountValue] = useState<string>("");

  useEffect(() => {
    if (order) {
      setDiscountType(order.discountType || 'percent');
      setDiscountValue(order.discountValue !== undefined ? String(order.discountValue) : "");
      setIsDiscountFormOpen(!!order.discountAmount);
    }
  }, [order]);

  const created =
    order.createdAt?.toDate?.() || new Date();

  const total = order.total;

  async function handleApplyDiscount() {
    const value = parseFloat(discountValue);
    if (isNaN(value) || value <= 0) {
      alert("Please enter a valid discount amount/percentage.");
      return;
    }

    let calculatedDiscount = 0;
    const foodTotal = order.total;

    if (discountType === 'percent') {
      calculatedDiscount = Math.round((foodTotal * value) / 100);
    } else {
      calculatedDiscount = value;
    }

    if (calculatedDiscount > foodTotal) {
      alert("Discount cannot exceed the total amount.");
      return;
    }

    const finalTotal = Math.max(0, foodTotal - calculatedDiscount);

    try {
      await updateOrderDiscount(order.id, {
        discountType,
        discountValue: value,
        discountAmount: calculatedDiscount,
        finalTotal,
      });
      order.discountType = discountType;
      order.discountValue = value;
      order.discountAmount = calculatedDiscount;
      order.finalTotal = finalTotal;
      setIsDiscountFormOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to apply discount.");
    }
  }

  async function handleRemoveDiscount() {
    try {
      await updateOrderDiscount(order.id, {
        discountType: null as any,
        discountValue: null as any,
        discountAmount: null as any,
        finalTotal: null as any,
      });
      order.discountType = undefined;
      order.discountValue = undefined;
      order.discountAmount = undefined;
      order.finalTotal = undefined;
      setDiscountValue("");
      setIsDiscountFormOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to clear discount.");
    }
  }

  async function handlePrint() {
    try {
      await printBillThroughConnector(order);
      return;
    } catch (error) {
      console.warn("Print connector unavailable; opening browser print dialog.", error);
    }

    const itemsHtml = order.items
      ?.map(
        (item: any) => `
        <tr>
          <td>${item.name}</td>
          <td style="text-align:center">${item.quantity}</td>
          <td style="text-align:right">₹${item.price * item.quantity}</td>
        </tr>
      `
      )
      .join("");

    const created =
      order.createdAt?.toDate?.() || new Date();

    const win = window.open("", "", "width=420,height=700");

    if (!win) return;

    const hasDiscount = order.discountAmount && order.discountAmount > 0;
    const discountSectionHtml = hasDiscount
      ? `
        <div style="text-align:right; margin-top:10px; font-size:16px;">
          Food Total: ₹${order.total}
        </div>
        <div style="text-align:right; margin-top:5px; font-size:16px; color:#b91c1c;">
          Discount (${order.discountType === 'percent' ? `${order.discountValue}%` : `₹${order.discountValue}`}): -₹${order.discountAmount}
        </div>
        <div class="total">
          Grand Total : ₹${order.finalTotal}
        </div>
      `
      : `
        <div class="total">
          Total : ₹${order.total}
        </div>
      `;

    win.document.write(`
    <html>

    <head>

      <title>Receipt</title>

      <style>

        body{
          font-family:Arial;
          padding:20px;
        }

        h2{
          text-align:center;
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:15px;
        }

        th,td{
          border-bottom:1px dashed #999;
          padding:8px;
        }

        .total{
          text-align:right;
          margin-top:20px;
          font-size:20px;
          font-weight:bold;
        }

      </style>

    </head>

    <body>

      <h2>Rustic Charm</h2>

      <p><b>Order:</b> ${order.orderNumber}</p>

      <p><b>Table:</b> ${order.tableLabel || order.tableReference || `Table ${order.tableNumber || "--"}`}</p>

      <p><b>Customer Name:</b> ${order.customerName || ""}</p>

      <p><b>Customer Phone:</b> ${order.customerPhone || ""}</p>

      <p><b>Waiter:</b> ${order.waiterName}</p>

      <p><b>Captain:</b> ${getCaptainName()}</p>

      <p><b>Date:</b> ${created.toLocaleString()}</p>

      <table>

        <thead>

          <tr>

            <th align="left">Item</th>

            <th>Qty</th>

            <th align="right">Amount</th>

          </tr>

        </thead>

        <tbody>

          ${itemsHtml}

        </tbody>

      </table>

      ${discountSectionHtml}

      <p style="margin-top:15px;">
        <b>Payment Method:</b>
        ${order.paymentMethod || "-"}
      </p>

    </body>

    </html>
    `);

    win.document.close();

    setTimeout(() => {
      win.focus();
      win.print();
    }, 300);
  }

  const hasDiscount = order.discountAmount && order.discountAmount > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">

      <div className="w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-start">

          <div>

            <h2 className="text-2xl font-bold">
              Order #{order.orderNumber}
            </h2>

            <p className="text-gray-500 mt-1">
              {order.tableLabel || order.tableReference || `Table ${order.tableNumber || "--"}`}
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X />
          </button>

        </div>

        <div className="p-6 space-y-8">

          {/* Customer Details */}

          <div className="border rounded-2xl p-5">
            <h3 className="font-semibold mb-4">
              Customer Details
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Name</span>
                <p className="font-medium">{order.customerName || ""}</p>
              </div>
              <div>
                <span className="text-gray-500">Phone</span>
                <p className="font-medium">{order.customerPhone || ""}</p>
              </div>
            </div>
          </div>

          {/* Status */}

          <div>

            <h3 className="font-semibold mb-3">
              Current Status
            </h3>

            <StatusBadge status={order.status} />

            <div className="mt-4">
              <span className="text-sm font-medium">
                Payment Method:
              </span>

              <span
                className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  order.paymentMethod === "UPI"
                    ? "bg-green-100 text-green-700"
                    : order.paymentMethod === "Card"
                    ? "bg-blue-100 text-blue-700"
                    : order.paymentMethod === "Cash"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {order.paymentMethod || "Not Paid"}
              </span>

            </div>

          </div>

          {/* Items */}

          <div>

            <h3 className="font-semibold mb-4 flex items-center gap-2">

              <ShoppingBag size={18} />

              Ordered Items

            </h3>

            <div className="space-y-3">

              {order.items?.map(
                (item: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between border rounded-xl p-4"
                  >
                    <div>

                      <p className="font-semibold">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty : {item.quantity}
                      </p>

                    </div>

                    <p className="font-semibold">
                      ₹
                      {item.price * item.quantity}
                    </p>

                  </div>
                )
              )}

            </div>

          </div>

          {/* Bill Summary */}

          <div className="border rounded-2xl p-5">

            <h3 className="font-semibold flex items-center gap-2 mb-5">

              <Receipt size={18} />

              Bill Summary

            </h3>

            <div className="space-y-3">

              <div className="flex justify-between text-sm text-gray-600">
                <span>Food Total</span>
                <span>₹{total}</span>
              </div>

              {hasDiscount && (
                <div className="flex justify-between text-sm text-red-600 font-semibold animate-in fade-in slide-in-from-top-1 duration-200">
                  <span>
                    Discount ({order.discountType === 'percent' ? `${order.discountValue}%` : `₹${order.discountValue}`})
                  </span>
                  <span>-₹{order.discountAmount}</span>
                </div>
              )}

              <hr />

              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Grand Total</span>
                <span>₹{hasDiscount ? order.finalTotal : total}</span>
              </div>

            </div>

          </div>

          <div className="border rounded-2xl p-5">

            <OrderTimeline
              currentStatus={order.status}
            />

          </div>

          {/* Order Info */}

          <div className="border rounded-2xl p-5">

            <h3 className="font-semibold mb-5">
              Order Information
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">

                <Clock size={18} />

                <div>

                  <p className="text-sm text-gray-500">
                    Created
                  </p>

                  <p className="font-medium">
                    {created.toLocaleString()}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Hash size={18} />

                <div>

                  <p className="text-sm text-gray-500">
                    Session ID
                  </p>

                  <p className="font-medium break-all">
                    {order.sessionId}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Discount controls (Only visible when status is Completed or Bill Requested) */}
          {(order.status === "Completed" || order.status === "Bill Requested") && (
            <div className="border rounded-2xl p-5 bg-gray-50/50 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold flex items-center gap-2 text-gray-900">
                  <Percent size={18} className="text-olive" />
                  Apply Discount
                </h3>
                {!isDiscountFormOpen && (
                  <button
                    type="button"
                    onClick={() => setIsDiscountFormOpen(true)}
                    className="text-sm font-semibold text-olive hover:text-olive/80 underline focus:outline-none"
                  >
                    {hasDiscount ? "Modify Discount" : "Add Discount"}
                  </button>
                )}
              </div>

              {isDiscountFormOpen && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setDiscountType('percent')}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition ${
                        discountType === 'percent'
                          ? 'bg-olive text-white border-olive'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Percentage (%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiscountType('flat')}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition ${
                        discountType === 'flat'
                          ? 'bg-olive text-white border-olive'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Flat Amount (₹)
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      placeholder={discountType === 'percent' ? "e.g. 10%" : "e.g. 100"}
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      className="flex-grow border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-olive transition"
                    />
                    <button
                      type="button"
                      onClick={handleApplyDiscount}
                      className="bg-olive hover:bg-olive/90 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                    >
                      Apply
                    </button>
                    {(hasDiscount || discountValue) && (
                      <button
                        type="button"
                        onClick={handleRemoveDiscount}
                        className="border border-red-200 hover:bg-red-50 text-red-600 px-3 py-2 rounded-xl text-sm font-semibold transition"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer */}

          <div className="flex gap-4">

            <button
              onClick={handlePrint}
              className="flex-1 bg-olive hover:bg-olive/90 text-white py-3 rounded-xl font-semibold transition"
            >
              Print Bill
            </button>

            <button
              onClick={onClose}
              className="flex-1 border py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}