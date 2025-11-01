export default function PLSummaryCard({ label, value, trend }) {
  const getTextColor = () => {
    if (trend === "positive") return "text-green-600";
    if (trend === "negative") return "text-red-600";
    return "text-blue-600";
  };

  return (
    <div className="text-center p-3 bg-gray-50 rounded-lg">
      <p className="text-[10px] text-gray-600 mb-1 uppercase font-semibold">
        {label}
      </p>
      <p className={`text-xl font-bold ${getTextColor()}`}>{value}</p>
    </div>
  );
}
