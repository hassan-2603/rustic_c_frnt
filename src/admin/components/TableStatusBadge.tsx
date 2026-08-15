type Props = {
  status: string;
};

export default function TableStatusBadge({
  status,
}: Props) {
  let classes =
    "bg-gray-100 text-gray-700";

  let label = status;

  switch (status) {
    case "available":
      classes =
        "bg-green-100 text-green-700";
      label = "Available";
      break;

    case "occupied":
      classes =
        "bg-red-100 text-red-700";
      label = "Occupied";
      break;

    case "bill_requested":
      classes =
        "bg-orange-100 text-orange-700";
      label = "Bill Requested";
      break;

    case "cleaning":
      classes =
        "bg-yellow-100 text-yellow-700";
      label = "Cleaning";
      break;

    case "reserved":
      classes =
        "bg-blue-100 text-blue-700";
      label = "Reserved";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${classes}`}
    >
      {label}
    </span>
  );
}