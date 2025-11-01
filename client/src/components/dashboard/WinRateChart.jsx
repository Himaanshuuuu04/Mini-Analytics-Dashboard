import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export default function WinRateChart({ winningTrades, losingTrades }) {
  const data = [
    { name: "Winning Trades", value: winningTrades, color: "#10b981" },
    { name: "Losing Trades", value: losingTrades, color: "#ef4444" },
  ];

  const total = winningTrades + losingTrades;
  const winPercentage = ((winningTrades / total) * 100).toFixed(1);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / total) * 100).toFixed(1);

      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="text-sm font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">{data.value} trades</p>
          <p
            className="text-sm font-medium"
            style={{ color: data.payload.color }}
          >
            {percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-800">
          Win/Loss Distribution
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {winPercentage}%
          </div>
          <div className="text-[10px] text-gray-500">Win Rate</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-700 font-medium">
            Wins: {winningTrades}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <span className="text-xs text-gray-700 font-medium">
            Losses: {losingTrades}
          </span>
        </div>
      </div>
    </div>
  );
}
