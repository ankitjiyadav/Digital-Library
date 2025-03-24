import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Footer from "./Components/Footer";
import Dashboard from "./Components/admin/Dashboard";
import SeatManagement from "./Components/admin/SeatManagement";
import Admin from "./Components/Admin";
import Fees from "./Components/admin/Fees";
import Reports from "./Components/admin/Reports";
import Vendors from "./Components/admin/Vendars";
import Candidates from "./Components/admin/Candidates"
import User from "./Components/User";
import Library from "./Components/Library";
import Seat from "./Components/library/Seat";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashbord" element={<Dashboard/>} />
        <Route path="/seatmanagement" element={<SeatManagement/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/fees" element={<Fees/>} />
        <Route path="/reporsts" element={<Reports/>} />
        <Route path="/vendors" element={<Vendors/>} />
        <Route path="/candidates" element={<Candidates/>} />
        <Route path="/user" element={<User/>}/>
        <Route path="/library" element={<Library/>}/>
        <Route path="/seat" element={<Seat/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
