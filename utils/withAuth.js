// utils/withAuth.js
import { useEffect } from 'react';
import Router from 'next/router';

const withAuth = (WrappedComponent) => {
  const ProtectedPage = (props) => {
    useEffect(() => {
      // Check if the user is authenticated
      const isAuthenticated = localStorage.getItem('userData') ? true : false; // Replace this with your authentication check

      // If the user is not authenticated, redirect to login page
      if (!isAuthenticated) {
        Router.push('/'); // Redirect to login page or any other protected route
      }
    }, []);

    // Render the WrappedComponent if the user is authenticated
    return <WrappedComponent {...props} />;
  };

  return ProtectedPage;
};

export default withAuth;
