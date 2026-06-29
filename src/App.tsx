import { Navigate, Route, Routes } from "react-router-dom";
import {
  ContactPage,
  CookiePolicyPage,
  DisclaimerPage,
  FaqPage,
  HomePage,
  PrivacyPolicyPage,
  RefundPolicyPage,
  ServicesPage,
  TermsPage
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-and-conditions" element={<TermsPage />} />
      <Route path="/refund-cancellation-policy" element={<RefundPolicyPage />} />
      <Route path="/cookie-policy" element={<CookiePolicyPage />} />
      <Route path="/disclaimer" element={<DisclaimerPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
