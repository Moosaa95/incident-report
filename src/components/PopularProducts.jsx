import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';




function NetworkIncidentReports() {
	const [data, setData] = useState([]);
	const { getAllIncidents } = useContext(AuthContext);
  
	useEffect(() => {
	  getAllIncidents().then((data) => setData(data));
	}, [getAllIncidents]);
	return (
		<div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
			<strong className="text-gray-700 font-medium">Network Incident Reports</strong>
			<div className="mt-4 flex flex-col gap-3">
				{data && data.map((incident) => (
					<Link
						key={incident.id}
						to={`/incident/${incident.id}`}
						className="flex items-start hover:no-underline"
					>
						<div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
							{/* You can replace this with an appropriate icon or image for incidents */}
							{/* <img
								className="w-full h-full object-cover rounded-sm"
								src={incident.thumbnailUrl} // Replace with the actual incident thumbnail if applicable
								alt={incident.incident_title}
							/> */}
						</div>
						<div className="ml-4 flex-1">
							<p className="text-sm text-gray-800">{incident.title}</p>
							<span
								className={classNames(
									incident.severity === 'Critical'
										? 'text-red-500'
										: incident.severity === 'High'
										? 'text-orange-500'
										: 'text-gray-500',
									'text-xs font-medium'
								)}
							>
								{incident.severity}
							</span>
						</div>
						<div className="text-xs text-gray-400 pl-1.5">{incident.status}</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default NetworkIncidentReports
