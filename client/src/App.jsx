import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FoodList from "./pages/FoodListing";
import FoodPost from "./pages/FoodPost";
import { Profile } from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import MyDonations from "./pages/MyDonations";
import MyClaims from "./pages/MyClaims";
import HomepageRedirect from "./components/HomepageRedirect"; 

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home route with redirect for logged-in users */}
        <Route path="/" element={
          <HomepageRedirect>
            <Home />
          </HomepageRedirect>
        } />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/food" element={<FoodList />} />

        {/* Protected Routes */}
        <Route
          path="/food/post"
          element={
            <ProtectedRoute>
              <FoodPost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donations"
          element={
            <ProtectedRoute>
              <MyDonations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-claims"
          element={
            <ProtectedRoute>
              <MyClaims />
            </ProtectedRoute>
          }
        />

        {/* 404 Catch-all */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Page not found</p>
              <a 
                href="/" 
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Go Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}