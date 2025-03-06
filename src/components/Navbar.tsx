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
      className={`w-full h-20 fixed top-0 left-0 z-50 ${transparent ? "bg-black/30 backdrop-blur-md" : "bg-white shadow-md"}`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="text-2xl font-bold text-blue-600">Al Futura</div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center font-medium text-gray-800 hover:text-blue-600"
              >
                Properties
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/properties" className="w-full">
                  All Properties
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/properties/residential" className="w-full">
                  Residential
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/properties/commercial" className="w-full">
                  Commercial
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/properties/vacation" className="w-full">
                  Vacation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/properties/retail" className="w-full">
                  Retail
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/properties/industrial" className="w-full">
                  Industrial
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/about"
            className="font-medium text-gray-800 hover:text-blue-600"
          >
            About
          </Link>

          <Link
            to="/how-it-works"
            className="font-medium text-gray-800 hover:text-blue-600"
          >
            How It Works
          </Link>

          <Link
            to="/contact"
            className="font-medium text-gray-800 hover:text-blue-600"
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
                  className="flex items-center font-medium text-gray-800 hover:text-blue-600"
                >
                  <User className="mr-2 h-4 w-4" />
                  {user.full_name || user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/my-investments" className="w-full">
                    My Investments
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem>
                    <Link to="/admin" className="w-full">
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  <span className="flex items-center w-full">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMenu} className="p-1">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-20 left-0 w-full shadow-md py-4 px-4">
          <div className="flex flex-col space-y-4">
            <div className="py-2 border-b border-gray-100">
              <Link
                to="/properties"
                className="text-gray-700 hover:text-blue-600 block py-1"
                onClick={toggleMenu}
              >
                All Properties
              </Link>
              <Link
                to="/properties/residential"
                className="text-gray-700 hover:text-blue-600 block py-1 pl-4 text-sm"
                onClick={toggleMenu}
              >
                Residential
              </Link>
              <Link
                to="/properties/commercial"
                className="text-gray-700 hover:text-blue-600 block py-1 pl-4 text-sm"
                onClick={toggleMenu}
              >
                Commercial
              </Link>
              <Link
                to="/properties/vacation"
                className="text-gray-700 hover:text-blue-600 block py-1 pl-4 text-sm"
                onClick={toggleMenu}
              >
                Vacation
              </Link>
            </div>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link
                  to="/my-investments"
                  className="text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
                  onClick={toggleMenu}
                >
                  My Investments
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
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
                  className="flex items-center text-red-600 hover:text-red-800 py-2"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link to="/login" onClick={toggleMenu}>
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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
