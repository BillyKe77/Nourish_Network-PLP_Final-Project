import { useEffect, useState, useContext } from "react";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

export default function FoodListing() {
  const [foods, setFoods] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get("/food");
        setFoods(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFoods();
  }, []);

  const handleClaim = async (id) => {
    try {
      await api.put(`/food/${id}/claim`);
      setFoods((prev) =>
        prev.map((f) =>
          f._id === id ? { ...f, status: "claimed", claimedBy: user._id } : f
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">Available Food Items</h1>
      {foods.length === 0 && <p>No items available.</p>}
      <div className="grid gap-4">
        {foods.map((food) => (
          <div
            key={food._id}
            className="border p-4 rounded shadow flex flex-col md:flex-row gap-4"
          >
            <img
              src={food.imageUrl}
              alt={food.title}
              className="w-full md:w-48 h-48 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{food.title}</h2>
              <p>{food.description}</p>
              <p>Location: {food.location}</p>
              <p>Contact: {food.contactInfo}</p>
              <p>Status: {food.status}</p>

              {/* Only recipients can claim food */}
              {user?.role === "recipient" && food.status === "available" && (
                <button
                  onClick={() => handleClaim(food._id)}
                  className="bg-green-600 text-white p-2 mt-2 rounded"
                >
                  Claim Food Item
                </button>
              )}

              {/* Donors see "Already Claimed" */}
              {user?.role === "donor" && food.donor._id === user._id && (
                <p className="mt-2 font-semibold">
                  {food.status === "claimed" ? "Claimed" : "Available"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
