import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",  // ✅ ID Field Added
    name: "",
    lastName: "",
    mobile: "",
    gender: "",
    address: "",
    city: "",
    pincode: "",
    email: "",
    password: "",
    role: "", // Multiple roles ke liye array
    image: null,
    aadhar: null,
  });

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Role Change Handler (Multiple Selection)
  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      role: value,  // ✅ Directly set role as a string
    }));
  };
  

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    if (!formData.id.trim()) return alert("ID is required!");
    if (!formData.name.trim()) return alert("Name is required!");
    if (!formData.email.includes("@")) return alert("Enter a valid Email!");
    if (formData.password.length < 8) return alert("Password must be at least 8 characters long!");
    if (formData.role.length === 0) return alert("Select at least one role!");
  
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "role") {
          formDataToSend.append(key, formData[key]);  // ✅ Role को सीधे String के रूप में भेजें
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      console.log("Sending Role as String:", formDataToSend.get("role")); // Debugging
  
      const response = await axios.post(
        `${BASE_URL}/api/registration`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (response.status === 201) {
        alert("Registration Successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error);
      alert("Registration failed. Please try again.");
    }
  };
  

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        
        {/* Left Side Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
            alt="Sample"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h3>

          <form onSubmit={handleSubmit}>
            <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="User ID" className="border p-3 rounded-lg w-full mt-4"/>  {/* ✅ ID Field Added */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="First Name" className="border p-3 rounded-lg w-full"/>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="border p-3 rounded-lg w-full"/>
            </div>

            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile No" className="border p-3 rounded-lg w-full mt-4"/>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-3 rounded-lg w-full mt-4"/>
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="border p-3 rounded-lg w-full mt-4"/>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="border p-3 rounded-lg w-full mt-4"/>
            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-3 rounded-lg w-full mt-4"/>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="border p-3 rounded-lg w-full mt-4"/>

            {/* Gender Selection */}
            <div className="flex items-center gap-4 mt-4">
              <p className="font-medium">Gender:</p>
              {["Male", "Female", "Transgender"].map((gender) => (
                <label key={gender} className="flex items-center">
                  <input type="radio" name="gender" value={gender.toLowerCase()} checked={formData.gender === gender.toLowerCase()} onChange={handleChange} className="mr-2"/>
                  {gender}
                </label>
              ))}
            </div>

            {/* Role Selection */}
            <div className="mt-4">
              <label className="block text-gray-700">Select Role</label>
              <div className="flex gap-4">
                {["user", "admin", "library"].map((role) => (
                  <label key={role} className="flex items-center">
                    <input type="checkbox" value={role} checked={formData.role.includes(role)} onChange={handleRoleChange} className="mr-2"/>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Upload Image and Aadhar */}
            <div className="mt-4">
              <label className="block text-gray-700">Upload Profile Image</label>
              <input type="file" name="image" onChange={handleChange} className="w-full p-2 border rounded-lg"/>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Upload Aadhar</label>
              <input type="file" name="aadhar" onChange={handleChange} className="w-full p-2 border rounded-lg"/>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center gap-4 mt-6">
              <button type="submit" className="bg-yellow-500 text-white px-6 py-2 rounded-lg">Submit Form</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
