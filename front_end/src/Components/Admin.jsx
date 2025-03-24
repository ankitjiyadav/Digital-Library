import React, { useState } from "react";
import {
  FiHome,
  FiFolder,
  FiCalendar,
  FiMail,
  FiSettings,
  FiUsers,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";
import Dashboard from "./admin/Dashboard"; // ✅ Import Dashboard Correctly
import SeatManagement from "./admin/SeatManagement";
import Fees from "./admin/Fees";
import Reports from "./admin/Reports";
import Vendors from "./admin/Vendars";
import Candidates from "./admin/Candidates";

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // ✅ Logout Function
  const handleLogout = () => {
    alert("Logging out...");
  };
  console.log("Active Tab:", activeTab);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 p-5 h-screen fixed ${
          isOpen ? "left-0" : "-left-64"
        } transition-all duration-300 md:left-0`}
      >
        <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
        <nav className="mt-6 space-y-2">
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg w-full transition ${
              activeTab === "dashboard" ? "bg-blue-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FiHome />
            <span>Dashboard</span>
          </button>

          <button
            className={`flex items-center space-x-2 p-3 rounded-lg w-full transition ${
              activeTab === "seatmanagement"
                ? "bg-blue-700"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("seatmanagement")}
          >
            <FiFolder />
            <span>Seat Management</span>
          </button>

          <button
            className={`flex items-center space-x-2 p-3 rounded-lg w-full transition ${
              activeTab === "fees" ? "bg-blue-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("fees")}
          >
            <FiCalendar />
            <span>Fees</span>
          </button>

          <button
            className={`flex items-center space-x-2 p-3 rounded-lg w-full transition ${
              activeTab === "reporsts" ? "bg-blue-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("reporsts")}
          >
            <FiMail />
            <span>Reporsts</span>
          </button>

          <button
            className={`flex items-center space-x-2 p-3 rounded-lg w-full transition ${
              activeTab === "vendors" ? "bg-blue-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("vendors")}
          >
            <FiUsers />
            <span>Vendors</span>
          </button>

          <button
            className={`flex items-center space-x-2 p-3 rounded-lg w-full transition ${
              activeTab === "candidates" ? "bg-blue-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("candidates")}
          >
            <FiSettings />
            <span>Candidates</span>
          </button>

          {/* Profile */}
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg w-full transition ${
              activeTab === "profile" ? "bg-blue-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaCalendarCheck />
            <span>Profile</span>
          </button>

          {/* Logout Button */}
          <button
            className="flex items-center space-x-2 p-3 rounded-lg w-full bg-red-500 hover:bg-red-600 mt-5"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar */}
        <div className="w-full bg-gray-100 p-5 flex items-center justify-between shadow-md">
          <button
            className="md:hidden text-gray-800 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 p-5 overflow-auto">
          {activeTab === "dashboard" && (
            <>
              {console.log("Dashboard Component Render Ho Raha Hai")}
              <Dashboard />
            </>
          )}
          {activeTab === "seatmanagement" && <SeatManagement />}
          {activeTab === "fees" && <Fees />}
          {activeTab === "reporsts" && <Reports />}
          {activeTab === "vendors" && <Vendors />}
          {activeTab === "candidates" && <Candidates />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
