import React, { useState } from 'react';

export default function Incidents() {
  const initialIncidentData = [
    {
      id: '1',
      date: '2023-08-15',
      description: 'Network outage in Data Center A',
      status: 'Open'
    },
    {
      id: '2',
      date: '2023-08-18',
      description: 'Security breach on firewall',
      status: 'Investigating'
    },
    // ... More incident data
  ];

  const [incidentData, setIncidentData] = useState(initialIncidentData);

  const handleStatusChange = (incidentId, newStatus) => {
    const updatedIncidentData = incidentData.map((incident) =>
      incident.id === incidentId ? { ...incident, status: newStatus } : incident
    );
    setIncidentData(updatedIncidentData);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Incident Reports</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">ID</th>
              <th className="py-2">Date</th>
              <th className="py-2">Description</th>
              <th className="py-2">Status</th>
              <th className="py-2">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {incidentData.map((incident) => (
              <tr key={incident.id} className="border-b">
                <td className="py-3">{incident.id}</td>
                <td className="py-3">{incident.date}</td>
                <td className="py-3">{incident.description}</td>
                <td className="py-3">{incident.status}</td>
                <td className="py-3">
                  <select
                    value={incident.status}
                    onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Investigating">Investigating</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
