// ReportPage.jsx
import React, { useState } from 'react';

export default function ReportPage() {
  const initialReportData = [
    {
      id: '1',
      title: 'Network Outage',
      description: 'Network outage in Data Center A',
      status: 'Open',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: '2',
      title: 'Security Breach',
      description: 'Security breach on firewall',
      status: 'Investigating',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    // ... More report data
  ];

  const [reportData, setReportData] = useState(initialReportData);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reports</h2>
      <div className="flex flex-col">
        {reportData.map((report) => (
          <div key={report.id} className="border rounded p-4 mb-4">
            <h3 className="text-lg font-semibold">{report.title}</h3>
            <p>{report.description}</p>
            <p className="text-gray-500">{report.details}</p>
            <p className="mt-2">Status: {report.status}</p>
            <a href={`/reports/${report.id}`} className="text-blue-500 underline mt-2">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
