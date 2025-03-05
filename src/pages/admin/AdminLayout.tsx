import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
