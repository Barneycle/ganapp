import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white/95 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 text-center">
          Login
        </h2>
        <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base md:text-lg"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base md:text-lg"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-900 text-white font-semibold py-2.5 sm:py-3 md:py-3.5 px-4 rounded-lg hover:bg-blue-800 transition text-sm sm:text-base md:text-lg min-h-[44px] sm:min-h-[48px]"
          >
            Log In
          </button>
          <div className="text-center">
            <a href="#" className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm md:text-base">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/registration')}
            className="w-full bg-gray-200 text-gray-800 font-semibold py-2.5 sm:py-3 md:py-3.5 px-4 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base md:text-lg min-h-[44px] sm:min-h-[48px]"
          >
            Create New Account
          </button>
        </form>
      </div>
    </section>
  );
};
