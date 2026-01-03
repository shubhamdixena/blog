
import { useState } from "react";
import { Link } from "react-router-dom";

const WhyWaterSection = () => {
  const [activeCategory, setActiveCategory] = useState("HEALTH");

  const categories = {
    HEALTH: {
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1200&h=600&fit=crop&q=80",
      alt: "Clean water flowing from a tap",
      statText: "Access to clean water and basic sanitation can save around 16,000 lives every week.",
      linkText: "LEARN ABOUT HEALTH IMPACT"
    },
    EDUCATION: {
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=600&fit=crop&q=80",
      alt: "Children learning about clean water",
      statText: "Children miss 443 million school days each year due to water-related illness.",
      linkText: "LEARN ABOUT EDUCATION IMPACT"
    },
    WOMEN: {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop&q=80",
      alt: "Women empowered through clean water access",
      statText: "Women and girls spend 200 million hours every day collecting water for their families.",
      linkText: "LEARN ABOUT WOMEN'S EMPOWERMENT"
    },
    "ECONOMIC GROWTH": {
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&h=600&fit=crop&q=80",
      alt: "Community development through water infrastructure",
      statText: "Every $1 invested in water and sanitation provides a $4-12 return on investment.",
      linkText: "LEARN ABOUT ECONOMIC IMPACT"
    }
  };

  const currentCategory = categories[activeCategory as keyof typeof categories];

  return (
    <section className="bg-gradient-to-br from-rose-50 to-orange-50 py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <span className="text-sm font-medium uppercase tracking-wider text-gray-500">WHY WATER?</span>
        </div>
        
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold mb-8 md:mb-10 text-gray-900">
          Because clean water changes everything
        </h2>
        
        <div className="max-w-5xl mx-auto mb-10 md:mb-12 relative rounded-lg overflow-hidden">
          <img 
            src={currentCategory.image}
            alt={currentCategory.alt}
            className="w-full h-[300px] sm:h-[400px] md:h-[480px] object-cover rounded-lg" 
          />
          
          <div className="absolute top-0 left-0 right-0 p-2 sm:p-4 flex justify-center">
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-md">
              {Object.keys(categories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                   className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium text-xs transition-colors duration-200 ease-in-out ${
                     activeCategory === category
                       ? "bg-blue-600 text-white"
                       : "bg-white text-gray-800 hover:bg-gray-100"
                   }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative sm:absolute sm:bottom-6 sm:right-6 md:bottom-10 md:right-10 max-w-full sm:max-w-xs bg-white p-4 sm:p-6 rounded-lg shadow-xl mt-4 sm:mt-0">
            <p className="text-sm sm:text-base text-gray-800 mb-3">
              {currentCategory.statText}
            </p>
            <Link to="#" className="mt-2 inline-block text-blue-600 font-medium text-xs sm:text-sm uppercase hover:underline">
              {currentCategory.linkText}
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900">
            703 million people lack basic access to clean and safe drinking water
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto mb-8 text-base sm:text-lg">
            Our work to end the water crisis impacts every aspect of life. You can help provide education, income, dignity, and health — especially for women and children.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyWaterSection;
