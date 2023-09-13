import React, { useContext, useEffect, useState } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart, IoAlertCircleOutline, IoCheckmarkDoneOutline, IoPersonCircleOutline, IoTimeOutline } from 'react-icons/io5'
import AuthContext from '../context/AuthContext';

export default function DashboardStatsGrid() {
	const [data, setData] = useState([])

	const {getDashboard} = useContext(AuthContext)
	useEffect(() => {
        getDashboard().then((data) => setData(data))
    }, [])

	console.log('dahboard', data);

	return (
	  <div className="flex flex-col gap-4 md:flex-row">
		<BoxWrapper icon={<IoAlertCircleOutline />} bgColor="bg-sky-500">
		  <span className="text-sm font-bold text-white">Total Incidents</span>
		  <div className="flex items-center">
			<strong className="text-xl font-semibold text-gray-700">{data && data.total_incidents}</strong>
			{/* <span className="pl-2 text-sm text-green-500">+343</span> */}
		  </div>
		</BoxWrapper>
		<BoxWrapper icon={<IoCheckmarkDoneOutline />} bgColor="bg-orange-600">
		  <span className="text-sm font-bold text-white">Incidents Resolved</span>
		  <div className="flex items-center">
			<strong className="text-xl font-semibold text-gray-700">{data && data.resolved_incidents}</strong>
			{/* <span className="pl-2 text-sm text-green-500">-343</span> */}
		  </div>
		</BoxWrapper>
		<BoxWrapper icon={<IoPersonCircleOutline />} bgColor="bg-yellow-400">
		  <span className="text-sm font-bold text-white">Total Users</span>
		  <div className="flex items-center">
			<strong className="text-xl font-semibold text-gray-700">{data && data.total_users}</strong>
			<span className="pl-2 text-sm text-red-500">-30</span>
		  </div>
		</BoxWrapper>
		<BoxWrapper icon={<IoTimeOutline />} bgColor="bg-green-600">
		  <span className="text-sm font-bold text-white">Pending Incidents</span>
		  <div className="flex items-center">
			<strong className="text-xl font-semibold text-gray-700">{data && data.pending_incidents}</strong>
			<span className="pl-2 text-sm text-red-500">-43</span>
		  </div>
		</BoxWrapper>
	  </div>
	);
  }
  function BoxWrapper({ children, icon, bgColor }) {
	return (
	  <div className={`bg-white rounded-sm p-4 border border-gray-200 flex items-center ${bgColor} md:flex-1 md:max-w-[calc(25%-1rem)]`}>
		<div className="flex items-center justify-center w-12 h-12 text-white rounded-full">
		  {icon}
		</div>
		<div className="pl-4">
		  {children}
		</div>
	  </div>
	);
  }

  
  
  
  
  
