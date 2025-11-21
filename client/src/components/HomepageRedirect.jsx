import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function HomepageRedirect({ children }) {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    // User is logged in - redirect based on role
    if (user.role === 'donor') {
      navigate('/donations');
    } else if (user.role === 'recipient') {
      navigate('/food');
    }
    return null; // Don't render anything while redirecting
  }

  // User is not logged in - show the homepage
  return children;
}