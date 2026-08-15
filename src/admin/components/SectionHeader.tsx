import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  children,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-500 mt-1">
            {subtitle}
          </p>
        )}

      </div>

      <div className="flex items-center gap-3">
        {children}
      </div>

    </div>
  );
}