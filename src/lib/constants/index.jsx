import {
	HiOutlineViewGrid,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiOutlineDocumentReport,
	HiOutlineLocationMarker,
	HiOutlineBell
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'incidents',
		label: 'Incidents',
		path: '/incidents', // Change the path to the appropriate route for incidents
		icon: <HiOutlineBell /> // Use an appropriate icon for incidents
	},
	{
		key: 'reports',
		label: 'Reports', // Change the label to match the new context
		path: '/reports', // Change the path to the appropriate route for reports
		icon: <HiOutlineDocumentReport /> // Use an appropriate icon for reports
	},
	{
		key: 'locations',
		label: 'Locations', // Change the label to match the new context
		path: '/locations', // Change the path to the appropriate route for locations
		icon: <HiOutlineLocationMarker /> // Use an appropriate icon for locations
	},
	
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	// {
	// 	key: 'settings',
	// 	label: 'Settings',
	// 	path: '/settings',
	// 	icon: <HiOutlineCog />
	// },
	// {
	// 	key: 'support',
	// 	label: 'Help & Support',
	// 	path: '/support',
	// 	icon: <HiOutlineQuestionMarkCircle />
	// }
]
