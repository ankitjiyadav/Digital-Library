import React, { useState } from 'react';

const Candidates = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Amit Kumar", address: "Delhi, India", mobile: "9876543210", idProof: "Aadhar", vendorId: "VND123", document: "doc1.pdf", active: true },
    { id: 2, name: "Priya Sharma", address: "Mumbai, India", mobile: "8765432109", idProof: "PAN Card", vendorId: "VND456", document: "doc2.pdf", active: false },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: "", address: "", mobile: "", idProof: "", vendorId: "", document: "", active: true,
  });

  const handleAddCandidate = () => {
    setCandidates([...candidates, { ...newCandidate, id: candidates.length + 1 }]);
    setShowForm(false);
    setNewCandidate({ name: "", address: "", mobile: "", idProof: "", vendorId: "", document: "", active: true });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Candidate Management</h1>

      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowForm(true)}>Add Candidate</button>

      {showForm && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-lg font-semibold">New Candidate</h2>
          <input type="text" placeholder="Name" className="block p-2 my-2 w-full" onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })} />
          <input type="text" placeholder="Address" className="block p-2 my-2 w-full" onChange={(e) => setNewCandidate({ ...newCandidate, address: e.target.value })} />
          <input type="text" placeholder="Mobile" className="block p-2 my-2 w-full" onChange={(e) => setNewCandidate({ ...newCandidate, mobile: e.target.value })} />
          <input type="text" placeholder="ID Proof" className="block p-2 my-2 w-full" onChange={(e) => setNewCandidate({ ...newCandidate, idProof: e.target.value })} />
          <input type="text" placeholder="Vendor ID" className="block p-2 my-2 w-full" onChange={(e) => setNewCandidate({ ...newCandidate, vendorId: e.target.value })} />
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddCandidate}>Save</button>
        </div>
      )}

      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Address</th>
            <th className="p-3">Mobile</th>
            <th className="p-3">ID Proof</th>
            <th className="p-3">Vendor ID</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="border-b text-center">
              <td className="p-3">{candidate.name}</td>
              <td className="p-3">{candidate.address}</td>
              <td className="p-3">{candidate.mobile}</td>
              <td className="p-3">{candidate.idProof}</td>
              <td className="p-3">{candidate.vendorId}</td>
              <td className="p-3">
                <span className={`px-3 py-1 rounded-full text-white ${candidate.active ? 'bg-green-500' : 'bg-red-500'}`}>
                  {candidate.active ? 'Active' : 'Inactive'}
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