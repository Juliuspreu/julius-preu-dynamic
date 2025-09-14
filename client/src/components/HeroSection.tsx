import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/Juli.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className={`max-w-3xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-primary/90 px-4 py-2 mb-4">
            <span className="text-sm uppercase tracking-wider font-heading text-white font-medium">Professioneller Jongleur</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            <span className="block mb-2 text-shadow-lg">Präzise Jonglage</span>
            <span className="block text-primary text-shadow-sm">trifft Innovation</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl leading-relaxed drop-shadow-lg">
            Erleben Sie die Kunst des Jonglierens neu definiert: Mit atemberaubenden LED-Shows und präzisen Lichtchoreografien von Weltmeister Julius Preu.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="#shows" 
              className="btn-primary"
            >
              Shows entdecken
            </a>
            <a 
              href="/contact" 
              className="btn-outline"
            >
              Anfrage senden
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a href="#shows" className="text-white text-3xl">
          ↓
        </a>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-[20%] right-[15%] w-24 h-24 bg-primary/20 rounded-full blur-xl z-0"></div>
      <div className="absolute bottom-[25%] left-[10%] w-32 h-32 bg-secondary/20 rounded-full blur-xl z-0"></div>
    </section>
  );
}