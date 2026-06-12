import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { LuListCollapse } from "react-icons/lu";
import { RiExpandRightLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import Swal from "sweetalert2";
import { CgProfile } from "react-icons/cg";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import maleAvatar from "../assets/maleAvatar.png";
import femaleAvatar from "../assets/femaleAvatar.png";
import { IoMdArrowDropdown } from "react-icons/io";

function TopBar() {
  const { user, logout, loading, sidebarCollapsedValue, changeStateCollapsed } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeProfile, setActiveProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate;
  const handleLogout = async () => {
  const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
    });
    if (result.isConfirmed) {
      logout();
      
      navigate("/");
    }
  };
  const activeAccountDetails = () => {
    setActiveProfile((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setActiveProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveProfile]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* top header */}
      <div className="dashboard-top-bar flex justify-between">
        <div className="flex p-3 px-5 flex-row gap-10">
          {/* sidebar expand and collapse button */}
          <button
            type="button"
            className="cursor-pointer"
            onClick={changeStateCollapsed}
          >
            {sidebarCollapsedValue ? (
              <RiExpandRightLine size={"28px"} className="sec-text-color" />
            ) : (
              <LuListCollapse size={"28px"} className="sec-text-color" />
            )}
          </button>

          {/* search bar  */}

          <div className="border-2 p-3 rounded-lg border-[#1e263c] bg-[#121a2f] navbar-search flex items-center gap-2">
            <IoSearch className="sec-text-color" size={24} />

            <form className="w-full">
              <input
                type="search"
                placeholder="Search auctions, items or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-100 outline-none font-semibold text-lg"
              />
            </form>
          </div>
        </div>

        {/* user profile details */}
        <div
          ref={profileRef}
          className="flex p-3 px-5 flex-row gap-10 relative"
        >
          {user && (
            <>
              {/* profile-header */}
              <div
                onClick={activeAccountDetails}
                className={`profile-header flex items-center gap-3 cursor-pointer ${activeProfile ? "active-profile" : ""}`}
              >
                {user.gender === "Male" && (
                  <img
                    src={
                      user.avatar
                        ? `http://localhost:5000${user.avatar}`
                        : maleAvatar
                    }
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
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
                    className="w-12 h-12 rounded-full"
                  />
                )}

                <div className="flex items-center gap-2">
                  <div>
                    <h4 className="font-semibold text-start text-lg">
                      {user.name}
                    </h4>
                    <span className="text-sm font-medium sec-text-color">
                      Premium Member
                    </span>
                  </div>
                  <IoMdArrowDropdown
                    className={`dropdown-arrow duration-300 ease-in-out ${activeProfile ? "rotate-180" : ""}`}
                    size={24}
                  />
                </div>
              </div>

              {/* profile dropdown cotainer  */}

              {activeProfile && (
                <div className="profile-dropdown absolute bg-[#0f1529] rounded-2xl p-4 flex flex-col gap-3">
                  <Link to="/profile" className="flex items-center gap-2">
                    <CgProfile />
                    My Profile
                  </Link>

                  <Link to="/my-items" className="flex items-center gap-2">
                    <IoFileTrayFullOutline />
                    My Items
                  </Link>

                  <Link to="/watchlist" className="flex items-center gap-2">
                    <FaRegHeart />
                    Watchlist
                  </Link>

                  <Link to="/settings" className="flex items-center gap-2">
                    <IoSettingsOutline />
                    Settings
                  </Link>

                  <hr className="border-[#1f2237]" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-400 cursor-pointer"
                  >
                    <LuLogOut />
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TopBar;
