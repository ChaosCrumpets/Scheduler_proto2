import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <AlertTriangle className="w-16 h-16 text-indian-red mb-4" />
      <h1 className="text-4xl font-bold text-onyx mb-2">404 - Page Not Found</h1>
      <p className="text-onyx/80 mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="bg-indian-red text-white px-6 py-2 rounded-lg shadow hover:bg-indian-red/90 transition">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
