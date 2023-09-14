import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const RecentNetworkIncidents = () => {
  const [data, setData] = useState([]);
  const { getAllIncidents } = useContext(AuthContext);

  useEffect(() => {
    getAllIncidents().then((data) => setData(data));
  }, [getAllIncidents]);

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
              {/* <th>Location</th> */}
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((incident) => (
              <tr key={incident.id}>
                <td>
                  <Link to={`/incident/${incident.id}`}>#{incident.id}</Link>
                </td>
                <td>{incident.title}</td>
                <td>{incident.severity}</td>
                <td>{incident.status}</td>
                <td>{format(new Date(incident.date_created), 'dd MMM yyyy')}</td>
                {/* <td>{incident.location}</td> */}
                <td>{incident.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentNetworkIncidents;
