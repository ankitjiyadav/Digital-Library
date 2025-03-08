import React, { useState } from 'react';

const Fees = () => {
  const [feesData, setFeesData] = useState([
    { id: 1, name: "Rahul Sharma", course: "B.Tech", paid: 5000, due: 2000, status: "Pending" },
    { id: 2, name: "Anjali Verma", course: "MBA", paid: 7000, due: 0, status: "Paid" },
    { id: 3, name: "Suresh Kumar", course: "B.Sc", paid: 3000, due: 1000, status: "Pending" },
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fees Management</h1>

      {/* Fees Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Fees Collected</h2>
          <p className="text-xl">₹15,000</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Pending Fees</h2>
          <p className="text-xl">₹3,000</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Students</h2>
          <p className="text-xl">3</p>
        </div>
      </div>

      {/* Fees Table */}
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">Student Name</th>
            <th className="p-3">Course</th>
            <th className="p-3">Paid Amount</th>
            <th className="p-3">Due Amount</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {feesData.map((student) => (
            <tr key={student.id} className="border-b text-center">
              <td className="p-3">{student.name}</td>
              <td className="p-3">{student.course}</td>
              <td className="p-3 text-green-600">₹{student.paid}</td>
              <td className="p-3 text-red-600">₹{student.due}</td>
              <td className="p-3 font-semibold text-gray-700">{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fees;