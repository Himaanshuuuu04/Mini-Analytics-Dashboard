import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AreaChartFillByValue = ({
  data = [],
  dataKey = "uv",
  xAxisKey = "name",
  width = "100%",
  height = 300,
  positiveColor = "green",
  negativeColor = "red",
  strokeColor = "#555555",
  showGrid = true,
  showTooltip = true,
}) => {
  // Calculate gradient offset based on data
  const gradientOffset = () => {
    if (!data || data.length === 0) return 0.5;

    const dataMax = Math.max(...data.map((i) => i[dataKey] || 0));
    const dataMin = Math.min(...data.map((i) => i[dataKey] || 0));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
        }}
      >
        No data available
      </div>
    );
  }

  return (
    <AreaChart
      style={{
        width: "100%",
        
        maxHeight: "35vh",
        aspectRatio: "16/9",
      }}
      responsive
      data={data}
      margin={{
        top: 10,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      {showGrid && <CartesianGrid strokeDasharray="1 1" />}
      <XAxis
        dataKey={xAxisKey}
        interval="preserveStartEnd"
        tick={{ fontSize: 10 }}
      />
      <YAxis
        width="auto"
        tick={{ fontSize: 10 }}
        tickFormatter={(value) => `$${value.toLocaleString()}`}
      />
      {showTooltip && <Tooltip />}
      <defs>
        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={positiveColor} stopOpacity={1} />
          <stop offset={off} stopColor={positiveColor} stopOpacity={0.1} />
          <stop offset={off} stopColor={negativeColor} stopOpacity={0.1} />
          <stop offset="1" stopColor={negativeColor} stopOpacity={1} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey={dataKey}
        stroke={strokeColor}
        fill="url(#splitColor)"
      />
    </AreaChart>
  );
};

export default AreaChartFillByValue;
