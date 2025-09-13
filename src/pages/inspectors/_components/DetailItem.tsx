interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export const DetailItem = ({ icon, label, value }: DetailItemProps) => (
  <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
    <div className="text-blue-600 mt-1 p-2 bg-blue-100 rounded-lg">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-blue-700 font-medium">{label}</p>
      <p className="font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);
