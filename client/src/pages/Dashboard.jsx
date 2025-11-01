import MetricsSection from "../components/dashboard/MetricsSection";
import RecentTradesTable from "../components/dashboard/RecentTradesTable";
import EquityCurveSection from "../components/dashboard/EquityCurveSection";
import PLBreakdownSection from "../components/dashboard/PLBreakdownSection";
import WinRateChart from "../components/dashboard/WinRateChart";
import HomeHeader from "../components/home/Header";
import Sidebar from "../components/sidebar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";
import { useAnalytics } from "../hooks/useAnalytics";
import { calculateEquityCurve } from "../utils/analyticsHelpers";
import { STARTING_BALANCE } from "../constants";

export default function Dashboard() {
  const { data, isLoading, error, retry } = useAnalytics();

  if (isLoading) {
    return <LoadingSpinner message="Loading analytics..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={retry} />;
  }

  if (!data) {
    return null;
  }

  const equityData = calculateEquityCurve(data.recentTrades, STARTING_BALANCE);
  const currentBalance = STARTING_BALANCE + (data.plBreakdown?.currency || 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 overflow-auto w-full lg:w-auto">
        <HomeHeader />

        <div className="p-3 sm:p-4 pt-16 lg:pt-4">
          {/* Equity Curve and P/L Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <EquityCurveSection
              equityData={equityData}
              currentBalance={currentBalance}
              plPercent={data.plBreakdown?.percent || 0}
            />
            <PLBreakdownSection
              plCurrency={data.plBreakdown?.currency || 0}
              plPercent={data.plBreakdown?.percent || 0}
              finalBalance={currentBalance}
            />
          </div>

          {/* All Required Metrics */}
          <MetricsSection data={data} />

          {/* Win/Loss Distribution Chart */}
          <div className="mb-3 sm:mb-4">
            <WinRateChart
              winningTrades={data.winningTrades}
              losingTrades={data.losingTrades}
            />
          </div>

          {/* Recent 10 Trades */}
          <RecentTradesTable trades={data.recentTrades} />
        </div>
      </div>
    </div>
  );
}
