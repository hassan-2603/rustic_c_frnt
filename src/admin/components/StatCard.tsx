interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function StatCard({
  title,
  value,
  color = "bg-white",
}: StatCardProps) {
  return (
    <div className={`${color} rounded-2xl shadow p-6`}>
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}