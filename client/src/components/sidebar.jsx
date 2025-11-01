import { useState } from "react";
import { CircleChevronRight, X, Menu } from "lucide-react";
import { VectorSquare } from "lucide-react";
import { BanknoteArrowDown } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { AlignStartHorizontal } from "lucide-react";
import { ListOrdered } from "lucide-react";
import Card from "./card";

export default function Sidebar({ className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const year = new Date().getFullYear();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="text-gray-700" strokeWidth={1.5} size={24} />
        ) : (
          <Menu className="text-gray-700" strokeWidth={1.5} size={24} />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-white border-r border-r-neutral-300 h-screen w-64 overflow-y-auto z-40
          fixed lg:sticky top-0 left-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${className}
        `}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col min-h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Journalyst</h3>
            <CircleChevronRight
              className="hidden lg:inline-block text-gray-500"
              strokeWidth={1.5}
              size={20}
            />
          </div>
          <nav className="flex flex-col space-y-4 mb-4">
            <span className="text-sm font-semibold text-gray-500 uppercase mb-4">
              Menu
            </span>
            <a
              href="#"
              onClick={closeSidebar}
              className="flex items-center bg-gray-100 text-sm font-bold text-gray-700 rounded-md hover:bg-gray-100"
            >
              <VectorSquare
                className="m-2 mr-4 inline-block text-gray-500"
                strokeWidth={1.5}
                size={20}
              />{" "}
              Accounts Overview
            </a>
            <a
              href="#"
              onClick={closeSidebar}
              className="flex items-center text-sm font-bold text-gray-700 rounded-md hover:bg-gray-100"
            >
              <BanknoteArrowDown
                className="m-2 mr-4 inline-block text-gray-500"
                strokeWidth={1.5}
                size={20}
              />{" "}
              Payout
            </a>
            <a
              href="#"
              onClick={closeSidebar}
              className="flex items-center text-sm font-bold text-gray-700 rounded-md hover:bg-gray-100"
            >
              <ShieldCheck
                className="m-2 mr-4 inline-block text-gray-500"
                strokeWidth={1.5}
                size={20}
              />{" "}
              Certificates
            </a>

            <a
              href="#"
              onClick={closeSidebar}
              className="flex items-center text-sm font-bold text-gray-700 rounded-md hover:bg-gray-100"
            >
              <AlignStartHorizontal
                className="m-2 mr-4 inline-block text-gray-500 rotate-180"
                strokeWidth={1.5}
                size={20}
              />{" "}
              Leaderboards
            </a>

            <a
              href="#"
              onClick={closeSidebar}
              className="flex items-center text-sm font-bold text-gray-700 rounded-md hover:bg-gray-100"
            >
              <ListOrdered
                className="m-2 mr-4 inline-block text-gray-500"
                strokeWidth={1.5}
                size={20}
              />{" "}
              Order List
            </a>
          </nav>
          <hr className="text-gray-300 mb-4" />
          <Card className="bg-gray-100! p-4! space-y-2 mb-4">
            <div className="flex justify-between bg-white p-1 px-2 rounded">
              <span className="text-sm text-gray-500">Account</span>
              <span className="text-sm font-bold text-gray-900">999999</span>
            </div>
            <div className="flex justify-between bg-white p-1 px-2 rounded">
              <span className="text-sm text-gray-500">Status</span>
              <span className="text-sm font-bold text-green-500">Active</span>
            </div>
            <div className="flex justify-between bg-white p-1 px-2 rounded">
              <span className="text-sm text-gray-500">Program</span>
              <span className="text-sm font-bold text-gray-900">$4999</span>
            </div>
          </Card>
          <Card className="text-center mt-auto">
            <p className="text-sm text-gray-500">
              &copy; {year} Journalyst. All rights reserved.
            </p>
          </Card>
        </div>
      </aside>
    </>
  );
}
