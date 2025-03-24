import React, { useState, useEffect } from "react";
import axios from "axios";

const Candidates = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    address: "",
    mobile: "",
    userId: "",
    id: '',
    libraryName: '',
    status: true,
  });
  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        console.log("✅ Token fetched successfully:", parsedToken);
        setToken(parsedToken);
      } catch (error) {
        console.error("❌ Invalid token format:", error);
      }
    } else {
      console.warn("⚠️ No token found in localStorage.");
    }
  }, []);

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const fetchLibraryDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/library/details`, { headers });
        const { libraryName, id } = response.data;
        setNewCandidate((prevCandidate) => ({ ...prevCandidate, libraryName, id }));
      } catch (error) {
        console.error("❌ Error fetching library details:", error);
      }
    };

    if (token) fetchLibraryDetails();
  }, [token]);

  const handleAddCandidate = async () => {
    console.log("🔐 Token before API call:", token);
    const formData = new FormData();
    Object.keys(newCandidate).forEach((key) => formData.append(key, newCandidate[key]));
    if (image) formData.append("idImage", image);

    try {
      const response = await axios.post(`${BASE_URL}/api/candidate/detail/add`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Candidate added successfully:", response.data);
      setCandidates([...candidates, response.data]);
      setNewCandidate({
        name: "",
        address: "",
        mobile: "",
        userId: "",
        libraryName: "",
        id: "",
        idImage: "",
        active: true,
      });
      setImage(null);
      setShowForm(false);
    } catch (error) {
      console.error("❌ Error adding candidate:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Candidate Management</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Add Candidate"}
      </button>

      {showForm && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-lg font-semibold mb-2">Add New Candidate</h2>
          {Object.keys(newCandidate).map(
            (field) =>
              field !== "active" && (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="block p-2 my-2 w-full"
                  value={newCandidate[field]}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      [field]: e.target.value,
                    })
                  }
                  readOnly={field === "id" || field === "libraryName"} // 🔒 Read-Only Fields
                />
              )
          )}

          <input
            type="file"
            className="block p-2 my-2 w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddCandidate}
          >
            Save
          </button>
        </div>
      )}

      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            {["Name", "Address", "Library Name", "Mobile", "ID Image", "Status"].map((header) => (
              <th key={header} className="p-3">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id} className="border-b text-center">
              <td className="p-3">{candidate.name}</td>
              <td className="p-3">{candidate.address}</td>
              <td className="p-3">{candidate.libraryName || "N/A"}</td>
              <td className="p-3">{candidate.mobile}</td>
              <td className="p-3">
                {candidate.idImage ? (
                  <img
                    src={`${BASE_URL}/${candidate.idImage}`}
                    alt="Candidate ID"
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    candidate.status ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {candidate.status ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidates;
