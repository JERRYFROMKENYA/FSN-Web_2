import React, { useEffect } from "react";
import "./Features.css";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import ofImportanceNiWewe from "../../assets/ofImportanceNiWewe.png";
import Feature from "./Feature.jsx";
import { FeatureList } from "./data.jsx";

import AOS from "aos";
import "aos/dist/aos.css";

const Features = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <section id="LearnMore">
      <div className="container features">
        <div className="title" data-aos="fade-up">
          <BsFillBookmarkStarFill color="var(--cop-pink)" size={30} />
          <h2>Lets tell you more about us...</h2>
        </div>
        <div className="features-content">
          <div className="features-left" data-aos="fade-right">
            <img src={ofImportanceNiWewe} alt="Of Importance ni Wewe!" />
          </div>
          <div className="features-right" data-aos="fade-left">
            {FeatureList.map((feature) => (
              <Feature
                key={feature.id}
                icon={feature.icon}
                heading={feature.heading}
                text={feature.text}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
