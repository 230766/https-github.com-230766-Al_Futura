import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer';

// Lazy load pages for better performance
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const PropertyDetailPage = lazy(() => import("./pages/PropertyDetailPage"));
const About = lazy(() => import("./pages/About"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Contact = lazy(() => import("./pages/Contact"));
const Properties = lazy(() => import("./pages/Properties"));
const PropertiesByType = lazy(() => import("./pages/PropertiesByType"));
const InvestmentPage = lazy(() => import("./pages/InvestmentPage"));
const Sitemap = lazy(() => import("./pages/Sitemap"));

// Payment Pages
const CreditCardPayment = lazy(() => import("./pages/payments/CreditCardPayment"));
const BankTransfer = lazy(() => import("./pages/payments/BankTransfer"));

// Company Pages
const TeamPage = lazy(() => import('./pages/company/Team'));
const CareersPage = lazy(() => import('./pages/company/Careers'));
const PressPage = lazy(() => import('./pages/company/Press'));

// Resource Pages
const BlogPage = lazy(() => import('./pages/resources/Blog'));
const GuidesPage = lazy(() => import('./pages/resources/Guides'));
const FAQPage = lazy(() => import('./pages/resources/FAQ'));
const HelpCenterPage = lazy(() => import('./pages/help/HelpCenter'));

// Legal Pages
const TermsPage = lazy(() => import('./pages/legal/Terms'));
const PrivacyPage = lazy(() => import('./pages/legal/Privacy'));
const CookiePolicyPage = lazy(() => import('./pages/legal/CookiePolicy'));
const InvestorProtectionPage = lazy(() => import('./pages/legal/InvestorProtection'));
const RiskDisclosurePage = lazy(() => import('./pages/legal/RiskDisclosure'));

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:type" element={<PropertiesByType />} />
              <Route path="/invest/:id" element={<InvestmentPage />} />

              {/* Payment Routes */}
              <Route path="/payment/card" element={<CreditCardPayment />} />
              <Route path="/payment/bank-transfer" element={<BankTransfer />} />

              {/* Company Routes */}
              <Route path="/team" element={<TeamPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/press" element={<PressPage />} />

              {/* Resource Routes */}
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/help" element={<HelpCenterPage />} />

              {/* Legal Routes */}
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/investor-protection" element={<InvestorProtectionPage />} />
              <Route path="/risk-disclosure" element={<RiskDisclosurePage />} />

              {/* Sitemap */}
              <Route path="/sitemap" element={<Sitemap />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
              </Route>

              {import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempobook/*" />
              )}
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </div>
          {!isHomePage && <Footer />}
        </div>
        <Toaster position="top-right" />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
