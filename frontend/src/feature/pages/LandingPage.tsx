import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import HowItWorks from "./components/HowItWorks";
import Calculator from "./components/Calculator";
import WhyJuanaBin from "./components/WhyJuanaBin";
import LiveActivity from "./components/LiveActivity";
import Compliance from "./components/Compliance";
import Hero from "./components/Hero";
import MetricsTicker from "./components/MetricsTicker";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Features from "./components/Features";

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <MetricsTicker />
      <Features />
      <HowItWorks />
      <Calculator />
      <WhyJuanaBin />
      <LiveActivity />
      <Compliance />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
