import { useAuth } from "../context/AuthContext";
import MainMenu from "../components/mainMenu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TopBar from "../components/topBar";
function Dashboard() {
  const { user, logout, loading, sidebarCollapsedValue } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#040b1c] text-white flex flex-row">
      <MainMenu
        activenav={"dashboard"}
        sidebarCollapsed={sidebarCollapsedValue}
      />
      <div className="w-full main-container p-2">
          {/* top bar header */}
          <TopBar />
        {/* dashboard banner content */}
        <div className="bg-[#0e182e] p-3 px-5 py-5 banner-container">
          <div className="welcome-message">
            {user && (
              <h2 className="text-3xl text-start">Welcome Back, {user.name}!</h2>
            )}           
              <p className="sec-text-color text-lg text-start font-medium">Discover and bid on extraordinary it</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
