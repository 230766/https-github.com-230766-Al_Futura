import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import logo from "../../assets/logo.png";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // In a real app, perform logout logic here
    navigate("/");
  };

  return (
    <nav className="w-full h-16 bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Al Futura Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/admin" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                Management
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/admin" className="w-full">
                  Properties
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/admin?tab=users" className="w-full">
                  Users
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/admin?tab=investments" className="w-full">
                  Investments
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/admin?tab=analytics"
            className="text-gray-700 hover:text-blue-600"
          >
            Analytics
          </Link>

          <Link to="/" className="text-gray-700 hover:text-blue-600">
            View Site
          </Link>
        </div>

        {/* User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center text-gray-700"
              >
                <User className="mr-2 h-4 w-4" />
                Admin User
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/admin/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/admin/settings" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <span className="w-full flex items-center">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <div className="md:hidden bg-white absolute top-16 left-0 w-full shadow-md py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link
              to="/admin"
              className="text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100 flex items-center"
              onClick={toggleMenu}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Link>
            <Link
              to="/admin?tab=properties"
              className="text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Properties
            </Link>
            <Link
              to="/admin?tab=users"
              className="text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Users
            </Link>
            <Link
              to="/admin?tab=investments"
              className="text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Investments
            </Link>
            <Link
              to="/admin?tab=analytics"
              className="text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Analytics
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              View Site
            </Link>
            <Button
              variant="ghost"
              className="justify-start text-red-600 hover:text-red-800 py-2"
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
