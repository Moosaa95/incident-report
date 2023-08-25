import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { getOrderStatus } from '../lib/helpers'

const recentNetworkIncidents = [
	{
		id: '382',
		incident_title: 'Server Downtime',
		incident_description: 'Experiencing downtime on multiple servers.',
		incident_severity: 'High',
		incident_status: 'Ongoing',
		incident_date: '2022-08-15T10:30:00',
		incident_location: 'Data Center A'
	},
	{
		id: '521',
		incident_title: 'Network Latency',
		incident_description: 'Users reporting slow internet speeds and network latency.',
		incident_severity: 'Medium',
		incident_status: 'Investigating',
		incident_date: '2022-08-14T15:45:00',
		incident_location: 'Office Building B'
	},
	{
		id: '732',
		incident_title: 'Security Breach',
		incident_description: 'Unusual activity detected, potential security breach.',
		incident_severity: 'Critical',
		incident_status: 'Resolved',
		incident_date: '2022-08-10T09:20:00',
		incident_location: 'Headquarters'
	},
	// ... and so on for other incidents
];

const RecentNetworkIncidents = () => {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Recent Network Incidents</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Date</th>
              <th>Location</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {recentNetworkIncidents.map((incident) => (
              <tr key={incident.id}>
                <td>
                  <Link to={`/incident/${incident.id}`}>#{incident.id}</Link>
                </td>
                <td>{incident.incident_title}</td>
                <td>{incident.incident_severity}</td>
                <td>{incident.incident_status}</td>
                <td>{format(new Date(incident.incident_date), 'dd MMM yyyy')}</td>
                <td>{incident.incident_location}</td>
                <td>{incident.incident_description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentNetworkIncidents;

