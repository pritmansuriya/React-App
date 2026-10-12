import { useState } from "react";

import Header from "./Header";
import Stats from "./Stats";
import Feature2 from "./Feature2";
import Feature3 from "./Feature3";
import Test from "./Test";
import Price from "./Price";
import Footer from "./Footer";
import Contact from "./Contact";
import NewsEvents from "./Faq";
import Home from "./Home";
import AboutContact from "./AboutContact";

const MainPage = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <div className="overflow-hidden">
      <Header
        active={active}
        setActive={setActive}
        onOpenContact={() => {
          setActive("Contact");
          setIsContactOpen(true);
        }}
      />

      <Home />
      <Stats />
      <Feature2 />
      <Test />
      <Price />
      <NewsEvents />
      <AboutContact />
      <Footer />

      <Contact
        isOpen={isContactOpen}
        onClose={() => {
          setIsContactOpen(false);
          setActive("Home");
        }}
      />
    </div>
  );
};

export default MainPage;