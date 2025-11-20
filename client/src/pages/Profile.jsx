import { useEffect, useState, useContext } from "react";
import API from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

export function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch user profile
        const res = await API.get("/auth/me");
        setProfile(res.data);

        // Fetch food items based on role
        const foodRes = await API.get("/food");
        if (res.data.role === "donor") {
          setFoods(foodRes.data.filter((f) => f.donor?._id === res.data._id));
        } else if (res.data.role === "recipient") {
          setFoods(foodRes.data.filter((f) => f.claimedBy === res.data._id));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) return <p className="p-6">Loading profile...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!profile) return <p className="p-6">No profile data found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="mb-6">
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Role:</strong> {profile.role}
        </p>
        {profile.phone && (
          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-2">
        {profile.role === "donor" ? "Your Posted Food Items" : "Your Claimed Food Items"}
      </h2>

      {foods.length === 0 && <p>No food items to display.</p>}

      <div className="grid gap-6 md:grid-cols-2">
        {foods.map((food) => (
          <div key={food._id} className="border rounded-lg p-4 flex flex-col">
            <img
              src={food.imageUrl}
              alt={food.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold">{food.title}</h3>
            <p className="text-gray-700 mb-2">{food.description}</p>
            <p className="text-gray-500 mb-2">
              Location: {food.location} | Contact: {food.contactInfo}
            </p>
            <p className="text-sm text-gray-500">
              Status:{" "}
              <span className={food.status === "claimed" ? "text-red-500" : "text-green-500"}>
                {food.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
