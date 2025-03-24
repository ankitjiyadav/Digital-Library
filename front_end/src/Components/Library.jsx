import React, { useState } from 'react';
import { FaUser, FaSignOutAlt, FaUserGraduate, FaChair, FaMoneyBillWave, FaClipboardList } from 'react-icons/fa';
 import FeesManagement from "../Components/admin/Fees";
import Seat from './library/Seat';
import Condidates from "./admin/Candidates"

const Library = () => {
  const [activeTab, setActiveTab] = useState("candidate");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold text-center">Library Panal</h2>
        <nav className="space-y-3">
          <button
            onClick={() => setActiveTab("condidates")}
            className={`flex items-center gap-2 p-2 rounded-md w-full ${activeTab === "condidates" ? "bg-blue-600" : "hover:bg-blue-600"}`}
          >
            <FaUserGraduate /> Candidate Management
          </button>
          <button
            onClick={() => setActiveTab("seat")}
            className={`flex items-center gap-2 p-2 rounded-md w-full ${activeTab === "seat" ? "bg-blue-600" : "hover:bg-blue-600"}`}
          >
            <FaChair /> Seat Management
          </button>
          <button
            onClick={() => setActiveTab("feesManagement")}
            className={`flex items-center gap-2 p-2 rounded-md w-full ${activeTab === "feesManagement" ? "bg-blue-600" : "hover:bg-blue-600"}`}
          >
            <FaMoneyBillWave /> Fees Management
          </button>
          <button
            onClick={() => setActiveTab("subscription")}
            className={`flex items-center gap-2 p-2 rounded-md w-full ${activeTab === "subscription" ? "bg-blue-600" : "hover:bg-blue-600"}`}
          >
            <FaClipboardList /> Subscription
          </button>
          <button
            onClick={() => setActiveTab("subscription")}
            className={`flex items-center gap-2 p-2 rounded-md w-full ${activeTab === "subscription" ? "bg-blue-600" : "hover:bg-blue-600"}`}
          >
            <FaClipboardList /> Satting
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100">
        {/* Top Navbar */}
        <div className="bg-white shadow-md py-3 px-6 flex justify-end items-center gap-4">
          <button className="flex items-center gap-2 text-blue-800 font-semibold">
            <FaUser /> Profile
          </button>
          <button className="flex items-center gap-2 text-red-600 font-semibold">
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="p-6">
         
          {activeTab === "seat" && <Seat/>}
          {activeTab ==="feesManagement" && <FeesManagement />}
          {activeTab ==="condidates" && <Condidates/>}
        </div>
      </div>
    </div>
  );
};

export default Library;
