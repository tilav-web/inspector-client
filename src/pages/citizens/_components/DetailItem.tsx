import { type ReactNode } from 'react';

interface DetailItemProps {
  label: string;
  value?: ReactNode;
  icon?: ReactNode;
}

export const DetailItem = ({ label, value, icon }: DetailItemProps) => {
  if (!value) return null;

  return (
    <div className="flex items-start space-x-3 py-2">
      {icon && <div className="text-blue-500 mt-1">{icon}</div>}
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-md font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
