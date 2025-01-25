import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
    
        <div className="text-lg font-bold">
          <Link to="/">CRP</Link>
        </div>
        
        <div className="flex space-x-4">
          <Link
            to="/"
            className="hover:text-gray-200 transition"
          >
            Home
          </Link>
          <Link
            to="/signup"
            className="hover:text-gray-200 transition"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;