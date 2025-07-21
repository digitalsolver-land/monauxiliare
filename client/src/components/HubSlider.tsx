import { useState, useEffect } from "react";

// Import images
import image1 from "@assets/IMG-20240507-WA0028_1753060180805.jpg";
import image2 from "@assets/IMG-20240507-WA0025_1753060180806.jpg";
import image3 from "@assets/IMG-20240507-WA0026_1753060180807.jpg";

interface HubSliderProps {
  className?: string;
}

export default function HubSlider({ className = "" }: HubSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: image1,
      alt: "Équipe Mon Auxiliaire au travail - Service professionnel"
    },
    {
      image: image2,
      alt: "Mon Auxiliaire - Déménagement et services"
    },
    {
      image: image3,
      alt: "Camion Mon Auxiliaire - Transport sécurisé"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-orange-500" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}