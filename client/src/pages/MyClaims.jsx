import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';

export default function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      // This endpoint would need to be created in your backend
      const response = await api.get('/food/my-claims');
      setClaims(response.data);
    } catch (err) {
      setError('Failed to load your claims');
      console.error('Claims error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading your claims...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Claims</h1>
        <p className="text-gray-600 mt-2">Track the food you've claimed</p>
      </div>

      {claims.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No claims yet</h3>
          <p className="text-gray-500 mb-4">Browse available food and make your first claim!</p>
          <button 
            onClick={() => window.location.href = '/food'}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Find Food
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {claims.map((claim) => (
            <div key={claim._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{claim.title}</h3>
                  <p className="text-gray-600 mt-1">{claim.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      {claim.location}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📞</span>
                      {claim.contactInfo}
                    </div>
                    {claim.expiresAt && (
                      <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        Expires: {new Date(claim.expiresAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Claimed
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(claim.claimedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}