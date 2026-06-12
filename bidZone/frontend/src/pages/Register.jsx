import { useState } from "react";
import api from "../services/api";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { BsGenderMale } from "react-icons/bs";
import { PiAddressBook } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";

function Register() {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [countryValue, setCountryValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    country: "",
    state: "",
    city: "",
    fulladdress: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  function updateAddress(city, state, country) {
    const singleCountry = country.split(", ");
    const singleState = state.split(", ");
    const singleCity = city.split(", ");
    const address = `${singleCity[1]} - ${singleState[1]}, ${singleCountry[1]}`;
    setFormData((prev) => ({
      ...prev,
      country: country,
      state: state,
      city: city,
      fulladdress: address,
    }));
  }
  function changeValue(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = async (e) => {
    toast.remove();
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password Does not match");
      return;
    }
    try {
      const registerResponse = await api.post("/auth/register", formData);
      const loginResonse = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      //save token
      localStorage.setItem("token", loginResonse.data.token);
      await loadUser();

      setFormData({
        name: "",
        gender: "",
        dateOfBirth: "",
        country: "",
        state: "",
        city: "",
        fulladdress: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setCountryid(0);
      setStateid(0);
      setCountryValue("");
      setStateValue("");
      setAccepted(false);
      toast.success(registerResponse.data.message);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
            Create your account
          </h1>
          <p className="my-1 text-[#7e869a] text-white">
            Join Bidzone and start bidding smarter
          </p>

          <form onSubmit={handleSubmit} className="mt-5 w-100 register-form">
            <label htmlFor="user-name" className="block text-left w-full text-white">
              Full Name
              <div className="flex align-center gap-3 border-1 rounded-lg border-[#7e869a] my-1 p-2 mb-4">
                <FaRegUser color="#7e869a" size="20px" />
                <input
                  type="text"
                  name="name"
                  id="user-name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  className="w-full"
                  onChange={changeValue}
                />
              </div>
            </label>
            <label htmlFor="user-gender" className="block text-left w-full text-white">
              Gender
              <div className="flex align-center gap-3 border-1 rounded-lg border-[#7e869a] my-1 p-2 mb-4">
                <BsGenderMale color="#7e869a" size="20px" />
                <select
                  name="gender"
                  id="user-gender"
                  value={formData.gender}
                  className="w-full"
                  onChange={changeValue}
                >
                  <option value="Male" className="text-black">
                    Male
                  </option>
                  <option value="Female" className="text-black">
                    Female
                  </option>
                </select>
              </div>
            </label>
             <label htmlFor="user-dateOfBirth" className="block text-left w-full text-white">
              Date of Birth
              <div className="flex align-center gap-3 border-1 rounded-lg border-[#7e869a] my-1 p-2 mb-4">
                <BsGenderMale color="#7e869a" size="20px" />
                <input
                  type="date"
                  name="dateOfBirth"
                  id="user-dateOfBirth"
                  value={formData.dateOfBirth}
                  className="w-full"
                  onChange={changeValue}
                />
                  
              </div>
            </label>
            <label htmlFor="address" className="block text-left w-full text-white">
              Address
              <div className="flex align-center gap-3 rounded-lg  my-1 mb-4 text-white">
                <PiAddressBook color="#7e869a" size="50px" />
                <CountrySelect
                  onChange={(e) => {
                    setCountryid(e.id);
                    setCountryValue(`${e.id}, ${e.name}`);
                    console.log(e);
                  }}
                  color="#fff"
                  placeHolder="Select Country"
                  name="selectCountry"
                />

                <StateSelect
                  countryid={countryid}
                  onChange={(e) => {
                    setStateid(e.id);
                    setStateValue(`${e.id}, ${e.name}`);
                     console.log(e);
                  }}
                  placeHolder="Select State"
                  name="selectState"
                />

                <CitySelect
                  countryid={countryid}
                  stateid={stateid}
                  onChange={(e) => {
                     console.log(e);
                    updateAddress(`${e.id}, ${e.name}`, stateValue, countryValue);
                  }}
                  placeHolder="Select City"
                  name="selectCity"
                />
              </div>
            </label>

            <label
              htmlFor="user-email"
              className="block text-left w-full text-white"
            >
              Email Address
              <div className="flex align-center gap-3 border-1 rounded-lg border-[#7e869a] my-1 p-2 mb-4">
                <MdOutlineEmail color="#7e869a" size="20px" />
                <input
                  type="email"
                  name="email"
                  id="user-email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  className="w-full"
                  onChange={changeValue}
                />
              </div>
            </label>
            <label
              htmlFor="user-password"
              className="block text-left w-full text-white"
            >
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
                  onChange={changeValue}
                />
              </div>
            </label>
            <label
              htmlFor="user-confirmPassword"
              className="block text-left w-full text-white"
            >
              Confirm Password
              <div className="flex align-center gap-3 border-1 rounded-lg border-[#7e869a] my-1 p-2 mb-4">
                <TbLockPassword color="#7e869a" size="20px" />
                <input
                  type="password"
                  name="confirmPassword"
                  id="user-confirmPassword"
                  placeholder="confirm your password"
                  value={formData.confirmPassword}
                  className="w-full"
                  onChange={changeValue}
                />
              </div>
            </label>
            <div className="flex gap-3  my-1 p-2 mb-4 text-white">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => {
                  setAccepted(e.target.checked);
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>I accept the terms and conditions</span>
            </div>

            <button
              disabled={!accepted}
              className="mt-4 px-4 primary-btn py-2 text-white rounded-lg w-100"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
