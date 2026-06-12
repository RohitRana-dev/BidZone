import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdOutlineCameraAlt } from "react-icons/md";
import api from "../services/api";
import toast from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import maleAvatar from "../assets/maleAvatar.png";
import femaleAvatar from "../assets/femaleAvatar.png";
import TopBar from "../components/topBar";
import AvatarChange from "../components/avatarChange";
import ProfileEdit from "../components/profileEdit";
import MainMenu from "../components/mainMenu";
function MyProfile() {
    const { user, loading, loadUser, sidebarCollapsedValue } = useAuth();
  const [avatarChangePopup, setAvatarChangeActive] = useState(false);
  const [profileUpdatePopup, setProfileUpdatePopup] = useState(false);

  const popupAvatarChange = () => {
    setAvatarChangeActive((prev) => !prev);
  };
  const popupProfileUpdate = () => {
    setProfileUpdatePopup((prev) => !prev);
  };



  if (loading) {
    return <div>loading...</div>;
  }
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  return (
    <>
      <div className="bg-[#040b1c] text-white flex flex-row">
        <MainMenu
          activenav={"profile"}
          sidebarCollapsed={sidebarCollapsedValue}
        />
        <div className="w-full main-container p-2">
          {/* top bar header */}
          <TopBar />
          {/* My profile banner content */}
          <div className="bg-[#0e182e] p-3 px-5 py-5 border-2 border-[#1e263c] rounded-xl banner-container ">
            <div className="welcome-message">
              {user && (
                <>
                  <div className="flex my-profile-container justify-between">
                    <div className="profile-info flex gap-10 items-center">
                      <div className="profile-img-container rounded-full border-2 p-1 border-[#3f2990] relative">
                        {user.gender === "Male" && (
                          <img
                            src={
                              user.avatar
                                ? `http://localhost:5000${user.avatar}`
                                : maleAvatar
                            }
                            alt={user.name}
                            className="w-50 h-50 rounded-full"
                          />
                        )}
                        {user.gender === "Female" && (
                          <img
                            src={
                              user.avatar
                                ? `http://localhost:5000${user.avatar}`
                                : femaleAvatar
                            }
                            alt={user.name}
                            className="w-50 h-50 rounded-full"
                          />
                        )}

                        <button
                          type="button"
                          onClick={popupAvatarChange}
                          className="camera-Icon p-3 rounded-full absolute bg-[#ac7ff5] top-38 left-36 border-4 border-[#0e182e] cursor-pointer"
                        >
                          <MdOutlineCameraAlt size={24} />
                        </button>
                      </div>
                      <div className="profile-details">
                        <div className="user-name-content">
                          <h2 className="text-3xl font-semibold text-start">
                            {user.name}
                          </h2>
                        </div>
                        <div className="mt-5 flex gap-5">
                          <MdOutlineEmail size={24} />
                          {user.email}
                        </div>
                        <div className="mt-3 flex gap-5">
                          <IoLocationOutline size={24} color="#bd63c9" />
                          {user.fulladdress}
                        </div>
                        <div className="mt-3 flex gap-5">
                          <IoCalendarOutline size={24} color="#bd63c9" />
                          Member since {memberSince}
                        </div>
                      </div>
                    </div>

                    <div className="profile-edit mt-8 flex items-start gap-3">
                      <button
                        onClick={popupProfileUpdate}
                        type="button"
                        className="flex gap-2 border-2 py-3 px-5 rounded-xl primary-text-color border-[#3f2990] cursor-pointer"
                      >
                        <MdOutlineModeEdit size={20} /> Edit Profile
                      </button>
                      <Link
                        to={"/settings"}
                        className="border-2 p-3 rounded-xl sec-text-color border-[#1e263c] cursor-pointer"
                      >
                        <IoSettingsOutline size={20} />
                      </Link>
                    </div>
                  </div>

                  {/* avatar change form */}

                   <AvatarChange avatarPopup={popupAvatarChange} avatarChangeState={avatarChangePopup} setAvatarChangeState={setAvatarChangeActive} />     
                  {/* profile update form */}

                  <ProfileEdit profilePopupValue={profileUpdatePopup} popupProfileStateUpdateFunc={popupProfileUpdate} setProfileEditState={setProfileUpdatePopup}/>      
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
