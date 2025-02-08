import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../config/base_url";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }
const Payload={
  email:email,
  password:password
}
   axios.post(`${base_url}/api/v1/auth/login`,Payload)
   .then((resp)=>{
  
    navigate('/')
    getLoginUser(resp.data.access_token)
    localStorage.setItem('access_token',resp.data.access_token)
    localStorage.setItem('refresh_token',resp.data.refresh_token)
    alert('Login Sucessful')
   })
.catch((err)=>{
  console.log(err)
  // alert(err.)
})
   
  };

  const getLoginUser = (token) => {
    axios.get(`${base_url}/api/v1/auth/profile`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then((resp)=>{
      console.log(resp.data,"////login user")
      localStorage.setItem("user",JSON.stringify(resp.data))
    })
    .catch((err)=>{
      console.log(err)
      alert(err.message)
    })

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.email ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.password ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          
          <button
            type="submit"
          
            className={`w-full py-2 rounded-lg transition bg-blue-500 cursor-pointer text-white hover:bg-blue-600`}
          >
            Login
          </button>
        </form>

        
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline"
          >
            Create New Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
