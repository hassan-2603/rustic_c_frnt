import { PackageOpen } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
}

export default function EmptyState({
  title,
  subtitle,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24">

      <PackageOpen
        size={60}
        className="text-gray-300 mb-5"
      />

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {subtitle}
      </p>

    </div>
  );
}