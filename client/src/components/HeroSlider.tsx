import { useState, useEffect } from "react";

// Import images
import image1 from "@assets/IMG-20240507-WA0027-1080x675_1753060431617.jpg";
import image2 from "@assets/IMG-20240507-WA0029-1080x675_1753060431618.jpg";

interface HeroSliderProps {
  className?: string;
}

export default function HeroSlider({ className = "" }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: image1,
      alt: "Camion Mon Auxiliaire en action"
    },
    {
      image: image2,
      alt: "Équipe Mon Auxiliaire au travail"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Orange background base */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600"></div>
      
      {/* Image slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-20" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-white" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}