import AreaChartFillByValue from "./graph";

export default function EquityCurveSection({
  equityData,
  currentBalance,
  plPercent,
}) {
  return (
    <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-gray-200">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-800 mb-1">
          Equity Curve
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">
            $
            {currentBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <span
            className={`text-xs font-medium ${
              plPercent >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {plPercent >= 0 ? "+" : ""}
            {plPercent.toFixed(2)}%
          </span>
        </div>
      </div>
      <AreaChartFillByValue
        data={equityData}
        dataKey="uv"
        xAxisKey="name"
        height={200}
      />
    </div>
  );
}
