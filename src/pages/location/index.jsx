// LocationPage.jsx
import React from 'react';

export default function LocationPage() {
  const locations = [
    {
      id: '1',
      name: 'Headquarters',
      address: '123 Main St, City A',
      contact: 'John Doe - (123) 456-7890',
    },
    {
      id: '2',
      name: 'Branch Office',
      address: '456 Elm St, City B',
      contact: 'Jane Smith - (987) 654-3210',
    },
    // ... More location data
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Locations</h2>
      <div className="flex flex-col">
        {locations.map((location) => (
          <div key={location.id} className="border rounded p-4 mb-4">
            <h3 className="text-lg font-semibold">{location.name}</h3>
            <p>{location.address}</p>
            <p>{location.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
