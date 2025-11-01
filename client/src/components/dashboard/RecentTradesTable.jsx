import {
  formatDate,
  formatCurrencyWithSymbol,
  getColorClass,
} from "../../utils/formatters";

export default function RecentTradesTable({ trades }) {
  if (!trades || trades.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-center">No recent trades available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-800">
          Recent 10 Trades
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase">
                Trade #
              </th>
              <th className="px-4 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase">
                Date
              </th>
              <th className="px-4 py-2 text-right text-[10px] font-semibold text-gray-600 uppercase">
                P/L ($)
              </th>
              <th className="px-4 py-2 text-right text-[10px] font-semibold text-gray-600 uppercase">
                Return %
              </th>
              <th className="px-4 py-2 text-center text-[10px] font-semibold text-gray-600 uppercase">
                Result
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {trades.map((trade, index) => (
              <tr
                key={trade.id || index}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2.5 text-xs font-medium text-gray-900">
                  #{trade.id}
                </td>
                <td className="px-4 py-2.5 text-xs text-gray-600">
                  {formatDate(trade.date)}
                </td>
                <td
                  className={`px-4 py-2.5 text-xs text-right font-semibold ${getColorClass(
                    trade.pnl_currency || 0
                  )}`}
                >
                  {(trade.pnl_currency || 0) >= 0 ? "+" : ""}
                  {formatCurrencyWithSymbol(trade.pnl_currency || 0)}
                </td>
                <td
                  className={`px-4 py-2.5 text-xs text-right font-semibold ${getColorClass(
                    trade.pnl_percent || 0
                  )}`}
                >
                  {(trade.pnl_percent || 0) >= 0 ? "+" : ""}
                  {(trade.pnl_percent || 0).toFixed(2)}%
                </td>
                <td className="px-4 py-2.5 text-xs text-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
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
