import React, { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AuthContext from '../context/AuthContext';

// const data = [
//   {
//     name: 'Jan',
//     Incidents: 43
//   },
//   {
//     name: 'Feb',
//     Incidents: 27
//   },
//   {
//     name: 'Mar',
//     Incidents: 34
//   },
//   {
//     name: 'Apr',
//     Incidents: 21
//   },
//   {
//     name: 'May',
//     Incidents: 39
//   },
//   {
//     name: 'Jun',
//     Incidents: 28
//   },
//   {
//     name: 'July',
//     Incidents: 52
//   },
//   {
//     name: 'Aug',
//     Incidents: 37
//   },
//   {
//     name: 'Sep',
//     Incidents: 30
//   },
//   {
//     name: 'Oct',
//     Incidents: 44
//   },
//   {
//     name: 'Nov',
//     Incidents: 19
//   },
//   {
//     name: 'Dec',
//     Incidents: 25
//   }
// ];

export default function IncidentChart() {
  const [data, setData] = useState([])
  const {getAllIncidents} = useContext(AuthContext)
  useEffect(() => {
    getAllIncidents().then((data) => setData(data))
    
  }, [])
  console.log('this is', data);
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Incident Reports</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="status" fill="#d9534f" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
