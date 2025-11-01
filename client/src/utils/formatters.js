/**
 * Format a number as currency
 */
export const formatCurrency = (amount, options = {}) => {
  const { minimumFractionDigits = 2, maximumFractionDigits = 2 } = options;
  return amount.toLocaleString("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  });
};

/**
 * Format amount with currency symbol
 */
export const formatCurrencyWithSymbol = (amount, options = {}) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    ...options,
  }).format(amount);
};

/**
 * Format date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Format a number as percentage
 */
export const formatPercentage = (value, options = {}) => {
  const { decimals = 2, includeSign = false } = options;
  const sign = includeSign && value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
};

/**
 * Get trend based on value
 */
export const getTrend = (value) => {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return null;
};

/**
 * Get color class based on value
 */
export const getColorClass = (
  value,
  positiveColor = "text-green-600",
  negativeColor = "text-red-600"
) => {
  if (value >= 0) return positiveColor;
  return negativeColor;
};

/**
 * Get quality label for metrics
 */
export const getQualityLabel = (value, thresholds) => {
  const { excellent, good, fair } = thresholds;

  if (value >= excellent) return "Excellent";
  if (value >= good) return "Good";
  if (value >= fair) return "Fair";
  return "Poor";
};
