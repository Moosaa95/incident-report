import React, { useState } from 'react';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate an API call or authentication process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-gradient-to-br from-blue-400 to-purple-500 perspective-3d">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 transform translate-y-8 rotate-x-6">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              className="w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input
              className="w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>
          <button
            className={`w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {isLoading && (
          <div className="mt-4 text-center">
            <div className="animate-spin inline-block">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <span className="ml-2">Please wait...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
