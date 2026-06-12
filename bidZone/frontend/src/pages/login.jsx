import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import logo from "../assets/logo.png";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { loadUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    toast.remove();
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      toast.error("All field required");
      return;
    }

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      await loadUser();

      setFormData({
        email: "",
        password: "",
      });

      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/dashboard");
      },1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };



  return (  
    <>
      <div className="min-h-screen flex align-center justify-center register-container">
        <div className="bg-[#261855] p-8 rounded-3xl m-auto register-form-container">
          <img
            src={logo}
            alt="BidZone"
            loading="lazy"
            decoding="async"
            className="mx-auto register-logo"
          />
          <h1 className="text-center text-2xl font-semibold leading-tight mt-5 text-white">
            Login your account
          </h1>

          <form onSubmit={handleSubmit} className="mt-5 w-100 register-form">
            <label htmlFor="user-email" className="block text-left w-full text-white">
              Email Address
              <div className="flex item-center gap-3 border-1 rounded-lg border-[#7e869a] my-1 p-2 mb-4">
                <MdOutlineEmail color="#7e869a" size="20px" />
                <input
                  type="email"
                  name="email"
                  id="user-email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  className="w-full"
                  onChange={inputHandle}
                />
              </div>
            </label>
            <label htmlFor="user-password" className="block text-left w-full text-white">
              Password
              <div className="flex align-center gap-3 border-1 rounded-lg border-[#7e869a] my-1 p-2 mb-4">
                <TbLockPassword color="#7e869a" size="20px" />
                <input
                  type="password"
                  name="password" 
                  id="user-password"
                  placeholder="Create a password"
                  value={formData.password}
                  className="w-full"
                  onChange={inputHandle}
                />
              </div>
            </label>

            <button className="mt-4 px-4 primary-btn py-2 text-white rounded-lg w-100">
              Login
            </button>
          </form>

          <Link to={"/register"} className="sec-text-color cursor-pointer">Sign up?</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
