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
      type: "color",
      color: "from-orange-500 to-orange-600",
      alt: "Fond orange Mon Auxiliaire"
    },
    {
      type: "image",
      image: image1,
      alt: "Camion Mon Auxiliaire en action - Déménagement professionnel"
    },
    {
      type: "image", 
      image: image2,
      alt: "Équipe Mon Auxiliaire - Service de déménagement"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Default orange background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600" />
      
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.type === "color" ? (
            <div className={`w-full h-full bg-gradient-to-r ${slide.color}`} />
          ) : (
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover opacity-40"
            />
          )}
        </div>
      ))}
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/70 to-orange-500/70" />
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
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