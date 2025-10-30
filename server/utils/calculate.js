import mockdata from "../mock_data/mock.js";
export async function calculateMetrics(trades = mockdata) {
  const startTime = performance.now();

  if (!Array.isArray(trades) || trades.length === 0) {
    throw new Error("Invalid trades data");
  }

  const totalTrades = trades.length;
  const winningTrades = trades.filter((t) => t.is_win);
  const losingTrades = trades.filter((t) => !t.is_win);
  const winsCount = winningTrades.length;
  const lossesCount = losingTrades.length;
  const winRate = Math.round((winsCount / totalTrades) * 100 * 10) / 10;

  const grossProfits = winningTrades.reduce(
    (sum, t) => sum + t.pnl_currency,
    0
  );
  const grossLosses = Math.abs(
    losingTrades.reduce((sum, t) => sum + t.pnl_currency, 0)
  );
  const profitFactor =
    grossLosses > 0 ? Math.round((grossProfits / grossLosses) * 100) / 100 : 0;

  const pnlPercents = trades.map((t) => t.pnl_percent / 100);
  const averageReturn = Math.round(npMean(pnlPercents) * 100 * 100) / 100; // %

  // Max Drawdown
  let equity = 10000; // Starting capital
  let peak = equity;
  let maxDrawdown = 0;
  for (const trade of trades) {
    equity += trade.pnl_currency;
    if (equity > peak) peak = equity;
    const drawdown = ((equity - peak) / peak) * 100;
    if (drawdown < maxDrawdown) maxDrawdown = drawdown;
  }
  const maxDrawdownPct = Math.round(maxDrawdown * 10) / 10;

  // Streaks
  let longestWinStreak = 0,
    longestLossStreak = 0;
  let currentWinStreak = 0,
    currentLossStreak = 0;
  for (const trade of trades) {
    if (trade.is_win) {
      currentWinStreak++;
      currentLossStreak = 0;
      if (currentWinStreak > longestWinStreak)
        longestWinStreak = currentWinStreak;
    } else {
      currentLossStreak++;
      currentWinStreak = 0;
      if (currentLossStreak > longestLossStreak)
        longestLossStreak = currentLossStreak;
    }
  }

  // Sharpe Ratio (simplified: avg return / std dev, risk-free=0)
  const avgReturn = npMean(pnlPercents);
  const variance =
    pnlPercents.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) /
    (totalTrades - 1);
  const stdDev = Math.sqrt(variance);
  const sharpeRatio =
    stdDev > 0 ? Math.round((avgReturn / stdDev) * 100) / 100 : 0;

  // P/L Breakdown
  const totalPlCur = Math.round((equity - 10000) * 100) / 100;
  const totalPlPct = Math.round((totalPlCur / 10000) * 100 * 10) / 10;

  // Recent 10
  const recentTrades = trades.slice(-10).map((t) => ({
    id: t.id,
    date: t.date,
    pnl_percent: t.pnl_percent,
    pnl_currency: t.pnl_currency,
    is_win: t.is_win,
  }));

  const endTime = performance.now();
  const calculationTime = Math.round((endTime - startTime) * 100) / 100; // ms

  return {
    winRate,
    profitFactor,
    averageReturn,
    maxDrawdown: maxDrawdownPct,
    totalTrades,
    winningTrades: winsCount,
    losingTrades: lossesCount,
    longestWinStreak,
    longestLossStreak,
    sharpeRatio,
    plBreakdown: { currency: totalPlCur, percent: totalPlPct },
    recentTrades,
    calculationTime,
  };
}

// Helpers (simple JS polyfills for mean/std)
function npMean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
