import React, { useState, useEffect } from "react";
import axios from "axios";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editVendorId, setEditVendorId] = useState(null);

  const [newVendor, setNewVendor] = useState({
    libraryName: "",
    ownerName: "",
    pincode: "",
    address: "",
    city: "",
    totalSite: "",
    mobile: "",
    status: true,
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    fetchVendors();
  }, []);

  // ✅ All Vendors Fetch Function
  const fetchVendors = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
        setError("Authorization token is missing");
        setLoading(false);
        return;
    }
    console.log("token+++0",token)
    const authToken = `Bearer ${token.replace(/"/g, "").trim()}`;
    try {
        const resut = await axios.get(`${BASE_URL}/api/seller/allDetail`, {
          headers: {
            "Content-Type": "application/json",
           Authorization:  authToken, 
        },
        });
          console.log("a+++",resut.data)
  
        if (resut.data.status!==200) {
            // const errorData = await response.json(); 
            throw new Error("Failed to fetch vendors");
        }

        // const data = await response.json();
        // console.log(data); 
        // // Updated response handling logic
        if (!resut.data.data|| !Array.isArray(resut.data.data)) {
            throw new Error("No vendors found or invalid response format");
        }

        const formattedVendors = resut.data.data.map(vendor => ({
          _id: vendor._id,  // ✅ Ensure `_id` is mapped properly
          libraryName: vendor.libraryName,
          ownerName: vendor.ownerName,
          pincode: vendor.pincode,
          address: vendor.address,
          totalSite: vendor.totalSite,
          city: vendor.city,
          mobile: vendor.mobile,
          status: vendor.status
      }));
      
      

        setVendors(formattedVendors);

    } catch (error) {
        console.error("Error fetching vendors:", error);
        setError(error.message);
    } finally {
        setLoading(false);
    }
};


  // ✅ Add or Edit Vendor
  const handleAddVendor = async () => {
    if (
      !newVendor.ownerName ||
      !newVendor.mobile ||
      !newVendor.city ||
      !newVendor.libraryName
    ) {
      alert("Library Name, Owner Name, Mobile, and City are required!");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authorization token is missing");
        return;
      }
  
      const payload = {
        ...newVendor,
        totalSite: Number(newVendor.totalSite) || 0,
        pincode: newVendor.pincode.toString(),
        mobile: newVendor.mobile.toString(),
      };
  
      const url = editMode
        ? `${BASE_URL}/api/seller/detail/edit/${editVendorId}`
        : `${BASE_URL}/api/seller/detail/add`;
  
      const method = editMode ? "PUT" : "POST";
  
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.replace(/"/g, "").trim()}`,
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (!response.ok)
        throw new Error(result.message || `Failed to ${editMode ? "update" : "add"} vendor`);
  
      alert(`Vendor successfully ${editMode ? "updated" : "added"}!`);
      fetchVendors();
      resetForm();
    } catch (error) {
      console.error("Error in API:", error.message);
      alert(error.message);
    }
  };
  
  // ✅ Delete Vendor
const handleDeleteVendor = async (vendorId) => {
  if (!window.confirm("Are you sure you want to delete this vendor?")) return;

  try {
      const token = localStorage.getItem("token");
      if (!token) {
          alert("Authorization token is missing");
          return;
      }

      const url = `${BASE_URL}/api/seller/detail/delete/${vendorId}`;
      const response = await fetch(url, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token.replace(/"/g, "").trim()}`,
          },
      });

      if (!response.ok) throw new Error("Failed to delete vendor");

      alert("Vendor deleted successfully!");
      fetchVendors();
  } catch (error) {
      alert(error.message);
  }
};

// ✅ Toggle Status
const toggleStatus = async (vendorId, currentStatus) => {
  try {
      const token = localStorage.getItem("token");
      if (!token) {
          alert("Authorization token is missing");
          return;
      }

      const response = await fetch(
          `${BASE_URL}/api/seller/detail/status/${vendorId}`,
          {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token.replace(/"/g, "").trim()}`,
              },
              body: JSON.stringify({ status: !currentStatus }),
          }
      );

      if (!response.ok) throw new Error("Failed to update status");

      alert("Status updated successfully!");
      fetchVendors();
  } catch (error) {
      alert(error.message);
  }
};
// ✅ Edit Vendor
const handleEditVendor = (vendor) => {
  setNewVendor(vendor);
  setEditMode(true);
  setEditVendorId(vendor._id); 
  setShowForm(true);
};


  // ✅ Reset Form
  const resetForm = () => {
    setNewVendor({
      libraryName: "",
      ownerName: "",
      pincode: "",
      address: "",
      city: "",
      totalSite: "",
      mobile: "",
      status: true,
    });
    setShowForm(false);
    setEditMode(false);
    setEditVendorId(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Vendor Management</h1>

      <button
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md mb-4 hover:bg-blue-700"
        onClick={() => setShowForm(true)}
      >
        ➕ {editMode ? "Edit Vendor" : "Add Vendor"}
      </button>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold mb-3">
            {editMode ? "Edit Vendor" : "New Vendor"}
          </h2>
          {Object.keys(newVendor).map(
            (field) =>
              field !== "status" && (
                <input
                  key={field}
                  type={field === "totalSite" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="block p-2 my-2 w-full border rounded-lg"
                  value={newVendor[field]}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, [field]: e.target.value })
                  }
                />
              )
          )}
          <button
            className="bg-green-500 text-white px-5 py-2 rounded-lg mt-2 hover:bg-green-600"
            onClick={handleAddVendor}
          >
            ✅ {editMode ? "Update" : "Save"}
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 ml-2 rounded-lg mt-2 hover:bg-gray-500"
            onClick={resetForm}
          >
            ❌ Cancel
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-center">Loading vendors...</p>
      ) : error ? (
        <p className="text-center text-red-500">🚨 {error}</p>
      ) : (
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              {[
                "Library Name",
                "Owner Name",
                "Pincode",
                "Address",
                "City",
                "Total Seats",
                "Mobile",
                "Status",
                "Actions",
              ].map((header) => (
                <th key={header} className="p-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr
                key={vendor._id}
                className="border-b text-center hover:bg-gray-100"
              >
                {[
                  "libraryName",
                  "ownerName",
                  "pincode",
                  "address",
                  "city",
                  "totalSite",
                  "mobile",
                ].map((field) => (
                  <td key={field} className="p-4">
                    {vendor[field]}
                  </td>
                ))}
                <td className="p-4">
                  <button
                    className={`px-3 py-1 rounded-full text-white ${
                      vendor.status ? "bg-green-500" : "bg-red-500"
                    }`}
                    onClick={() => toggleStatus(vendor._id, vendor.status)}
                  >
                    {vendor.status ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-4">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg mx-1"
                    onClick={() => handleEditVendor(vendor)}
                  >
                    ✏️
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg mt-1"
                    onClick={() => handleDeleteVendor(vendor._id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Vendors;
