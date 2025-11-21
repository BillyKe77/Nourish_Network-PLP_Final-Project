import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, user, loading: authLoading } = useContext(AuthContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
   useEffect(() => {
    if (user && !authLoading) {
      if (user.role === 'donor') {
        navigate('/donations');
      } else {
        navigate('/food');
      }
    }
  }, [user, authLoading, navigate]);


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please fill in all fields");
    }

    try {
      setLoading(true);
      
  
      const res = await login({ email, password });
      
      
      console.log("Login successful, user:", res.data.user);
      
    
      
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="p-6 max-w-md mx-auto">
    <h1 className="text-2xl font-semibold mb-4">Login</h1>

    {error && <p className="text-red-500 mb-3">{error}</p>}

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={loading}
        className="bg-amber-700 hover:bg-amber-800 text-white p-3 rounded-lg disabled:bg-amber-400 transition-colors duration-200 font-medium"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  </div>
);
}