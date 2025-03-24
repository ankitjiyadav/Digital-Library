import React, { useEffect, useState } from 'react';

const Seat = () => {
  const [seats, setSeats] = useState([]);

      // Fake data fetch (yeh aap API se bhi la sakte hain)
  useEffect(() => {
    const fetchSeats = async () => {
      // Example data
      const data = [
        { id: 1, number: "A101", status: "Available" },
        { id: 2, number: "A102", status: "Occupied" },
        { id: 3, number: "A103", status: "Available" },
      ];

      setSeats(data);

      // Alert for available seats
      const availableSeats = data.filter(seat => seat.status === "Available");
      if (availableSeats.length > 0) {
        alert(`🟢 ${availableSeats.length} seats are available.`);
      }
    };

    fetchSeats();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seat Management</h1>

      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="py-2 px-4">Seral Number</th>
            <th className="py-2 px-4">Seat Number</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {seats.map(seat => (
            <tr
              key={seat.id}
              className={`border-t ${seat.status === "Available" ? "bg-green-100" : "bg-red-100"}`}
            >
              <td className="py-2 px-4">{seat.number}</td>
              <td className="py-2 px-4">{seat.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Seat;
