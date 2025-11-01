import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalyticsData } from "../store/slices/analyticsSlice";

/**
 * Custom hook for analytics data
 * Handles fetching and provides analytics state
 */
export const useAnalytics = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  const retry = () => {
    dispatch(fetchAnalyticsData());
  };

  return {
    data,
    isLoading,
    error,
    retry,
  };
};
