export default function MetricCard({ title, value, subtitle, trend, icon }) {
  const getTrendColor = () => {
    if (!trend) return "text-gray-900";
    return trend === "positive" ? "text-green-600" : "text-red-600";
  };

  const getTrendBg = () => {
    if (!trend) return "bg-gray-50";
    return trend === "positive" ? "bg-green-50" : "bg-red-50";
  };

  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
          {title}
        </h3>
        {subtitle && (
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${getTrendBg()} ${getTrendColor()}`}
          >
            {subtitle}
          </span>
        )}
      </div>

      <p className={`text-xl font-bold ${getTrendColor()}`}>{value}</p>
    </div>
  );
}
