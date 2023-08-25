// SettingsPage.jsx
import React, { useState } from 'react';

export default function SettingsPage() {
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;
    setNotificationPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: checked,
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="border rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Notification Preferences</h3>
        <div className="flex flex-col">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              name="email"
              checked={notificationPreferences.email}
              onChange={handleNotificationChange}
            />
            <span className="ml-2">Email Notifications</span>
          </label>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              name="sms"
              checked={notificationPreferences.sms}
              onChange={handleNotificationChange}
            />
            <span className="ml-2">SMS Notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="push"
              checked={notificationPreferences.push}
              onChange={handleNotificationChange}
            />
            <span className="ml-2">Push Notifications</span>
          </label>
        </div>
      </div>
      {/* Add more settings options here */}
    </div>
  );
}
