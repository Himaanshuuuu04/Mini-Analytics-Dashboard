import PLSummaryCard from "./PLSummaryCard";

export default function PLBreakdownSection({
  plCurrency,
  plPercent,
  finalBalance,
}) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-base font-semibold text-gray-800 mb-3">
        P/L Breakdown
      </h3>
      <div className="flex flex-col  gap-3">
        <PLSummaryCard
          label="Total P/L (Currency)"
          value={`$${plCurrency.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          trend={plCurrency >= 0 ? "positive" : "negative"}
        />
        <PLSummaryCard
          label="Total P/L (Percentage)"
          value={`${plPercent >= 0 ? "+" : ""}${plPercent.toFixed(2)}%`}
          trend={plPercent >= 0 ? "positive" : "negative"}
        />
        <PLSummaryCard
          label="Final Balance"
          value={`$${finalBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          trend="neutral"
        />
      </div>
    </div>
  );
}
