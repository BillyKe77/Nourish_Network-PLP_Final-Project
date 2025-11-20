import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await api.get('/food/my-donations');
      setDonations(response.data);
    } catch (err) {
      setError('Failed to load donations');
      console.error('Donations error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (isClaimed, claimedBy) => {
    if (isClaimed && claimedBy) {
      return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Claimed</span>;
    }
    return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Available</span>;
  };

  if (loading) return <div className="text-center py-8">Loading your donations...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Donations</h1>
        <p className="text-gray-600 mt-2">Track and manage your food donations</p>
      </div>

      {donations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No donations yet</h3>
          <p className="text-gray-500 mb-4">Start making a difference by posting your first food donation!</p>
          <button 
            onClick={() => window.location.href = '/food/post'}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Post Food
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {donations.map((donation) => (
            <div key={donation._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              {donation.image && (
                <img 
                  src={donation.image} 
                  alt={donation.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">{donation.title}</h3>
                  {getStatusBadge(donation.isClaimed, donation.claimedBy)}
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{donation.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    {donation.location}
                  </div>
                  {donation.expiresAt && (
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>
                      Expires: {new Date(donation.expiresAt).toLocaleDateString()}
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="mr-2">🕒</span>
                    Posted: {new Date(donation.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {donation.isClaimed && donation.claimedBy && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Claimed by someone!</p>
                    <p className="text-xs text-blue-600 mt-1">Contact them to arrange pickup</p>
                  </div>
                )}

                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-sm hover:bg-gray-200 transition-colors">
                    Edit
                  </button>
                  <button className="flex-1 bg-red-100 text-red-700 py-2 rounded text-sm hover:bg-red-200 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Donation Stats */}
      {donations.length > 0 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-700">{donations.length}</div>
            <div className="text-sm text-green-600">Total Donations</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-700">
              {donations.filter(d => d.isClaimed).length}
            </div>
            <div className="text-sm text-blue-600">Claimed</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-700">
              {donations.filter(d => !d.isClaimed).length}
            </div>
            <div className="text-sm text-yellow-600">Available</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-700">
              {new Set(donations.map(d => d.category)).size}
            </div>
            <div className="text-sm text-purple-600">Categories</div>
          </div>
        </div>
      )}
    </div>
  );
}