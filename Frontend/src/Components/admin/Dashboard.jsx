import React from "react";
import { FaUsers, FaBook, FaChair, FaMoneyBillWave, FaClock, FaFileInvoice } from "react-icons/fa";

const Dashboard = ({ activeTab }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{activeTab}</h1>
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-6 shadow rounded-lg flex items-center">
            <FaUsers className="text-blue-500 text-3xl mr-3" />
            <div>
              <p className="text-gray-600">Total Students</p>
              <h2 className="text-xl font-bold">1200</h2>
            </div>
          </div>
          <div className="bg-white p-6 shadow rounded-lg flex items-center">
            <FaBook className="text-green-500 text-3xl mr-3" />
            <div>
              <p className="text-gray-600">Total Books</p>
              <h2 className="text-xl font-bold">4500</h2>
            </div>
          </div>
          <div className="bg-white p-6 shadow rounded-lg flex items-center">
            <FaChair className="text-purple-500 text-3xl mr-3" />
            <div>
              <p className="text-gray-600">Total Seats</p>
              <h2 className="text-xl font-bold">300</h2>
            </div>
          </div>
          <div className="bg-white p-6 shadow rounded-lg flex items-center">
            <FaMoneyBillWave className="text-yellow-500 text-3xl mr-3" />
            <div>
              <p className="text-gray-600">Total Revenue</p>
              <h2 className="text-xl font-bold">₹50,000</h2>
            </div>
          </div>
          <div className="bg-white p-6 shadow rounded-lg flex items-center">
            <FaClock className="text-red-500 text-3xl mr-3" />
            <div>
              <p className="text-gray-600">Total Shifts</p>
              <h2 className="text-xl font-bold">6</h2>
            </div>
          </div>
          <div className="bg-white p-6 shadow rounded-lg flex items-center">
            <FaFileInvoice className="text-indigo-500 text-3xl mr-3" />
            <div>
              <p className="text-gray-600">Total Expenses</p>
              <h2 className="text-xl font-bold">₹10,000</h2>
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default Dashboard;