import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("student");
  const [loginType, setLoginType] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
      alert("OTP sent to " + mobile);
      // यहां पर OTP भेजने की API कॉल करें
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-center py-10 px-4 md:px-10">
        <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image"
            className="w-full max-w-sm"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-center text-xl font-bold mb-4">Login as</h2>
          <div className="flex justify-center space-x-4 mb-4">
            <button 
              className={`px-4 py-2 rounded-md ${loginType === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
              onClick={() => setLoginType("email")}>Email</button> <p>OR</p>
            <button 
              className={`px-4 py-2 rounded-md ${loginType === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
              onClick={() => setLoginType("mobile")}>Mobile</button>
          </div>

          {loginType === "email" ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Email address</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-700">Mobile Number</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your mobile number"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {!otpSent && (
                <button
                  className="w-full bg-green-500 text-white p-2 rounded-lg mt-2 hover:bg-green-600"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              )}
              {otpSent && (
                <div className="mt-4">
                  <label className="block text-gray-700">Enter OTP</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter OTP"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700">Select Role</label>
            <select 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="library_manager">Library Manager</option>
            </select>
          </div>

          <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
            Login as {role.replace("_", " ")}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? {" "}
            <Link to="/register" className="text-red-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;