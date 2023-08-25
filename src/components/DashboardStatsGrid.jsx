import React from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart, IoAlertCircleOutline, IoCheckmarkDoneOutline, IoPersonCircleOutline, IoTimeOutline } from 'react-icons/io5'

export default function DashboardStatsGrid() {
	return (
	  <div className="flex flex-col md:flex-row gap-4">
		<BoxWrapper icon={<IoAlertCircleOutline />} bgColor="bg-sky-500">
		  <span className="text-sm text-white font-bold">Total Incidents</span>
		  <div className="flex items-center">
			<strong className="text-xl text-gray-700 font-semibold">54232</strong>
			{/* <span className="text-sm text-green-500 pl-2">+343</span> */}
		  </div>
		</BoxWrapper>
		<BoxWrapper icon={<IoCheckmarkDoneOutline />} bgColor="bg-orange-600">
		  <span className="text-sm text-white font-bold">Incidents Resolved</span>
		  <div className="flex items-center">
			<strong className="text-xl text-gray-700 font-semibold">423</strong>
			{/* <span className="text-sm text-green-500 pl-2">-343</span> */}
		  </div>
		</BoxWrapper>
		<BoxWrapper icon={<IoPersonCircleOutline />} bgColor="bg-yellow-400">
		  <span className="text-sm text-white font-bold">Total Users</span>
		  <div className="flex items-center">
			<strong className="text-xl text-gray-700 font-semibold">12313</strong>
			<span className="text-sm text-red-500 pl-2">-30</span>
		  </div>
		</BoxWrapper>
		<BoxWrapper icon={<IoTimeOutline />} bgColor="bg-green-600">
		  <span className="text-sm text-white font-bold">Pending Incidents</span>
		  <div className="flex items-center">
			<strong className="text-xl text-gray-700 font-semibold">16432</strong>
			<span className="text-sm text-red-500 pl-2">-43</span>
		  </div>
		</BoxWrapper>
	  </div>
	);
  }
  function BoxWrapper({ children, icon, bgColor }) {
	return (
	  <div className={`bg-white rounded-sm p-4 border border-gray-200 flex items-center ${bgColor} md:flex-1 md:max-w-[calc(25%-1rem)]`}>
		<div className="rounded-full h-12 w-12 flex items-center justify-center text-white">
		  {icon}
		</div>
		<div className="pl-4">
		  {children}
		</div>
	  </div>
	);
  }

  
  
  
  
  
