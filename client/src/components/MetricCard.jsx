export default function MetricCard({ title, value, subtitle, trend, icon }) {
  const getTrendColor = () => {
    if (!trend) return "text-gray-600";
    return trend === "positive" ? "text-green-600" : "text-red-600";
  };

  const getTrendBg = () => {
    if (!trend) return "bg-gray-100";
    return trend === "positive" ? "bg-green-50" : "bg-red-50";
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>

      <div className="mb-2">
        <p className={`text-3xl font-semibold ${getTrendColor()}`}>{value}</p>
      </div>

      {subtitle && (
        <div
          className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTrendBg()} ${getTrendColor()}`}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}
