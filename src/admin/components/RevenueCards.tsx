import { IndianRupee, Receipt, TrendingUp } from "lucide-react";

type Props = {
  orders: any[];
};

export default function RevenueCards({ orders }: Props) {
  const today = new Date();

  const todayOrders = orders.filter((order) => {
    if (!order.createdAt) return false;

    const date = order.createdAt.toDate
      ? order.createdAt.toDate()
      : new Date(order.createdAt);

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });

  const weeklyOrders = orders.filter((order) => {
    if (!order.createdAt) return false;

    const date = order.createdAt.toDate
      ? order.createdAt.toDate()
      : new Date(order.createdAt);

    const diff =
      (today.getTime() - date.getTime()) /
      (1000 * 60 * 60 * 24);

    return diff <= 7;
  });

  const todayRevenue = todayOrders.reduce(
    (sum, order) => sum + (order.total || 0),
    0
  );

  const weeklyRevenue = weeklyOrders.reduce(
    (sum, order) => sum + (order.total || 0),
    0
  );

  const cards = [
    {
      title: "Today's Revenue",
      value: `₹${todayRevenue.toLocaleString()}`,
      icon: IndianRupee,
    },
    {
      title: "Today's Bills",
      value: todayOrders.length,
      icon: Receipt,
    },
    {
      title: "Weekly Revenue",
      value: `₹${weeklyRevenue.toLocaleString()}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm border p-6"
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div className="w-14 h-14 rounded-xl bg-olive/10 flex items-center justify-center">
                <Icon
                  size={28}
                  className="text-olive"
                />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}