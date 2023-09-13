// import React, { useState } from 'react';

// const Login = () => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Simulate an API call or authentication process
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-center bg-cover bg-gradient-to-br from-blue-400 to-purple-500 perspective-3d">
//       <div className="w-full p-8 transform translate-y-8 bg-white rounded shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rotate-x-6">
//         <h1 className="mb-4 text-2xl font-semibold">Login</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-1 text-sm font-medium" htmlFor="email">Email</label>
//             <input
//               className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               autoComplete="email"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1 text-sm font-medium" htmlFor="password">Password</label>
//             <input
//               className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               autoComplete="current-password"
//               required
//             />
//           </div>
//           <button
//             className={`w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//         {isLoading && (
//           <div className="mt-4 text-center">
//             <div className="inline-block animate-spin">
//               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v6m0 0v6m0-6h6m-6 0H6"></path>
//               </svg>
//             </div>
//             <span className="ml-2">Please wait...</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Import the Link component from React Router
import AuthContext from '../../context/AuthContext'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const { loginUser } = useContext(AuthContext)
    const [backendMessage, setBackendMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const email = e.target.email.value
        const password = e.target.password.value
        const newErrors = {} // Object to store error messages

        // Check email format
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Invalid email format'
        }

        // Check password length
        if (!password || password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long'
        }

        // Simulate an API call or authentication process
        // setTimeout(() => {
        //   setIsLoading(false);

        //   // Check if there are errors
        //   if (Object.keys(newErrors).length === 0) {
        //     // Clear any previous errors on successful login
        //     setErrors({});
        //   } else {
        //     // Set the new errors
        //     setErrors(newErrors);
        //   }
        // }, 2000);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsLoading(false)
            return
        }

        try {
            const response = await loginUser(email, password)
            console.log(response, 'response')
            // const responseData = await response.json() // Parse the response as JSON
            // console.log('Response Data:', responseData)
            if (response.status === 200) {
                // Successful login
                setBackendMessage(response.message)
                navigate('/') // Navigate to the desired route on successful login
            } else if (response.status === 401) {
                // Invalid credentials
                console.log('hey stauts', response.statusText)
                setBackendMessage(`${response.statusText} please login again`)
                setIsLoading(false)
                setTimeout(() => {
                  setBackendMessage('')
                }, 5000)
            } else {
                console.error('Unexpected response status:', response.status)

                // Handle other response statuses if needed
            }
        } catch (error) {
            console.error('Login error:', error)
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-center bg-cover bg-gradient-to-br from-blue-400 to-purple-500 perspective-3d">
            <div className="w-full p-8 transform translate-y-8 bg-white rounded shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rotate-x-6">
                <h1 className="mb-4 text-2xl font-semibold">Login</h1>
                {errors.email && <p className="mb-2 text-sm text-red-500">{errors.email}</p>}
                {errors.password && <p className="mb-2 text-sm text-red-500">{errors.password}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button
                        className={`w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 ${
                            isLoading ? 'cursor-not-allowed opacity-75' : ''
                        }`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {isLoading && (
                    <div className="mt-4 text-center">
                        <div className="inline-block animate-spin">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v6m0 0v6m0-6h6m-6 0H6"
                                ></path>
                            </svg>
                        </div>
                        <span className="ml-2">Please wait...</span>
                    </div>
                )}
                {/* Display the backend message */}
                {backendMessage && (
                    <div
                        className={`mt-4 text-center ${
                            backendMessage.startsWith('Login successful') ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {backendMessage}
                    </div>
                )}

                {/* Add the sign-up link */}
                <div className="mt-4 text-center">
                    <p>Don't have an account?</p>
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
