import React, { useState } from 'react';

const Vendors = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: "Raj Traders", address: "Varanasi, UP", mobile: "9876543210", totalSeats: 10, bookedSeats: 5, active: true },
    { id: 2, name: "Sharma Suppliers", address: "Lucknow, UP", mobile: "8765432109", totalSeats: 15, bookedSeats: 10, active: false },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: "", address: "", mobile: "", totalSeats: "", bookedSeats: "", active: true });

  const handleAddVendor = () => {
    setVendors([...vendors, { ...newVendor, id: vendors.length + 1, totalSeats: parseInt(newVendor.totalSeats), bookedSeats: parseInt(newVendor.bookedSeats) }]);
    setShowForm(false);
    setNewVendor({ name: "", address: "", mobile: "", totalSeats: "", bookedSeats: "", active: true });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vendor Management</h1>

      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowForm(true)}>Add Vendor</button>

      {showForm && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-lg font-semibold">New Vendor</h2>
          <input type="text" placeholder="Owner Name" className="block p-2 my-2 w-full" onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })} />
          <input type="text" placeholder="Address" className="block p-2 my-2 w-full" onChange={(e) => setNewVendor({ ...newVendor, address: e.target.value })} />
          <input type="text" placeholder="Mobile" className="block p-2 my-2 w-full" onChange={(e) => setNewVendor({ ...newVendor, mobile: e.target.value })} />
          <input type="number" placeholder="Total Seats" className="block p-2 my-2 w-full" onChange={(e) => setNewVendor({ ...newVendor, totalSeats: e.target.value })} />
          <input type="number" placeholder="Booked Seats" className="block p-2 my-2 w-full" onChange={(e) => setNewVendor({ ...newVendor, bookedSeats: e.target.value })} />
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddVendor}>Save</button>
        </div>
      )}

      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">Owner Name</th>
            <th className="p-3">Address</th>
            <th className="p-3">Mobile</th>
            <th className="p-3">Total Seats</th>
            <th className="p-3">Booked Seats</th>
            <th className="p-3">Available Seats</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="border-b text-center">
              <td className="p-3">{vendor.name}</td>
              <td className="p-3">{vendor.address}</td>
              <td className="p-3">{vendor.mobile}</td>
              <td className="p-3">{vendor.totalSeats}</td>
              <td className="p-3">{vendor.bookedSeats}</td>
              <td className="p-3 text-green-600">{vendor.totalSeats - vendor.bookedSeats}</td>
              <td className="p-3">
                <span className={`px-3 py-1 rounded-full text-white ${vendor.active ? 'bg-green-500' : 'bg-red-500'}`}>
                  {vendor.active ? 'Active' : 'Inactive'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vendors;
