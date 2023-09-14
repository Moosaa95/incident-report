import React, { createContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const server = 'http://localhost:8080'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    console.log('autho')
    const navigate = useNavigate()
    const [authTokens, setAuthTokens] = useState(() => {
        const storedTokens = localStorage.getItem('authTokens')
        return storedTokens ? JSON.parse(storedTokens) : null
    })

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (authTokens) {
            try {
                const decodedToken = jwt_decode(authTokens.access)
                setUser(decodedToken)
            } catch (error) {
                console.log('Invalid token specified:', error.message)
                setUser(null) // Set user to null if decoding fails
            }
        } else {
            setUser(null) // Clear user if no authTokens
        }
    }, [authTokens])

    const loginUser = async (email, password) => {
        console.log('login', email, password)
        try {
            const response = await fetch(`${server}/user/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            console.log(response, 'pop')
            if (response.status == '200') {
                const data = await response.json()
                localStorage.setItem('authTokens', JSON.stringify(data))
                setAuthTokens(data)
                const decodedToken = jwt_decode(data.access)
                localStorage.setItem('authToken', decodedToken)
                toast.success('login successful')
                setUser(decodedToken)
                navigate('/')
            } else {
                console.log('Login failed')
                toast.error('Login failed')
            }
        } catch (error) {
            console.log('Something went wrong during login', error)
        }
    }

    //   const registerUser = async (
    //     email,
    //     user_name,
    //     password,
    //     password2,
    //     usertype,
    //     state
    //   ) => {
    //     try {
    //       if (password !== password2) {
    //         // toast.error("Passwords do not match");
    //         return;
    //       }

    //       const response = await fetch(
    //         `${server}/accounts/api/register/`,
    //         {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             email,
    //             user_name,
    //             password,
    //             password2,
    //             state,
    //             usertype,
    //           }),
    //         }
    //       );

    //       if (response.ok) {
    //         const data = await response.json();
    //         if (data) {
    //         //   toast.success(data.message);
    //         }
    //         // loginUser(email, password); // Automatically log in the user after successful registration
    //       } else {
    //         console.log("Registration failed");
    //         // toast.error("Registration Failed")
    //       }
    //     } catch (error) {
    //       console.log("Something went wrong during registration", error);
    //     }
    //   };

    //   const fetchCategories = async () => {
    //     try {
    //       const response = await fetch(
    //         `${server}/accounts/categories/`,
    //         {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );

    //       if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       }

    //       const data = await response.json();
    //       return data;
    //     } catch (error) {
    //       console.error("Error fetching categories:", error);
    //       return null;
    //     }
    //   };

    const createLocation = async (locationData) => {
        try {
            const response = await fetch(`${server}/user/locations/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(locationData)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error creating location:', error)
            throw error // Rethrow the error to handle it in the calling code
        }
    }

    // Function to get a location by its ID
    const getLocation = async (locationId) => {
        try {
            const response = await fetch(`${server}/user/locations/${locationId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error getting location:', error)
            throw error
        }
    }

    // Function to update a location by its ID
    const updateLocation = async (locationId, updatedLocationData) => {
        try {
            const response = await fetch(`${server}/user/locations/${locationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedLocationData)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error updating location:', error)
            throw error
        }
    }

    // Function to delete a location by its ID
    const deleteLocation = async (locationId) => {
        try {
            const response = await fetch(`${server}/user/locations/${locationId}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            // Successful deletion, no data to return
            return null
        } catch (error) {
            console.error('Error deleting location:', error)
            throw error
        }
    }

    const getAllLocations = async () => {
        try {
            const response = await fetch(`${server}/user/locations/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error getting all locations:', error)
            throw error
        }
    }

    // Function to get all incidents
    const getAllIncidents = async () => {
        try {
            const response = await fetch(`${server}/user/incidents/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error getting all incidents:', error)
            throw error
        }
    }

    // Function to get an incident by ID
    const getIncidentById = async (incidentId) => {
        try {
            const response = await fetch(`${server}/user/incidents/${incidentId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error(`Error getting incident by ID (${incidentId}):`, error)
            throw error
        }
    }

    // Function to edit an incident
    const editIncident = async (incidentId, updatedIncidentData) => {
        try {
            const response = await fetch(`${server}/user/incidents/${incidentId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedIncidentData)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error(`Error editing incident (${incidentId}):`, error)
            throw error
        }
    }

    // Function to delete an incident by ID
    const deleteIncident = async (incidentId) => {
        try {
            const response = await fetch(`${server}/user/incidents/${incidentId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            return true // Indicates successful deletion
        } catch (error) {
            console.error(`Error deleting incident (${incidentId}):`, error)
            throw error
        }
    }

    const createIncident = async (incidentData) => {
        try {
            const response = await fetch(`${server}/user/incidents/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(incidentData)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error creating incident:', error)
            throw error
        }
    }


    // reports 
    // Function to get all reports
    const getAllReports = async () => {
        try {
            const response = await fetch(`${server}/user/reports/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error getting all reports:', error)
            throw error
        }
    }

    // Function to get an report by ID
    const getReportById = async (reportId) => {
        try {
            const response = await fetch(`${server}/user/reports/${reportId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error(`Error getting report by ID (${reportId}):`, error)
            throw error
        }
    }

    // Function to edit an report
    const editReport = async (reportId, updatedReportData) => {
        try {
            const response = await fetch(`${server}/user/reports/${reportId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedReportData)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error(`Error editing report (${reportId}):`, error)
            throw error
        }
    }

    // Function to delete an incident by ID
    const deleteReport = async (reportId) => {
        try {
            const response = await fetch(`${server}/user/reports/${reportId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            return true // Indicates successful deletion
        } catch (error) {
            console.error(`Error deleting report (${reportId}):`, error)
            throw error
        }
    }

    const createReport = async (reportData) => {
        try {
            const response = await fetch(`${server}/user/reports/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reportData)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error creating report:', error)
            throw error
        }
    }

    const editUserProfile = async (userData) => {
        try {
            const response = await fetch(`${server}/user/edit-profile/`, {
                method: 'PUT',  // Use PUT or PATCH depending on your API
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`,
                    // Include any authentication headers if needed
                },
                body: JSON.stringify(userData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error editing user profile:', error);
            throw error;
        }
    };
    
    
    const changePassword = async (passwordData) => {
        try {
          const response = await fetch(`${server}/user/change-password/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authTokens.access}`, // Include the authentication token
            },
            body: JSON.stringify(passwordData),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error changing password:', error);
          throw error;
        }
      };
    
      const getUserDetail = async (user_id) => {
        try {

          const response = await fetch(`${server}/user/get-user-detail?user_id=${user_id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authTokens.access}`, // Include the authentication token
            },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error getting user detail:', error);
          throw error;
        }
      };
      
      


    // dashboard
    const getDashboard = async () => {
        try {
            const response = await fetch(`${server}/user/dashboard/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error getting all dashboard:', error)
            throw error
        }
    }

    // users

    const getUsers = async () => {
        try {
            const response = await fetch(`${server}/user/get-users/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error getting all users:', error)
            throw error
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        localStorage.setItem('authTokens', JSON.stringify([]))
        navigate('/login')
    }

    const contextData = {
        user,
        authTokens,
        getAllIncidents,
        getAllLocations,
        getIncidentById,
        getLocation,
        createLocation,
        deleteIncident,
        deleteLocation,
        editIncident,
        updateLocation,
        createIncident,
        createReport,
        editReport,
        deleteReport,
        getAllReports,
        getReportById,
        getDashboard,
        getUsers,
        changePassword,
        editUserProfile,
        getUserDetail,
        loginUser
    }

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}
