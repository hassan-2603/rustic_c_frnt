interface Props {
  order: any;
  buttonText: string;
  onAction?: (order: any) => void;
  onReject?: (order: any) => void;
}

export default function OrderCard({
  order,
  buttonText,
  onAction,
  onReject,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

        <div>

          <h2 className="text-2xl font-bold">
            {order.tableLabel || order.tableReference || `Table ${order.tableNumber || "--"}`}
          </h2>

          <p className="text-gray-500">
            Order #{order.orderNumber}
          </p>

        </div>

        <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">

          {order.status}

        </span>

      </div>

      <div className="mt-5 space-y-2">

        {(order.items || []).map((item: any, index: number) => (

          <div
            key={index}
            className="flex justify-between"
          >

            <span>

              {item.quantity} × {item.name}

            </span>

            <span>

              ₹{item.price * item.quantity}

            </span>

          </div>

        ))}

      </div>

      <div className="mt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

        <h3 className="text-xl font-bold">

          ₹{order.total}

        </h3>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {onReject && (
            <button
              onClick={() => onReject(order)}
              className="px-5 py-2 rounded-xl text-white font-semibold bg-red-600 hover:bg-red-700 transition"
            >
              Reject Order
            </button>
          )}

          <button
            disabled={!onAction}
            onClick={() => onAction?.(order)}
            className={`px-5 py-2 rounded-xl text-white font-semibold ${onAction
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {buttonText}
          </button>
        </div>

      </div>

    </div>
  );
}