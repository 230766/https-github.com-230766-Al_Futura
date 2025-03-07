import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../lib/auth";
import logo from "../assets/logo.png";

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav
      className={`w-full h-20 fixed top-0 left-0 z-50 ${transparent ? "bg-black/50 backdrop-blur-md" : "bg-white shadow-md"}`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Al Futura Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`flex items-center text-lg font-semibold ${
                  transparent
                    ? "text-white hover:text-blue-300"
                    : "text-gray-800 hover:text-blue-600"
                } transition-colors duration-200`}
              >
                Properties
                <ChevronDown className="ml-1.5 h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 py-2">
              <DropdownMenuItem className="py-2.5">
                <Link to="/properties" className="w-full text-base font-medium hover:text-blue-600">
                  All Properties
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5">
                <Link to="/properties/residential" className="w-full text-base font-medium hover:text-blue-600">
                  Residential
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5">
                <Link to="/properties/commercial" className="w-full text-base font-medium hover:text-blue-600">
                  Commercial
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5">
                <Link to="/properties/vacation" className="w-full text-base font-medium hover:text-blue-600">
                  Vacation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5">
                <Link to="/properties/retail" className="w-full text-base font-medium hover:text-blue-600">
                  Retail
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5">
                <Link to="/properties/industrial" className="w-full text-base font-medium hover:text-blue-600">
                  Industrial
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/about"
            className={`text-lg font-semibold ${
              transparent
                ? "text-white hover:text-blue-300"
                : "text-gray-800 hover:text-blue-600"
            } transition-colors duration-200`}
          >
            About
          </Link>

          <Link
            to="/how-it-works"
            className={`text-lg font-semibold ${
              transparent
                ? "text-white hover:text-blue-300"
                : "text-gray-800 hover:text-blue-600"
            } transition-colors duration-200`}
          >
            How It Works
          </Link>

          <Link
            to="/contact"
            className={`text-lg font-semibold ${
              transparent
                ? "text-white hover:text-blue-300"
                : "text-gray-800 hover:text-blue-600"
            } transition-colors duration-200`}
          >
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`flex items-center text-lg font-semibold ${
                    transparent
                      ? "text-white hover:text-blue-300"
                      : "text-gray-800 hover:text-blue-600"
                  } transition-colors duration-200`}
                >
                  <User className="mr-2 h-5 w-5" />
                  {user.full_name || user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 py-2">
                <DropdownMenuItem className="py-2.5">
                  <Link to="/profile" className="w-full text-base font-medium hover:text-blue-600">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2.5">
                  <Link to="/my-investments" className="w-full text-base font-medium hover:text-blue-600">
                    My Investments
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem className="py-2.5">
                    <Link to="/admin" className="w-full text-base font-medium hover:text-blue-600">
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout} className="py-2.5">
                  <span className="flex items-center w-full text-base font-medium text-red-600 hover:text-red-700">
                    <LogOut className="mr-2 h-5 w-5" /> Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className={`text-base font-semibold px-6 py-2.5 ${
                    transparent
                      ? "border-blue-400 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-6 py-2.5">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={toggleMenu}
            className={`p-2 ${
              transparent ? "text-white" : "text-gray-800"
            }`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-20 left-0 w-full shadow-lg py-4 px-4">
          <div className="flex flex-col space-y-2">
            <div className="py-3 border-b border-gray-100">
              <Link
                to="/properties"
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 block py-2"
                onClick={toggleMenu}
              >
                All Properties
              </Link>
              <Link
                to="/properties/residential"
                className="text-base font-medium text-gray-700 hover:text-blue-600 block py-2 pl-4"
                onClick={toggleMenu}
              >
                Residential
              </Link>
              <Link
                to="/properties/commercial"
                className="text-base font-medium text-gray-700 hover:text-blue-600 block py-2 pl-4"
                onClick={toggleMenu}
              >
                Commercial
              </Link>
              <Link
                to="/properties/vacation"
                className="text-base font-medium text-gray-700 hover:text-blue-600 block py-2 pl-4"
                onClick={toggleMenu}
              >
                Vacation
              </Link>
            </div>
            <Link
              to="/about"
              className="text-lg font-semibold text-gray-800 hover:text-blue-600 py-3 border-b border-gray-100"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/how-it-works"
              className="text-lg font-semibold text-gray-800 hover:text-blue-600 py-3 border-b border-gray-100"
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            <Link
              to="/contact"
              className="text-lg font-semibold text-gray-800 hover:text-blue-600 py-3 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-lg font-semibold text-gray-800 hover:text-blue-600 py-3 border-b border-gray-100"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link
                  to="/my-investments"
                  className="text-lg font-semibold text-gray-800 hover:text-blue-600 py-3 border-b border-gray-100"
                  onClick={toggleMenu}
                >
                  My Investments
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 py-3 border-b border-gray-100"
                    onClick={toggleMenu}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center text-lg font-semibold text-red-600 hover:text-red-700 py-3"
                >
                  <LogOut className="mr-2 h-5 w-5" /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-3">
                <Link to="/login" onClick={toggleMenu}>
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 text-base font-semibold py-2.5"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2.5">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
