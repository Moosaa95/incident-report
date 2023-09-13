// ReportPage.jsx
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'

export default function ReportPage() {
    const initialReportData = [
        {
            id: '1',
            title: 'Network Outage',
            description: 'Network outage in Data Center A',
            status: 'Open',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
        },
        {
            id: '2',
            title: 'Security Breach',
            description: 'Security breach on firewall',
            status: 'Investigating',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
        }
        // ... More report data
    ]
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newReport, setNewReport] = useState({
        // date: '',
        description: '',
        status: 'ongoing',
        title: '',
        incident: '',
        detail: ''
    })

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen) // Step 2
        setNewReport({
            description: '',
            status: 'ongoing',
            title: '',
            incident: '',
            detail: ''
        })
    }
    const STATUS_CHOICES = {
        ongoing: 'Ongoing',
        investigating: 'Investigating',
        resolved: 'Resolved'
    }

    const [reportData, setReportData] = useState([])
    const [incidentData, setIncidentData] = useState([])
    
    const { createReport, getAllReports, editReport, deleteReport, getAllIncidents } = useContext(AuthContext)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewReport((prevReport) => ({
            ...prevReport,
            [name]: value
        }))
    }

    const handleAddReport = async () => {
        // const nextId = getNextId()
        // const newIncidentWithId = { ...newIncident, id: nextId }
        // setIncidentData([...incidentData, newIncidentWithId])
        // setNewIncident({ date: '', description: '', status: 'Open' })
        // toggleModal()
        try {
            await createReport(newReport)
            setNewReport({
                description: '',
                status: 'ongoing',
                title: '',
                incident: '',
                detail: ''
            })
            setIsModalOpen(false)
            getAllReports().then((data) => setReportData(data))
            getAllIncidents().then((data) => setIncidentData(data))
        } catch (error) {
            console.error('Error creating report', error)
        }
    }

    useEffect(() => {
        // Fetch reports when the component mounts
        getAllReports().then((data) => {
            setReportData(data)
        })
        getAllIncidents().then((data) => setIncidentData(data))
    }, [getAllReports])

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Reports</h2>
            <button className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={toggleModal}>
                Add Report
            </button>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="p-8 transition-transform duration-300 ease-in-out transform scale-100 bg-white rounded-lg shadow-lg">
                        <h3 className="mb-4 text-2xl font-semibold">Add New Report</h3>

                        <form>
                            {/* <div className="mb-4">
                                <label>Date:</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={newIncident.date}
                                    onChange={(e) => setNewIncident({ ...newIncident, date: e.target.value })}
                                    required
                                />
                            </div> */}
                            <div className="mb-4">
                                <label>title:</label>
                                <input
                                    name="title"
                                    type="text"
                                    value={newReport.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label>Description:</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    value={newReport.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label>Incident:</label>
                                <select name="incident" value={newReport.incident} onChange={handleInputChange}>
                                    {incidentData &&
                                        incidentData.map((incident) => (
                                            <option key={incident.id} value={incident.id}>
                                                {incident.title}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label>Status:</label>
                                <select name="status" value={newReport.status} onChange={handleInputChange}>
                                    {Object.entries(STATUS_CHOICES).map(([key, label]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={toggleModal}
                                className="px-4 py-2 mr-2 text-gray-600 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleAddReport}
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="flex flex-col">
                {reportData.map((report) => (
                    <div key={report.id} className="border rounded p-4 mb-4">
                        <h3 className="text-lg font-semibold">{report.title}</h3>
                        <p>{report.description}</p>
                        <p className="text-gray-500">{report.details}</p>
                        <p className="mt-2">Status: {report.status}</p>
                        <a href={`/reports/${report.id}`} className="text-blue-500 underline mt-2">
                            View Details
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}
