type Props = {
  status: string;
};

export default function WaiterStatusBadge({ status }: Props) {
  let color =
    "bg-gray-100 text-gray-700";

  let label = status;

  switch (status) {
    case "available":
      color =
        "bg-green-100 text-green-700";
      label = "Available";
      break;

    case "busy":
      color =
        "bg-red-100 text-red-700";
      label = "Busy";
      break;

    case "break":
      color =
        "bg-yellow-100 text-yellow-700";
      label = "Break";
      break;
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}
    >
      {label}
    </span>
  );
}