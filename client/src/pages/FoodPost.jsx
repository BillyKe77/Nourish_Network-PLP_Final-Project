import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";

export default function FoodPost() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    contactInfo: "",
    image: null, // Changed from imageUrl to image (file object)
    expiresAt: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      return setError("You must be logged in to post food");
    }

    // Validate required fields
    if (!formData.title || !formData.description || !formData.location || !formData.contactInfo || !formData.image) {
      return setError("Please fill in all required fields including the image");
    }

    try {
      setLoading(true);
      console.log("📤 Preparing to send food post data:", formData);

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("location", formData.location);
      submitData.append("contactInfo", formData.contactInfo);
      submitData.append("image", formData.image); // Append the file
      if (formData.expiresAt) {
        submitData.append("expiresAt", formData.expiresAt);
      }

      const res = await api.post("/food", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("✅ Food post successful:", res.data);
      setSuccess("Food posted successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        contactInfo: "",
        image: null,
        expiresAt: ""
      });
      setImagePreview("");

    } catch (err) {
      console.error("❌ Food post error:", err.response?.data);
      setError(err?.response?.data?.message || "Failed to post food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Post Available Food</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Food Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="e.g., Fresh Apples, Packaged Pasta, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border p-2 rounded"
            placeholder="Describe the food item, condition, packaging, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="e.g., Downtown, City Center, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Information *</label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="e.g., Phone number, email, or pickup instructions"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Food Image *</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full border p-2 rounded"
          />
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date (Optional)</label>
          <input
            type="date"
            name="expiresAt"
            value={formData.expiresAt}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded disabled:bg-blue-300 hover:bg-blue-700 transition-colors"
        >
          {loading ? "Posting..." : "Post Food"}
        </button>
      </form>
    </div>
  );
}