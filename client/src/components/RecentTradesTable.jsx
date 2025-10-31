export default function RecentTradesTable({ trades }) {
  if (!trades || trades.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-center">No recent trades available</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Recent Trades</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">
                P/L ($)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">
                Return %
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase">
                Result
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trades.map((trade, index) => (
              <tr
                key={trade.id || index}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {trade.id || index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatDate(trade.date)}
                </td>
                <td
                  className={`px-6 py-4 text-sm text-right font-medium ${
                    (trade.pnl_currency || 0) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatCurrency(trade.pnl_currency || 0)}
                </td>
                <td
                  className={`px-6 py-4 text-sm text-right font-medium ${
                    (trade.pnl_percent || 0) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {(trade.pnl_percent || 0) >= 0 ? "+" : ""}
                  {(trade.pnl_percent || 0).toFixed(2)}%
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.is_win
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {trade.is_win ? "WIN" : "LOSS"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
