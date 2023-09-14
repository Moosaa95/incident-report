import React, { useContext, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import AuthContext from '../context/AuthContext';

const COLORS = {
  ongoing: '#00C49F',
  investigating: '#FFBB28',
  resolved: '#FF8042',
};

export default function IncidentPieChart() {
  const [data, setData] = useState([]);
  const { getAllIncidents } = useContext(AuthContext);

  useEffect(() => {
    getAllIncidents().then((incidents) => {
      // Count incidents by status
      const statusCount = incidents.reduce((acc, incident) => {
        const { status } = incident;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      // Transform statusCount object into an array of objects for PieChart
      const pieChartData = Object.keys(statusCount).map((status) => ({
        name: status,
        value: statusCount[status],
      }));

      setData(pieChartData);
    });
  }, [getAllIncidents]);

  return (
    <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">Incidents</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
