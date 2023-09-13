// LocationPage.jsx
import React, { useContext, useEffect, useState } from 'react';
// import Modal from 'react-modal'; // Import react-modal
import AuthContext from '../../context/AuthContext';
import "./location.css"

export default function LocationPage() {
  const [locations, setLocations] = useState([]);
  const {createLocation, getAllLocations, editLocation, deleteLocation} = useContext(AuthContext)
  
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  const [newLocation, setNewLocation] = useState({
    name: '',
    address: '',
    contact: '',
  });

  const handleCreateLocation = async () => {
    try {
      await createLocation(newLocation); // Call the createLocation function from context
      setNewLocation({ name: '', address: '', contact: '' }); // Clear the form fields
      setIsModalOpen(false); // Close the modal
      // After creating a location, you might want to refresh the list of locations
      getAllLocations().then((data) => setLocations(data));
    } catch (error) {
      console.error('Error creating location:', error);
    }
  };

  useEffect(() => {
    // Fetch the initial list of locations when the component mounts
    getAllLocations().then((data) => setLocations(data));
  }, [getAllLocations]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Locations</h2>
      <button onClick={() => setIsModalOpen(true)}>Add Location</button>
      <div className="flex flex-col">
        {locations.map((location) => (
          <div key={location.id} className="p-4 mb-4 border rounded">
            <h3 className="text-lg font-semibold">{location.name}</h3>
            <p>{location.address}</p>
            {/* <p>{location.contact}</p> */}
          </div>
        ))}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Location</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newLocation.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={newLocation.address}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={newLocation.contact}
              onChange={handleInputChange}
            />
            <button onClick={handleCreateLocation}>Create Location</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
