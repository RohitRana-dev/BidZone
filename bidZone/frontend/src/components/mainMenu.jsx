import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { AiFillHome } from "react-icons/ai";
import { RiAuctionLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";
import { LuMessageSquareMore } from "react-icons/lu";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import Swal from "sweetalert2";

export function MainMenu({ activenav, sidebarCollapsed }) {
  const { user, logout } = useAuth();
  
  const activeClass = activenav;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",

    })
    if(result.isConfirmed){
      logout();
      navigate('/');
    }
  }
  return (
    <>
      <div className={`navBar-container bg-[#0f1529] duration-300 easy-in-out rounded-2xl w-100 h-screen ${sidebarCollapsed ? "sidebarCollapsed-active" : ""}`}>
        <div className="mainlogo duration-300 easy-in-out border-b-3  border-[#1f2237] py-5 px-10">
          <img className="duration-300 easy-in-out" src={logo} alt="BidZone" width={200} />
        </div>

        <nav className="nav-list py-5 px-10 flex flex-col gap-2 items-center sec-text-color font-semibold text-xl position-relative">
          <Link className={activeClass === "dashboard" ? "active" : ""}
           to="/dashboard">
            <AiFillHome size={"24px"} /> Dashboard
          </Link>
          <Link
            className={activeClass === "auctions" ? "active" : ""}
            to="/auctions"
          >
            <RiAuctionLine size={"24px"} />
            Auctions
          </Link>
          <Link
            className={activeClass === "categories" ? "active" : ""}
            to="/categories"
          >
            <BiCategoryAlt size={"24px"} />
            Categories
          </Link>
          <Link
            className={activeClass === "how-it-works" ? "active" : ""}
            to="/how-it-works"
          >
            <FaRegCircleQuestion size={"24px"} />
            How It Works
          </Link>
          <Link
            className={activeClass === "Watchlist" ? "active" : ""}
            to="/watchlist"
          >
            <FaRegHeart size={"24px"} />
            Watchlist
          </Link>
          <Link className={activeClass === "bids" ? "active" : ""} to="/bids">
            <GiPodiumWinner size={"24px"} />
            Bids
          </Link>
          <Link
            className={activeClass === "messages" ? "active" : ""}
            to="/messages"
          >
            <LuMessageSquareMore size={"24px"} />
            Messages
          </Link>
          <Link
            className={activeClass === "mt-items" ? "active" : ""}
            to="/my-items"
          >
            <IoFileTrayFullOutline size={"24px"} />
            My Items
          </Link>
           <Link
            className={activeClass === "profile" ? "active" : ""}
            to="/profile"
          >
            <CgProfile size={"24px"} />
            Profile
          </Link> 
          <Link
            className={activeClass === "settings" ? "active" : ""}
            to="/settings"
          >
            <IoSettingsOutline size={"24px"} />
            Settings
          </Link>
          <div
            onClick={handleLogout}
            className="logout"
          >
            <LuLogOut size={"24px"} />
            Logout
          </div>
        </nav>
        
      </div>
    </>
  );
}
export default MainMenu;
