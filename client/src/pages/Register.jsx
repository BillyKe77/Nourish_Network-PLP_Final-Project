import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios"; // ✅ Fixed import path

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

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
      console.log("📤 Sending registration data:", formData); // Debug log
      
      const res = await api.post("/auth/register", formData); // ✅ Now includes role

      console.log("✅ Registration response:", res.data); // Debug log
      setSuccess(res.data.message || "Registration successful!");
      
      // Give user 1 second then redirect
      setTimeout(() => navigate("/login"), 1000);

    } catch (err) {
      console.error("❌ Registration error:", err.response?.data); // Debug log
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
          className="border p-2 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
        />

        <select
          name="role"
          className="border p-2 rounded"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="donor">Donor</option>
          <option value="recipient">Recipient</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded disabled:bg-blue-300"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}