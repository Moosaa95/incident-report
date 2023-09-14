// ProfilePage.jsx
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'

export default function ProfilePage() {
    const { changePassword, editUserProfile, getUsers, user, getUserDetail } = useContext(AuthContext)
    const [passwordError, setPasswordError] = useState(null)
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        // username: ''
        // Add more user data fields as needed
    })

    useEffect(() => {
        // Fetch user data and prefill the state
        const fetchUserData = async (user_id) => {
            try {
                const user = await getUserDetail(user_id) // Assuming this function returns the user's data
                setUserData({
                    first_name: user.first_name || '',
                    last_name: user.last_name || '',
                    address: user.address || '',
                    // username: user.username || ''
                    // Add more user data fields as needed
                })
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }
        fetchUserData(user?.user_id)
    }, [getUserDetail])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: ''
        // confirmPassword: '',
    })

    const handlePasswordChange = (event) => {
        const { name, value } = event.target
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    console.log('this is user', user)

    // const handlePasswordSubmit = (event) => {
    //   event.preventDefault();
    //   // Implement logic to change password
    //   console.log('Password changed:', passwordData);
    // };
    const handlePasswordSubmit = async (event) => {
        event.preventDefault()

        try {
            // Call the changePassword function with passwordData
            await changePassword(passwordData)

            // Clear password fields after successful change
            setPasswordData({
                old_password: '',
                new_password: ''
                // confirmPassword: '',
            })
            setPasswordError('')

            console.log('Password changed successfully')
        } catch (error) {
            console.log(error, 'errrrrr')
            if (error.response && error.response.data) {
                // If the error has a response with data, check if it contains password-related errors
                const responseData = error.response.data
                if (responseData.old_password) {
                    // If the "old_password" field is present in the response data, set the error message
                    setPasswordError(responseData.old_password[0])
                } else {
                    // Handle other errors here if needed
                    // For example, you can display a generic error message
                    console.error('Error changing password:', error)
                }
            } else {
                // Handle other errors here if needed
                // For example, you can display a generic error message
                setPasswordError('incorrect current password')
                console.error('Error changing password:', error)
            }
        }
    }

    const handleImageChange = (event) => {
        // Implement logic to change profile image
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            // Call the editUserProfile function with userData
            await editUserProfile(userData)

            console.log('User data updated successfully')
        } catch (error) {
            console.error('Error editing user profile:', error)
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            <div className="border rounded p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={userData.first_name}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={userData.last_name}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    {/* <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                  */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={userData.address}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                    </div> 
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Save Changes
                    </button>
                </form>
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Profile</h2>
                <div className="border rounded p-4">
                    <form onSubmit={handlePasswordSubmit}>
                        {/* ... Profile info inputs */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Current Password</label>
                            <input
                                type="password"
                                name="old_password"
                                value={passwordData.old_password}
                                onChange={handlePasswordChange}
                                className="w-full border rounded p-2"
                            />
                            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">New Password</label>
                            <input
                                type="password"
                                name="new_password"
                                value={passwordData.new_password}
                                onChange={handlePasswordChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        {/* <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded p-2"
            />
          </div> */}
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Change Password
                        </button>
                    </form>
                </div>
                {/* <div className="border rounded p-4 mt-4">
                    <h3 className="text-lg font-semibold mb-2">Profile Image</h3>
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    
                </div> */}
            </div>
        </div>
    )
}
