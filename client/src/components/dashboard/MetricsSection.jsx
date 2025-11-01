import MetricCard from "./MetricCard";
import { getTrend } from "../../utils/formatters";
import {
  getProfitFactorLabel,
  getWinRateLabel,
  getSharpeRatioLabel,
  calculatePercentageOfTotal,
} from "../../utils/analyticsHelpers";

export default function MetricsSection({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      <MetricCard
        title="Win Rate (%)"
        value={`${data.winRate.toFixed(2)}%`}
        subtitle={getWinRateLabel(data.winRate)}
        trend={data.winRate >= 50 ? "positive" : "negative"}
      />

      <MetricCard
        title="Profit Factor"
        value={data.profitFactor.toFixed(2)}
        subtitle={getProfitFactorLabel(data.profitFactor)}
        trend={data.profitFactor >= 1 ? "positive" : "negative"}
      />

      <MetricCard
        title="Average Return (%)"
        value={`${
          data.averageReturn >= 0 ? "+" : ""
        }${data.averageReturn.toFixed(2)}%`}
        subtitle="Per Trade"
        trend={getTrend(data.averageReturn)}
      />

      <MetricCard
        title="Maximum Drawdown (%)"
        value={`${data.maxDrawdown.toFixed(2)}%`}
        subtitle="Peak to Trough"
        trend="negative"
      />

      <MetricCard
        title="Total Trades"
        value={data.totalTrades}
        subtitle="All Trades"
      />

      <MetricCard
        title="Winning Trades Count"
        value={data.winningTrades}
        subtitle={`${calculatePercentageOfTotal(
          data.winningTrades,
          data.totalTrades
        )}% of Total`}
        trend="positive"
      />

      <MetricCard
        title="Losing Trades Count"
        value={data.losingTrades}
        subtitle={`${calculatePercentageOfTotal(
          data.losingTrades,
          data.totalTrades
        )}% of Total`}
        trend="negative"
      />

      <MetricCard
        title="Longest Win Streak"
        value={data.longestWinStreak}
        subtitle="Consecutive Wins"
        trend="positive"
      />

      <MetricCard
        title="Longest Loss Streak"
        value={data.longestLossStreak}
        subtitle="Consecutive Losses"
        trend="negative"
      />

      <MetricCard
        title="Sharpe Ratio"
        value={data.sharpeRatio.toFixed(2)}
        subtitle={getSharpeRatioLabel(data.sharpeRatio)}
        trend={data.sharpeRatio >= 1 ? "positive" : "negative"}
      />
    </div>
  );
}
