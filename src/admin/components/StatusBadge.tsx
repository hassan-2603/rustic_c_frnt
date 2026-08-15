type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  let classes =
    "bg-gray-100 text-gray-700";

  switch (status) {
    case "Pending":
      classes =
        "bg-yellow-100 text-yellow-800";
      break;

    case "Accepted":
      classes =
        "bg-blue-100 text-blue-700";
      break;

    case "Preparing":
      classes =
        "bg-orange-100 text-orange-700";
      break;

    case "Ready":
      classes =
        "bg-green-100 text-green-700";
      break;

    case "Served":
      classes =
        "bg-purple-100 text-purple-700";
      break;

    case "Bill Requested":
      classes =
        "bg-indigo-100 text-indigo-700";
      break;

    case "Payment Done":
      classes =
        "bg-emerald-100 text-emerald-700";
      break;

    case "Completed":
      classes =
        "bg-gray-200 text-gray-800";
      break;

    case "Cancelled":
      classes =
        "bg-red-100 text-red-700";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${classes}`}
    >
      {status}
    </span>
  );
}