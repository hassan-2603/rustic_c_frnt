import { Printer } from "lucide-react";
import { printBillThroughConnector } from "../services/printerService";

type Props = {
  orders: any[];
};

export default function BillsTable({ orders }: Props) {
  async function printBill(order: any) {
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
          <td style="text-align:center;">${item.quantity}</td>
          <td style="text-align:right;">₹${item.price}</td>
        </tr>
      `
      )
      .join("");

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
            margin-bottom:4px;
          }

          p{
            margin:4px 0;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:15px;
          }

          th,td{
            padding:8px;
            border-bottom:1px dashed #999;
          }

          .total{
            margin-top:20px;
            font-size:20px;
            font-weight:bold;
            text-align:right;
          }

        </style>

      </head>

      <body>

        <h2>Rustic Charm</h2>

        <p><b>Order:</b> ${order.orderNumber}</p>

        <p><b>Waiter:</b> ${order.waiterName}</p>

        <p><b>Date:</b> ${new Date(
          order.createdAt.seconds * 1000
        ).toLocaleString()}</p>

        <table>

          <thead>

            <tr>

              <th align="left">Item</th>

              <th>Qty</th>

              <th align="right">Price</th>

            </tr>

          </thead>

          <tbody>

            ${itemsHtml}

          </tbody>

        </table>

        ${discountSectionHtml}

      </body>

      </html>
    `);

    win.document.close();

    win.print();
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="text-left p-5">Order</th>

            <th className="text-left p-5">Waiter</th>

            <th className="text-left p-5">Total</th>

            <th className="text-left p-5">Status</th>

            <th className="text-right p-5">Action</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order.id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-5">
                {order.orderNumber}
              </td>

              <td className="p-5">
                {order.waiterName}
              </td>

              <td className="p-5 font-semibold">
                ₹{order.finalTotal ?? order.total}
              </td>

              <td className="p-5">
                {order.status}
              </td>

              <td className="p-5">

                <div className="flex justify-end">

                  <button
                    onClick={() => printBill(order)}
                    className="flex items-center gap-2 bg-olive text-white px-4 py-2 rounded-lg hover:bg-olive/90"
                  >
                    <Printer size={18} />

                    Print

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}