import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold text-foreground mt-4">Page Not Found</h2>
      <p className="text-muted-foreground mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link 
        to="/" 
        className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-primary/90 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
