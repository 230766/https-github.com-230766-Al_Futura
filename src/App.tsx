import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/AuthContext";

// Lazy load pages for better performance
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const PropertyDetailPage = lazy(() => import("./pages/PropertyDetailPage"));

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
            </Route>

            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
