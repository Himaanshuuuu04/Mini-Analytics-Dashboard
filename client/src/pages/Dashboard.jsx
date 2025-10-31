import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalyticsData } from "../store/slices/analyticsSlice";
import MetricCard from "../components/MetricCard";
import StatGrid from "../components/StatGrid";
import RecentTradesTable from "../components/RecentTradesTable";
import EquityCurveChart from "../components/EquityCurveChart";
import WinRateChart from "../components/WinRateChart";
import HomeHeader from "../components/home/Header";
import Sidebar from "../components/sidebar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg border border-red-200 max-w-md">
          <div className="text-red-600 mb-2 text-lg font-semibold">
            Error Loading Data
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => dispatch(fetchAnalyticsData())}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const getTrend = (value) => {
    if (value > 0) return "positive";
    if (value < 0) return "negative";
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      <Sidebar/>
      
      <div className="w-full">
        {/* Header */}
        <HomeHeader/>
        
      <div className="m-4">

        {/* Main Metrics Grid */}
        <StatGrid>
          <MetricCard
            title="Win Rate"
            value={`${data.winRate.toFixed(2)}%`}
            subtitle={data.winRate >= 50 ? "Above Average" : "Below Average"}
            trend={data.winRate >= 50 ? "positive" : "negative"}
          />

          <MetricCard
            title="Profit Factor"
            value={data.profitFactor.toFixed(2)}
            subtitle={
              data.profitFactor >= 1.5
                ? "Strong"
                : data.profitFactor >= 1
                ? "Profitable"
                : "Needs Work"
            }
            trend={data.profitFactor >= 1 ? "positive" : "negative"}
          />

          <MetricCard
            title="Average Return"
            value={`${
              data.averageReturn >= 0 ? "+" : ""
            }${data.averageReturn.toFixed(2)}%`}
            subtitle="Per Trade"
            trend={getTrend(data.averageReturn)}
          />

          <MetricCard
            title="Max Drawdown"
            value={`${data.maxDrawdown.toFixed(2)}%`}
            subtitle="Peak to Trough"
            trend="negative"
          />

          <MetricCard
            title="Total Trades"
            value={data.totalTrades}
            subtitle={`${data.winningTrades} Wins / ${data.losingTrades} Losses`}
          />

          <MetricCard
            title="Win Streak"
            value={data.longestWinStreak}
            subtitle="Consecutive Wins"
            trend="positive"
          />

          <MetricCard
            title="Loss Streak"
            value={data.longestLossStreak}
            subtitle="Consecutive Losses"
            trend="negative"
          />

          <MetricCard
            title="Sharpe Ratio"
            value={data.sharpeRatio.toFixed(2)}
            subtitle={data.sharpeRatio >= 1 ? "Good Risk/Return" : "High Risk"}
            trend={data.sharpeRatio >= 1 ? "positive" : "negative"}
          />
        </StatGrid>

        {/* P/L Breakdown */}
        <div className="mb-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Profit & Loss Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total P/L</p>
                <p
                  className={`text-2xl font-bold ${
                    (data.plBreakdown?.currency || 0) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  $
                  {(data.plBreakdown?.currency || 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {(data.plBreakdown?.percent || 0) >= 0 ? "+" : ""}
                  {(data.plBreakdown?.percent || 0).toFixed(2)}% return
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Wins</p>
                <p className="text-2xl font-bold text-green-600">
                  {data.winningTrades || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {data.winRate?.toFixed(2) || 0}% win rate
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Losses</p>
                <p className="text-2xl font-bold text-red-600">
                  {data.losingTrades || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Profit Factor: {data.profitFactor?.toFixed(2) || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <EquityCurveChart trades={data.recentTrades || []} />
          <WinRateChart
            winningTrades={data.winningTrades}
            losingTrades={data.losingTrades}
          />
        </div>

        {/* Recent Trades Table */}
        <RecentTradesTable trades={data.recentTrades} />
        </div>
      </div>
    </div>
  );
}
