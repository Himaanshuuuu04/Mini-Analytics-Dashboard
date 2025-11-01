/**
 * Calculate equity curve data from trades
 */
export const calculateEquityCurve = (trades, startingBalance = 10000) => {
  return (trades || []).reduce((acc, trade, index) => {
    const previousEquity =
      index === 0 ? startingBalance : acc[index - 1].equity;
    const newEquity = previousEquity + (trade.pnl_currency || 0);

    acc.push({
      name: `Trade ${index + 1}`,
      equity: newEquity,
      uv: newEquity - startingBalance,
    });

    return acc;
  }, []);
};

/**
 * Get subtitle for profit factor
 */
export const getProfitFactorLabel = (profitFactor) => {
  if (profitFactor >= 1.5) return "Strong";
  if (profitFactor >= 1) return "Profitable";
  return "Needs Work";
};

/**
 * Get subtitle for win rate
 */
export const getWinRateLabel = (winRate) => {
  return winRate >= 50 ? "Above Average" : "Below Average";
};

/**
 * Get subtitle for Sharpe Ratio
 */
export const getSharpeRatioLabel = (sharpeRatio) => {
  if (sharpeRatio >= 2) return "Excellent";
  if (sharpeRatio >= 1) return "Good";
  if (sharpeRatio >= 0) return "Fair";
  return "Poor";
};

/**
 * Calculate percentage of total
 */
export const calculatePercentageOfTotal = (part, total) => {
  if (total === 0) return 0;
  return ((part / total) * 100).toFixed(1);
};
