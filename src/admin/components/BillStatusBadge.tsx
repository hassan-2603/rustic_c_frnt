type Props = {
  paymentStatus?: string;
};

export default function BillStatusBadge({
  paymentStatus,
}: Props) {

  const paid =
    paymentStatus === "Paid";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        paid
          ? "bg-green-100 text-green-700"
          : "bg-orange-100 text-orange-700"
      }`}
    >
      {paid ? "Paid" : "Pending"}
    </span>
  );
}