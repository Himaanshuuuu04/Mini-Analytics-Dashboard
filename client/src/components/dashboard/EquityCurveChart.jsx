import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EquityCurveChart({ trades }) {
  if (!trades || trades.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-center">No data available for chart</p>
      </div>
    );
  }

  // Calculate cumulative equity
  const chartData = trades.reduce((acc, trade, index) => {
    const previousEquity = index === 0 ? 10000 : acc[index - 1].equity;
    const newEquity = previousEquity + (trade.pnl_currency || 0);

    acc.push({
      trade: index + 1,
      equity: newEquity,
      profitLoss: trade.pnl_currency || 0,
    });

    return acc;
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="text-sm font-medium text-gray-900">
            Trade #{data.trade}
          </p>
          <p className="text-sm text-gray-600">
            Equity: ${data.equity.toFixed(2)}
          </p>
          <p
            className={`text-sm font-medium ${
              data.profitLoss >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            P/L: ${data.profitLoss.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Equity Curve</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="trade"
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
            label={{
              value: "Trade Number",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="equity"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
