// import React, { useState } from 'react';

// const Register = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [passwordError, setPasswordError] = useState('');
//   const [usernameError, setUsernameError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const usernameInput = e.target.username.value;
//     const emailInput = e.target.email.value;

//     if (!usernameInput) {
//       setUsernameError('Username is required.');
//       return;
//     }

//     if (usernameInput.toLowerCase().includes(emailInput.toLowerCase())) {
//       setUsernameError('Username should not contain email address.');
//       return;
//     }

//     const passwordInput = e.target.password.value;
//     if (passwordInput.length < 6 || /^\d+$/.test(passwordInput)) {
//       setPasswordError('Password must be at least 6 characters long and should not contain only numbers.');
//       return;
//     }


//     setIsLoading(true);
    
//     // Simulate an API call or registration process
//     setTimeout(() => {
//         setIsLoading(false);
//         setPasswordError('')
//         setUsernameError('')
//     }, 2000);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//       <div className="w-full p-8 transform -translate-y-8 bg-white rounded shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rotate-x-6">
//         <h1 className="mb-4 text-2xl font-semibold text-center">Create an Account</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-1 text-sm font-medium" htmlFor="username">Username</label>
//             <input
//               className="w-full px-3 py-2 border rounded focus:ring focus:ring-pink-300"
//               type="text"
//               id="username"
//               name="username"
//               placeholder="Enter your username"
//               autoComplete="username"
//               required
//             />
//             {usernameError && <p className="mt-1 text-xs text-red-500">{usernameError}</p>}
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1 text-sm font-medium" htmlFor="email">Email</label>
//             <input
//               className="w-full px-3 py-2 border rounded focus:ring focus:ring-pink-300"
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
//               className="w-full px-3 py-2 border rounded focus:ring focus:ring-pink-300"
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               autoComplete="new-password"
//               required
//             />
//             {passwordError && <p className="mt-1 text-xs text-red-500">{passwordError}</p>}
//           </div>
//           <button
//             className={`w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-300 ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//         {isLoading && (
//           <div className="mt-4 text-center">
//             <div className="inline-block animate-spin">
//               <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v6m0 0v6m0-6h6m-6 0H6"></path>
//               </svg>
//             </div>
//             <span className="ml-2 text-pink-600">Please wait...</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from React Router

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [addressError, setAddressError] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    const addressInput = e.target.address.value;
    const emailInput = e.target.email.value;

    if (addressInput.trim() === '') {
      setAddressError('Address is required.');
      return;
    }


    
    const passwordInput = e.target.password.value;
    if (passwordInput.length < 6 || /^\d+$/.test(passwordInput)) {
      setPasswordError('Password must be at least 6 characters long and should not contain only numbers.');
      return;
    }

    setIsLoading(true);

    // Simulate an API call or registration process
    setTimeout(() => {
      setIsLoading(false);
      setPasswordError('');
      setAddressError('');
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full p-8 transform -translate-y-8 bg-white rounded shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rotate-x-6">
        <h1 className="mb-4 text-2xl font-semibold text-center">Create an Account</h1>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium" htmlFor="email">Email</label>
            <input
              className="w-full px-3 py-2 border rounded focus:ring focus:ring-pink-300"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium" htmlFor="password">Password</label>
            <input
              className="w-full px-3 py-2 border rounded focus:ring focus:ring-pink-300"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              required
            />
            {passwordError && <p className="mt-1 text-xs text-red-500">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium" htmlFor="address">Address</label>
            <input
              className="w-full px-3 py-2 border rounded focus:ring focus:ring-pink-300"
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              autoComplete="address"
              required
            />
            {addressError && <p className="mt-1 text-xs text-red-500">{addressError}</p>}
          </div>
          <button
            className={`w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-300 ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {isLoading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin">
              <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <span className="ml-2 text-pink-600">Please wait...</span>
          </div>
        )}

        {/* Add the login link */}
        <div className="mt-4 text-center">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
