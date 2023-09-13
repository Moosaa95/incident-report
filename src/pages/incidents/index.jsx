import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'

export default function Incidents() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newIncident, setNewIncident] = useState({
        // date: '',
        description: '',
        status: 'ongoing',
        title: '',
        severity: 'high',
        location: '',
        user: ''
    })
    const [selectedIncident, setSelectedIncident] = useState(null)
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
    

    const {createIncident, getAllIncidents, editIncident, deleteIncident, getAllLocations, getUsers} = useContext(AuthContext)

    const getNextId = () => {
        const maxId = Math.max(...incidentData.map((incident) => incident.id), 0)
        return maxId + 1
    }
    console.log('insdient')
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen) // Step 2
        setNewIncident({
            description: '',
            status: 'ongoing',
            title: '',
            severity: 'high',
            location: '',
            user: ''
          });
    }
    const SEVERITY_CHOICES = {
        high: 'High',
        medium: 'Medium',
        critical: 'Critical'
    }

    const STATUS_CHOICES = {
        ongoing: 'Ongoing',
        investigating: 'Investigating',
        resolved: 'Resolved'
    }
    // const handleAddIncident = (newIncident) => {
    //   setIncidentData([...incidentData, newIncident]);
    //   toggleModal(); // Close the modal after adding an incident
    // };
    const handleAddIncident = async() => {
        const nextId = getNextId()
        // const newIncidentWithId = { ...newIncident, id: nextId }
        // setIncidentData([...incidentData, newIncidentWithId])
        // setNewIncident({ date: '', description: '', status: 'Open' })
        // toggleModal()
        try {
            await createIncident(newIncident);
            setNewIncident({title : '', location: '', severity: '', status: '', description: '', user:''})
            setIsModalOpen(false)
            getAllIncidents().then((data) => setIncidentData(data))

        }catch (error){
            console.error('Error creating Incident', error)
        }
    }

    useEffect(() => {
        getAllIncidents().then((data) => setIncidentData(data))
      getAllLocations().then((data) => setLocations(data));
      getUsers().then((data) => setUsers(data));
    }, [getAllIncidents])

    const handleEditIncident = (incidentId) => {
        setSelectedIncident(incidentId)
        toggleModal()
    }

    const handleDeleteIncident = (incidentId) => {
        const updatedIncidentData = incidentData.filter((incident) => incident.id !== incidentId)
        setIncidentData(updatedIncidentData)
    }

    const [incidentData, setIncidentData] = useState([])

    const handleStatusChange = (incidentId, newStatus) => {
        const updatedIncidentData = incidentData.map((incident) =>
            incident.id === incidentId ? { ...incident, status: newStatus } : incident
        )
        setIncidentData(updatedIncidentData)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewIncident((prevIncident) => ({
          ...prevIncident,
          [name]: value,
        }));
      };

    return (
        <div>
            <h2 className="mb-4 text-2xl font-semibold">Incident Reports</h2>
            <button className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={toggleModal}>
                Add Incident
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="p-8 transition-transform duration-300 ease-in-out transform scale-100 bg-white rounded-lg shadow-lg">
                        <h3 className="mb-4 text-2xl font-semibold">Add New Incident</h3>

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
                                    value={newIncident.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label>Description:</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    value={newIncident.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label>Location:</label>
                                <select name="location" value={newIncident.location} onChange={handleInputChange}>
                                    {locations && locations.map(location => (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label>User:</label>
                                <select name="location" value={newIncident.user} onChange={handleInputChange}>
                                    {users && users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.email}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label>Severity:</label>
                                <select name="severity" value={newIncident.severity} onChange={handleInputChange}>
                                    {Object.entries(SEVERITY_CHOICES).map(([key, label]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label>Status:</label>
                                <select name="status" value={newIncident.status} onChange={handleInputChange}>
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
                                onClick={handleAddIncident}
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2">ID</th>
                            <th className="py-2">Date</th>
                            <th className="py-2">Description</th>
                            <th className="py-2">Status</th>
                            {/* <th className="py-2">Change Status</th> */}
                            <th className="py-2">User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidentData.map((incident) => (
                            <tr key={incident.id} className="border-b">
                                <td className="py-3">{incident.id}</td>
                                <td className="py-3">{incident.date_created}</td>
                                <td className="py-3">{incident.description}</td>
                                <td className="py-3">{incident.status}</td>
                                <td className="py-3">{incident.reporter}</td>
                                {/* <td className="py-3">
                                    <select
                                        value={incident.status}
                                        onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                                    >
                                        <option value="Open">Open</option>
                                        <option value="Investigating">Investigating</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </td> */}
                                <td className="py-3">
                                    <button
                                        className="mr-2 text-blue-500 hover:underline"
                                        onClick={() => handleEditIncident(incident.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDeleteIncident(incident.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
