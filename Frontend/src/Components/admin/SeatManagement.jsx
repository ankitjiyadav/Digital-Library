import React, { useState } from "react";

const SeatManagement = () => {
  const [seats, setSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(1);
  const [adminSeatName, setAdminSeatName] = useState("");
  const [logs, setLogs] = useState([]);
  const [selectedShift, setSelectedShift] = useState("Morning");

  const createSeat = () => {
    if (adminSeatName.trim() === "") return;

    const newSeat = {
      id: seatCount,
      name: adminSeatName,
      occupied: false,
      user: null,
      shift: null,
      timestamp: null,
    };

    setSeats([...seats, newSeat]);
    setLogs([{ id: logs.length + 1, action: `Seat ${seatCount} created`, time: new Date().toLocaleString() }, ...logs]);
    setSeatCount(seatCount + 1);
    setAdminSeatName("");
  };

  const toggleSeat = (id) => {
    const newSeats = seats.map((seat) =>
      seat.id === id
        ? {
            ...seat,
            occupied: !seat.occupied,
            user: seat.occupied ? null : "Library User",
            shift: seat.occupied ? null : selectedShift,
            timestamp: seat.occupied ? null : new Date().toLocaleString(),
          }
        : seat
    );

    setSeats(newSeats);
    const action = seats.find((s) => s.id === id).occupied
      ? `Seat ${id} freed`
      : `Seat ${id} assigned to Library User (${selectedShift})`;
    setLogs([{ id: logs.length + 1, action, time: new Date().toLocaleString() }, ...logs]);
  };

  const deleteSeat = (id) => {
    setSeats(seats.filter((seat) => seat.id !== id));
    setLogs([{ id: logs.length + 1, action: `Seat ${id} deleted`, time: new Date().toLocaleString() }, ...logs]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Seat Management</h2>

      {/* Admin Controls: Create Seat */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Enter Seat Name"
          className="p-2 border rounded w-2/3"
          value={adminSeatName}
          onChange={(e) => setAdminSeatName(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={selectedShift}
          onChange={(e) => setSelectedShift(e.target.value)}
        >
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={createSeat}
        >
          Create Seat
        </button>
      </div>

      {/* Seat Display (For Library Manager) */}
      <div className="grid grid-cols-5 gap-4">
        {seats.map((seat) => (
          <div key={seat.id} className="p-4 border rounded-xl text-center shadow-md">
            <p className="text-lg font-semibold">Seat {seat.name} (ID: {seat.id})</p>
            <p className={seat.occupied ? "text-red-500" : "text-green-500"}>
              {seat.occupied ? "Occupied" : "Available"}
            </p>
            {seat.user && <p className="text-sm">User: {seat.user}</p>}
            {seat.shift && <p className="text-sm">Shift: {seat.shift}</p>}
            {seat.timestamp && <p className="text-sm">Booked: {seat.timestamp}</p>}
            <button
              className={`mt-2 px-4 py-2 rounded-lg text-white ${
                seat.occupied ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={() => toggleSeat(seat.id)}
            >
              {seat.occupied ? "Free Up" : "Assign"}
            </button>
            <button
              className="mt-2 ml-2 px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
              onClick={() => deleteSeat(seat.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Logs Section */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">Logs & Reports</h3>
        <ul className="max-h-40 overflow-auto">
          {logs.map((log) => (
            <li key={log.id} className="text-sm border-b py-1">
              {log.time} - {log.action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeatManagement;