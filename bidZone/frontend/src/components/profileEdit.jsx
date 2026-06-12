import api from "../services/api";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import { useAuth } from "../context/AuthContext";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { BsGenderMale } from "react-icons/bs";
import { PiAddressBook } from "react-icons/pi";

function ProfileEdit({
  profilePopupValue,
  popupProfileStateUpdateFunc,
  setProfileEditState,
}) {
  const { user, loading, loadUser } = useAuth();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [countryValue, setCountryValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    gender: user?.gender || "",
    dateOfBirth: user?.dateOfBirth || "",
    country: user?.country || "",
    state: user?.state || "",
    city: user?.city || "",
    fulladdress: user?.fulladdress || "",
  });
  function updateAddress(city, state, country) {
    const address = `${city} - ${state}, ${country}`;

    setFormData((prev) => ({
      ...prev,
      address: address,
    }));
  }
  function changeValue(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  // edit profile info
  async function editProfile(e) {
    e.preventDefault();

    toast.remove();

    // try {
    //   const response = await api.put("users/avatar", formData, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   });

    //   toast.success(response.data.message);
    //   await loadUser();

    //   setProfileEditState(false);
    // } catch (error) {
    //   console.log(error);
    //   console.log(error.response?.data?.message || "Profile Update failed");
    // }
  }

  return (
    <>
      {profilePopupValue && (
        <>
          <div
            className="fixed w-screen bg-[#040b1c96] h-screen top-0 left-0 flex items-center justify-center"
            onMouseDown={popupProfileStateUpdateFunc}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-[#0e182e] p-5 rounded-lg relative"
            >
              <button
                type="button"
                className="sec-text-color absolute top-0 right-0 cursor-pointer"
                onClick={popupProfileStateUpdateFunc}
              >
                <IoCloseSharp size={24} />
              </button>
              <h3 className="text-xl uppercase">Edit Profile</h3>
              <p className="sec-text-color pb-5 font-medium">
                Update your personal information
              </p>
              <form onSubmit={editProfile}>
                <label
                  htmlFor="user-name"
                  className="block text-left w-full text-white"
                >
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
                <label
                  htmlFor="user-gender"
                  className="block text-left w-full text-white"
                >
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
                <label
                  htmlFor="user-dateOfBirth"
                  className="block text-left w-full text-white"
                >
                  Date Of Birth
                  <div className="flex align-center gap-3 border-1 rounded-lg border-[#7e869a] my-1 p-2 mb-4">
                    <BsGenderMale color="#7e869a" size="20px" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="user-dateOfBirth"
                      value={
                        formData.dateOfBirth
                          ? new Date(formData.dateOfBirth)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      className="w-full"
                      onChange={changeValue}
                    />
                  </div>
                </label>
                <label
                  htmlFor="address"
                  className="block text-left w-full text-white"
                >
                  Address
                  <div  className="flex align-center gap-3 rounded-lg  my-1 mb-4 text-white">
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
                        updateAddress(
                          `${e.id}, ${e.name}`,
                          stateValue,
                          countryValue,
                        );
                      }}
                      placeHolder="Select City"
                      name="selectCity"
                    />
                  </div>
                </label>

                <button type="submit">Edit</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProfileEdit;
