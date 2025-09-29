import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminWelcome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the bypass flag after a short delay
    const timer = setTimeout(() => {
      localStorage.removeItem('adminBypassedMaintenance');
      // Redirect to the main page, which will now be accessible
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Welcome, Admin!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You have successfully bypassed maintenance mode.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          You will be redirected to the home page shortly.
        </p>
        <div className="mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;
