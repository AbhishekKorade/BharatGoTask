import { useState } from "react";
import axios from "axios";
import { base_url } from "../config/base_url";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const uploadImage = async (image) => {
    try {
      const imageFormData = new FormData();
      imageFormData.append("file", image);

      const response = await axios.post(`${base_url}/api/v1/files/upload`, imageFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.location; // Ensure your API returns the uploaded image URL
    } catch (error) {
      console.error("Image Upload Failed:", error);
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
    
      const imageUrl = await uploadImage(formData.image);

     
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: imageUrl, 
      };

      await axios.post(`${base_url}/api/v1/users/`, userData);

      setMessage("Registration successful!");
      navigate("/login");
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 cursor-pointer text-white p-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
