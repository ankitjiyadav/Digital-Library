import React, { useState } from "react";

const Register = () => {
  const [role, setRole] = useState("Student");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    gender: "",
    address: "",
    city: "",
    pincode: "",
    email: "",
    password: "",
    aadhar: "",
    image: null,
    aadharCard: null,
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Form Submission with Validation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) {
      alert("First Name is required!");
      return;
    }
    if (!formData.email.includes("@")) {
      alert("Enter a valid Email!");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    alert("Registration Successful!");
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        
        {/* Left Side Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
            alt="Sample photo"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {role} Registration Form
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile No"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full mt-4"
            />

            <div className="flex items-center gap-4 mt-4">
              <p className="font-medium">Gender:</p>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="mr-2"
                /> Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="mr-2"
                /> Male
              </label>
            </div>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full mt-4"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full mt-4"
            />
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full mt-4"
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email ID"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full mt-4"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full mt-4"
            />
            <input
              type="text"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              placeholder="Aadhar Number"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 w-full mt-4"
            />

            {/* Upload Image and Aadharcard */}
            <div className="mt-4">
              <label className="block text-gray-700">Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Upload Aadharcard</label>
              <input
                type="file"
                name="aadharCard"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Select Role</label>
              <select
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Student">Student</option>
                <option value="Library Manager">Library Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg"
              >
                Submit Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
