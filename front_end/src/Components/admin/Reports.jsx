import React from 'react';

const Reports = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-xl">₹50,000</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Pending Fees</h2>
          <p className="text-xl">₹8,000</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Books Issued</h2>
          <p className="text-xl">1,200</p>
        </div>
      </div>

      {/* Reports Table */}
      <h2 className="text-xl font-bold mb-2">Fee Collection Report</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Student Name</th>
            <th className="p-3">Course</th>
            <th className="p-3">Amount Paid</th>
            <th className="p-3">Payment Mode</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b text-center">
            <td className="p-3">05-Mar-2025</td>
            <td className="p-3">Rahul Sharma</td>
            <td className="p-3">B.Tech</td>
            <td className="p-3 text-green-600">₹5,000</td>
            <td className="p-3">UPI</td>
          </tr>
          <tr className="border-b text-center">
            <td className="p-3">02-Mar-2025</td>
            <td className="p-3">Anjali Verma</td>
            <td className="p-3">MBA</td>
            <td className="p-3 text-green-600">₹7,000</td>
            <td className="p-3">Cash</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
