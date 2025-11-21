import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register, user, loading: authLoading } = useContext(AuthContext); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Redirect logic for already authenticated users
  useEffect(() => {
    if (user && !authLoading) {
      if (user.role === 'donor') {
        navigate('/donations');
      } else {
        navigate('/food');
      }
    }
  }, [user, authLoading, navigate]);

  // Don't render form if user is authenticated
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      return setError("Please fill in all fields");
    }

    try {
      setLoading(true);
      console.log("📤 Sending registration data:", formData);
      
      const res = await register(formData);
      
      console.log("✅ Registration response:", res.data);
      setSuccess(res.data.message || "Registration successful!");
      
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data);
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="p-6 max-w-md mx-auto">
    <h1 className="text-2xl font-semibold mb-4">Create Account</h1>

    {error && <p className="text-red-500 mb-3">{error}</p>}
    {success && <p className="text-green-600 mb-3">{success}</p>}

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        value={formData.password}
        onChange={handleChange}
        required
        minLength="6"
      />

      <select
        name="role"
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="donor">Donor</option>
        <option value="recipient">Recipient</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-amber-700 hover:bg-amber-800 text-white p-3 rounded-lg disabled:bg-amber-400 transition-colors duration-200 font-medium"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  </div>
);
}