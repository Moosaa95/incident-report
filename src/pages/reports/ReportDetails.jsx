// ReportDetailsPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function ReportDetailsPage() {
  const { reportId } = useParams(); // Get the report ID from the URL parameter

  // Replace this with actual data fetching logic for the specific report
  const reportData = {
    id: reportId,
    title: 'Network Outage',
    description: 'Network outage in Data Center A',
    status: 'Open',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Report Details</h2>
      <div className="border rounded p-4">
        <h3 className="text-lg font-semibold">{reportData.title}</h3>
        <p>{reportData.description}</p>
        <p className="text-gray-500">{reportData.details}</p>
        <p className="mt-2">Status: {reportData.status}</p>
      </div>
    </div>
  );
}
