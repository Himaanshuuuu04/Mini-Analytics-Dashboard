import Header from "../header";
import Button from "../button";
import { Search, Share2 } from "lucide-react";

export default function HomeHeader({ className = "", children }) {
  return (
    <Header
      className={`sticky top-0 z-10 w-full bg-white border-b border-gray-200 ${className}`}
    >
      <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
        Welcome back, Alex
      </h1>
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          className="text-xs sm:text-sm px-2 sm:px-4 py-2 hidden sm:flex"
          variants="primary"
          onClick={() => alert("Request Payout clicked!")}
        >
          💰 Request Payout
        </Button>

        <Button
          className="text-xs sm:text-sm px-2 sm:px-4 py-2"
          variants="secondary"
          onClick={() => alert("Share Metrics clicked!")}
        >
          <Share2
            className="sm:mr-1 inline-block"
            strokeWidth={1.5}
            size={16}
          />
          <span className="hidden sm:inline">Share Metrics</span>
        </Button>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
          <Search className="text-gray-600" strokeWidth={1.5} size={20} />
        </button>
      </div>
    </Header>
  );
}
