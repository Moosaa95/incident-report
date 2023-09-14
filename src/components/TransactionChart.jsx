import React, { useContext, useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import AuthContext from '../context/AuthContext'

export default function IncidentChart() {
    const [data, setData] = useState([])
    const { getAllIncidents } = useContext(AuthContext)

    useEffect(() => {
        getAllIncidents().then((incidents) => {
            // Count incidents by status
            const statusCount = incidents.reduce((acc, incident) => {
                const { status } = incident
                acc[status] = (acc[status] || 0) + 1
                return acc
            }, {})

            // Transform statusCount object into an array of objects for BarChart
            const barChartData = Object.keys(statusCount).map((status) => ({
                status,
                count: statusCount[status]
            }))

            setData(barChartData)
        })
    }, [getAllIncidents])

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
                        <XAxis dataKey="status" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#d9534f" name="Incident Count" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
