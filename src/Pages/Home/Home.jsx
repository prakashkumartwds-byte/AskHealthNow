import React from "react";
import Hero from "../../component/header/Hero";
import PriceTableWithAnimation from "../../component/PriceTabel/PriceTabel";
import HowItWorks from "../../component/itWork/itwork";
import Trust from "../../component/trust/trust";

const Home = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <PriceTableWithAnimation />
      <Trust />
    </>
  );
};

export default Home;