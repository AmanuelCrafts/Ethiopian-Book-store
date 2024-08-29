import React, { useState } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";
import { logout, selectUser } from "../features/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <div className="w-full flex items-center justify-center pt-3 shadow-inner">
      <nav className="flex items-center justify-between shadow-md hover:shadow-sm transition-all w-[90%] px-4 md:px-8 lg:px-20 py-4 rounded-xl">
        <Link to="/" className="text-2xl md:text-3xl font-extrabold">
          HibretBooks
        </Link>
        <div className="space-x-4 flex items-center">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search for books..."
                  className="hidden md:block px-3 py-2 w-40 md:w-56 lg:w-64 bg-foreground text-copy rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary-light transition duration-300 pr-10"
                />
                <Search
                  className="hidden md:block text-primary-content cursor-pointer"
                  onClick={handleSearchSubmit}
                />
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 md:px-6 bg-secondary text-secondary-content rounded-lg border border-secondary-dark hover:bg-secondary-dark hover:text-secondary-content transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/auth">
                <button className="px-4 py-2 md:px-6 bg-secondary text-secondary-content rounded-lg border border-secondary-dark hover:bg-secondary-dark hover:text-secondary-content transition duration-300">
                  Sign Up
                </button>
              </Link>
              <Link to="/auth">
                <button className="px-4 py-2 md:px-6 bg-primary-dark text-primary-content rounded-lg border border-primary hover:bg-primary hover:border-primary-light transition duration-300">
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
