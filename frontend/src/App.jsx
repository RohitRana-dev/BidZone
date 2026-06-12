import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import toast, { Toaster } from 'react-hot-toast';
import MyProfile from "./pages/myProfile";
import "react-country-state-city/dist/react-country-state-city.css";

function App() {
  return (
       <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<MyProfile />} />
        </Routes>
        <Toaster />
       </BrowserRouter>
  );
}

export default App;