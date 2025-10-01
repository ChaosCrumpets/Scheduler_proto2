import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-6xl font-bold text-indian-red">404</h1>
      <h2 className="text-2xl font-semibold text-onyx mt-4">Page Not Found</h2>
      <p className="text-onyx/70 mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link 
        to="/" 
        className="mt-6 px-6 py-2 bg-gold text-onyx rounded-lg shadow-sm hover:bg-gold/90 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
