import { useState } from "react";

import Header from "./Header";
import Stats from "./Stats";
import Feature2 from "./Feature2";
import Feature3 from "./Feature3";
import Test from "./Test";
import Price from "./Price";
import Footer from "./Footer";
import NewsEvents from "./Faq";
import Home from "./Home";
import AboutContact from "./AboutContact";

const MainPage = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <div
      className="min-h-screen overflow-hidden
        bg-white text-slate-900
        transition-colors duration-300
        dark:bg-slate-950 dark:text-slate-100"
    >
      {/* Navigation Header */}
      <Header
        active={active}
        setActive={setActive}
        onOpenContact={() => {
          setActive("Contact");
          setIsContactOpen(true);
        }}
      />

      {/* Home Section */}
      <Home />

      {/* Statistics Section */}
      <Stats />

      {/* Features Section */}
      <Feature2 />

      {/* Testimonials Section */}
      <Test />

      {/* Pricing Section */}
      <Price />

      {/* News and Events Section */}
      <NewsEvents />

      {/* About and Contact Section */}
      <AboutContact />

      {/* Footer */}
      <Footer />

     
    
    </div>
  );
};

export default MainPage;
