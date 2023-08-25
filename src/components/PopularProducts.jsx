import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

const networkIncidentReports = [
	{
		id: '382',
		incident_title: 'Server Downtime',
		incident_description: 'Experiencing downtime on multiple servers.',
		incident_severity: 'High',
		incident_status: 'Ongoing'
	},
	{
		id: '521',
		incident_title: 'Network Latency',
		incident_description: 'Users reporting slow internet speeds and network latency.',
		incident_severity: 'Medium',
		incident_status: 'Investigating'
	},
	{
		id: '732',
		incident_title: 'Security Breach',
		incident_description: 'Unusual activity detected, potential security breach.',
		incident_severity: 'Critical',
		incident_status: 'Resolved'
	},
	{
		id: '946',
		incident_title: 'Database Outage',
		incident_description: 'Database server is not responding, affecting services.',
		incident_severity: 'High',
		incident_status: 'Ongoing'
	},
	{
		id: '110',
		incident_title: 'Website Unavailable',
		incident_description: 'Users unable to access the website, getting 503 errors.',
		incident_severity: 'Medium',
		incident_status: 'Resolved'
	},
	{
		id: '206',
		incident_title: 'Email Service Disruption',
		incident_description: 'Email service is down, no incoming or outgoing emails.',
		incident_severity: 'High',
		incident_status: 'Investigating'
	}
];


function NetworkIncidentReports() {
	return (
		<div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
			<strong className="text-gray-700 font-medium">Network Incident Reports</strong>
			<div className="mt-4 flex flex-col gap-3">
				{networkIncidentReports.map((incident) => (
					<Link
						key={incident.id}
						to={`/incident/${incident.id}`}
						className="flex items-start hover:no-underline"
					>
						<div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
							{/* You can replace this with an appropriate icon or image for incidents */}
							<img
								className="w-full h-full object-cover rounded-sm"
								src={incident.thumbnailUrl} // Replace with the actual incident thumbnail if applicable
								alt={incident.incident_title}
							/>
						</div>
						<div className="ml-4 flex-1">
							<p className="text-sm text-gray-800">{incident.incident_title}</p>
							<span
								className={classNames(
									incident.incident_severity === 'Critical'
										? 'text-red-500'
										: incident.incident_severity === 'High'
										? 'text-orange-500'
										: 'text-gray-500',
									'text-xs font-medium'
								)}
							>
								{incident.incident_severity}
							</span>
						</div>
						<div className="text-xs text-gray-400 pl-1.5">{incident.incident_status}</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default NetworkIncidentReports
