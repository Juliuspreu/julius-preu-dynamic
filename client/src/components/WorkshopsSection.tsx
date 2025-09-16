import { useState, useEffect } from "react";
import { Link } from "wouter";

// Use placeholder icons for now - will be replaced with actual SVGs via public folder
const GruppenFormateIcon = "/Gruppen & Formate.svg";
const VeranstaltungsorteIcon = "/Veranstaltungsorte.svg";
const AlleLevelsIcon = "/Alle Levels.svg";
const InnovativeInhalteIcon = "/Innovative Inhalte.svg";
const KonzentrationFokusIcon = "/Konzentration u Fokus.svg";
const KoordinationIcon = "/Koordination.svg";
const SelbstvertrauenIcon = "/Selbstvertrauen.svg";
const SpassMotivationIcon = "/Spass u Motivation.svg";
const StressabbauIcon = "/Stressabbau.svg";
const TeambuildingIcon = "/Teambuilding.svg";
const FlexibleDauerIcon = "/Flexible Dauer.svg";
const IndividuelleAnpassungIcon = "/Individuelle Anpassung.svg";

export default function WorkshopsSection() {
  const [activeTab, setActiveTab] = useState<string>("corporate");
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentSchoolTestimonialIndex, setCurrentSchoolTestimonialIndex] = useState<number>(0);

  // School workshop images
  const schoolImages = [
    "/JPI_2779.jpg",
    "/JPI_3301.jpg", 
    "/JPI_3037.jpg",
    "/JPI_3313.jpg"
  ];

  // School testimonials data
  const schoolTestimonials = [
    {
      text: "Gravitos steht für hoch motivierende Workshops, die wirklich allen Kindern ganz viel Spaß machen und eine atemberaubende Showeinlage! Absolut empfehlenswert! Deswegen findet der Jongliertag regelmäßig in der Grundschule Schwarzenbruck statt.",
      name: "Sabine Dannich",
      position: "Schulleitung Grundschule Schwarzenbruck"
    },
    {
      text: "Julius und Daniel boten bei uns in der Nachmittagsbetreuung für Ganztagesschulen Jonglier-Workshops an. Die Schüler*innen waren begeistert von den Jonglierkünsten der beiden und es machte ihnen riesigen Spaß auch selbst das Jonglieren auszuprobieren. Die Workshops waren in allen Schulen ein Highlight – doch nicht nur die Kinder waren begeistert, sondern auch die Betreuungspersonen empfanden die Workshops als große Bereicherung.",
      name: "Sandra Neundlinger",
      position: "ISK (Institut für soziale Kompetenz)"
    }
  ];

  // Auto-advance slider for school images
  useEffect(() => {
    if (activeTab === "schools") {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % schoolImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeTab, schoolImages.length]);
  
  const workshopTypes = [
    { id: "corporate", name: "Firmenkunden" },
    { id: "schools", name: "Schulen" },
    { id: "cultural", name: "Kulturzentren" }
  ];
  
  const workshopFeatures = [
    {
      icon: GruppenFormateIcon,
      title: "Gruppen & Formate",
      description: "Workshops können für Kleingruppen bis hin zu größeren Events mit bis zu 100 Teilnehmern angeboten werden. Verfügbar als Solo-Workshop oder mit einem zweiten Trainer."
    },
    {
      icon: VeranstaltungsorteIcon,
      title: "Veranstaltungsorte",
      description: "Workshops finden in Deutschland und Österreich statt, bei Bedarf auch international. Der Workshop kommt zu Ihnen - ob Firmenzentrale, Schule oder Veranstaltungsort."
    },
    {
      icon: AlleLevelsIcon,
      title: "Alle Levels",
      description: "Von Anfängern ohne Vorkenntnisse bis hin zu Fortgeschrittenen - die Workshops werden individuell auf das Niveau der Teilnehmer angepasst."
    },
    {
      icon: InnovativeInhalteIcon,
      title: "Innovative Inhalte",
      description: "Neben klassischer Jonglage können auch LED-Elemente, spezielle Techniken und kreative Übungen Teil des Workshops sein - ganz nach Ihren Wünschen."
    }
  ];
  
  const workshopContent = {
    corporate: {
      title: "Teambuilding & Events für Unternehmen",
      description: "Stärken Sie den Zusammenhalt und die Kreativität Ihres Teams mit einem maßgeschneiderten Jonglier-Workshop. Diese interaktiven Sessions fördern Konzentration, Koordination und Kommunikation in einer entspannten, spielerischen Atmosphäre.",
      benefits: [
        "Verbesserte Teamdynamik und Zusammenarbeit",
        "Stressabbau und Förderung der Work-Life-Balance",
        "Entwicklung von Durchhaltevermögen und Fokus",
        "Einzigartige Teamerfahrung abseits des Büroalltags",
        "Möglichkeit für kreative Pausen bei mehrtägigen Konferenzen"
      ],
      imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    schools: {
      title: "Pädagogische Programme für Schulen",
      description: "In einer ca. 45-minütigen Einheit können die Kinder Jonglieren mit Tüchern, Bällen, Tellern und Diabolos ausprobieren und lernen. An Schulen bietet es sich an, dass die ganze Schule an einem oder zwei Vormittagen teilnehmen kann. 1-3 Klassen je Schuleinheit mit einer möglichen Abschlussperformance für alle Schüler und Lehrer.",
      benefits: [
        "45-minütige Lerneinheiten mit Tüchern, Bällen, Tellern und Diabolos",
        "Ganze Schule kann an ein oder zwei Vormittagen teilnehmen",
        "1-3 Klassen pro Schuleinheit optimal organisiert",
        "Abschlussperformance für alle Schüler und Lehrer möglich",
        "Förderung der Koordination und Konzentrationsfähigkeit"
      ],
      videoUrl: "https://www.youtube.com/embed/32ASjLyy_78",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    cultural: {
      title: "Programme für Kulturzentren & Festivals",
      description: "Bereichern Sie Ihr Kulturprogramm mit interaktiven Jonglier-Workshops für ein breites Publikum. Diese Angebote können als Begleitprogramm zu Festivals, als regelmäßige Kurse oder als einmalige Events gestaltet werden.",
      benefits: [
        "Niedrigschwelliger Zugang zu Zirkuskünsten für alle Altersgruppen",
        "Möglichkeit für generationenübergreifende Aktivitäten",
        "Attraktive Ergänzung zu bestehenden Kulturprogrammen",
        "Abschlussaufführungen mit Teilnehmern möglich",
        "Kombination mit Vorführungen des Trainers"
      ],
      imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  };
  
  // Workshop Benefits data
  const workshopBenefits = [
    {
      icon: KonzentrationFokusIcon,
      title: "Konzentration & Fokus",
      description: "Jonglieren erfordert volle Aufmerksamkeit und verbessert nachweislich die Konzentrationsfähigkeit."
    },
    {
      icon: KoordinationIcon,
      title: "Hand-Augen-Koordination",
      description: "Trainiert die Feinmotorik und die Koordination zwischen beiden Gehirnhälften."
    },
    {
      icon: SelbstvertrauenIcon,
      title: "Selbstvertrauen",
      description: "Erfolgserlebnisse beim Erlernen neuer Fertigkeiten stärken das Selbstbewusstsein."
    },
    {
      icon: SpassMotivationIcon,
      title: "Spaß & Motivation",
      description: "Spielerisches Lernen in einer positiven Atmosphäre motiviert und begeistert."
    },
    {
      icon: StressabbauIcon,
      title: "Stressabbau",
      description: "Die meditative Wirkung des Jonglierens hilft beim Entspannen und Stressabbau."
    },
    {
      icon: TeambuildingIcon,
      title: "Teambuilding",
      description: "Gemeinsame Herausforderungen schweißen Teams zusammen und fördern den Zusammenhalt."
    }
  ];

  const content = workshopContent[activeTab as keyof typeof workshopContent];

  return (
    <section id="workshops" className="py-20" style={{ backgroundColor: '#e5e7eb' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title" style={{ color: '#1f2937' }}>
            Interaktive <span className="text-primary">Workshops</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
            Entdecken Sie maßgeschneiderte Jonglier-Workshops für verschiedene Zielgruppen und Anlässe. Lernen Sie von einem Weltmeister!
          </p>
        </div>
        
        {/* Workshop Type Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {workshopTypes.map(type => (
            <button
              key={type.id}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === type.id 
                  ? "bg-primary text-white" 
                  : "hover:bg-gray-300"
              }`}
              style={{
                backgroundColor: activeTab === type.id ? undefined : '#d1d5db',
                color: activeTab === type.id ? undefined : '#374151'
              }}
              onClick={() => setActiveTab(type.id)}
            >
              {type.name}
            </button>
          ))}
        </div>
        
        {/* Workshop Content */}
        {activeTab === "schools" ? (
          <div className="mb-16">
            {/* Content layout with proper spacing */}
            <div className="space-y-4">
              {/* Title and Text */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="font-montserrat font-bold text-2xl mb-4" style={{ color: '#1f2937' }}>
                    {content.title}
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: '#6b7280' }}>
                    In einer ca. 45-minütigen Einheit können die Kinder Jonglieren mit Tüchern, Bällen, Tellern und Diabolos ausprobieren und lernen. An Schulen bietet es sich an, dass die ganze Schule an einem oder zwei Vormittagen teilnehmen kann. 1-3 Klassen je Schuleinheit mit einer möglichen Abschlussperformance für alle Schüler und Lehrer.
                  </p>
                </div>
                
                {/* Image Slider - reduced height */}
                <div>
                  <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
                    >
                      {schoolImages.map((image, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                          <div className="relative w-full h-64">
                            <img
                              src={image}
                              alt={`School Workshop ${index + 1}`}
                              className="absolute inset-0 w-full h-full object-cover school-workshop-image"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Slider dots */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {schoolImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlideIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            currentSlideIndex === index ? 'bg-primary' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Benefits and Video section with reduced gap */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Benefits list without button */}
                <div>
                  <ul className="space-y-3">
                    <li className="flex items-center p-3 rounded-lg shadow-sm" style={{ backgroundColor: 'white', color: '#374151' }}>
                      <i className="bx bx-check-circle text-primary text-xl mr-3"></i>
                      <span style={{ color: '#1f2937', fontWeight: '500' }}>45-minütige Lerneinheiten mit Tüchern, Bällen, Tellern und Diabolos</span>
                    </li>
                    <li className="flex items-center p-3 rounded-lg shadow-sm" style={{ backgroundColor: 'white', color: '#374151' }}>
                      <i className="bx bx-check-circle text-primary text-xl mr-3"></i>
                      <span style={{ color: '#1f2937', fontWeight: '500' }}>Abschlussperformance für alle Schüler und Lehrer möglich</span>
                    </li>
                    <li className="flex items-center p-3 rounded-lg shadow-sm" style={{ backgroundColor: 'white', color: '#374151' }}>
                      <i className="bx bx-check-circle text-primary text-xl mr-3"></i>
                      <span style={{ color: '#1f2937', fontWeight: '500' }}>Förderung der Koordination, der Konzentrationsfähigkeit und motorischen Entwicklung</span>
                    </li>
                    <li className="flex items-center p-3 rounded-lg shadow-sm" style={{ backgroundColor: 'white', color: '#374151' }}>
                      <i className="bx bx-check-circle text-primary text-xl mr-3"></i>
                      <span style={{ color: '#1f2937', fontWeight: '500' }}>Stärkung des Selbstvertrauens durch Erfolgserlebnisse</span>
                    </li>
                    <li className="flex items-center p-3 rounded-lg shadow-sm" style={{ backgroundColor: 'white', color: '#374151' }}>
                      <i className="bx bx-check-circle text-primary text-xl mr-3"></i>
                      <span style={{ color: '#1f2937', fontWeight: '500' }}>Entwicklung von Geduld und Durchhaltevermögen</span>
                    </li>
                  </ul>
                </div>
                
                {/* Video */}
                <div>
                  <div className="video-container rounded-lg shadow-lg">
                    <iframe 
                      src="https://www.youtube.com/embed/32ASjLyy_78" 
                      title="School Workshop Video" 
                      frameBorder="0" 
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                </div>
              </div>
              
              {/* Button separate at bottom */}
              <div className="mt-8">
                <Link href="/contact" className="btn-primary inline-block">
                  Workshop anfragen
                </Link>
              </div>
              
              {/* School Testimonials Slider */}
              <div className="mt-12">
                <h4 className="font-montserrat font-bold text-xl mb-6 text-center" style={{ color: '#1f2937' }}>
                  Referenzen von Schulen & Bildungseinrichtungen
                </h4>
                <div className="relative">
                  <div className="overflow-hidden">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentSchoolTestimonialIndex * 100}%)` }}
                    >
                      {schoolTestimonials.map((testimonial, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-4">
                          <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: 'white' }}>
                            <div className="flex text-yellow-400 mb-4">
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                            </div>
                            <p className="mb-6 italic" style={{ color: '#374151' }}>
                              "{testimonial.text}"
                            </p>
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                                <span className="text-white font-bold text-lg">
                                  {testimonial.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <h5 className="font-medium" style={{ color: '#1f2937' }}>{testimonial.name}</h5>
                                <p className="text-sm" style={{ color: '#6b7280' }}>{testimonial.position}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Navigation dots */}
                  <div className="flex justify-center mt-6">
                    <div className="flex space-x-2">
                      {schoolTestimonials.map((_, index) => (
                        <button 
                          key={index}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            currentSchoolTestimonialIndex === index 
                              ? "bg-primary" 
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                          onClick={() => setCurrentSchoolTestimonialIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h3 className="font-montserrat font-bold text-2xl mb-4" style={{ color: '#1f2937' }}>
                {content.title}
              </h3>
              <p className="mb-6" style={{ color: '#6b7280' }}>
                {content.description}
              </p>
              <ul className="space-y-3 mb-8">
                {content.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center p-3 rounded-lg shadow-sm" style={{ backgroundColor: 'white', color: '#374151' }}>
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span style={{ color: '#1f2937', fontWeight: '500' }}>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary inline-block">
                Workshop anfragen
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-primary/10 rounded-full"></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-secondary/10 rounded-full"></div>
              <img
                src={content.imageUrl}
                alt={content.title}
                className="rounded-lg shadow-lg relative z-10 w-full h-auto"
              />
            </div>
          </div>
        )}
        
        {/* Workshop Benefits Section */}
        <div className="bg-white rounded-xl p-8 mt-16 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="font-montserrat font-bold text-3xl mb-4" style={{ color: '#1f2937' }}>
              Workshop <span className="text-primary">Vorteile</span>
            </h3>
            <p className="text-lg" style={{ color: '#6b7280' }}>
              Entdecken Sie die vielfältigen Vorteile unserer Jonglage-Workshops
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshopBenefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: '#f9fafb' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <img src={benefit.icon} alt={benefit.title} className="w-8 h-8" style={{ filter: 'brightness(0) saturate(100%) invert(19%) sepia(96%) saturate(7471%) hue-rotate(354deg) brightness(103%) contrast(98%)' }} />
                </div>
                <h4 className="font-montserrat font-semibold text-xl mb-3" style={{ color: '#1f2937' }}>
                  {benefit.title}
                </h4>
                <p style={{ color: '#6b7280' }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Workshop Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {workshopFeatures.map((feature, index) => (
            <div key={index} className="bg-primary p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md">
                <img src={feature.icon} alt={feature.title} className="w-8 h-8" style={{ filter: 'brightness(0) saturate(100%) invert(19%) sepia(96%) saturate(7471%) hue-rotate(354deg) brightness(103%) contrast(98%)' }} />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-800 p-8 rounded-lg mt-16 text-center">
          <h3 className="font-montserrat font-semibold text-2xl mb-4 text-white">
            Interessiert an einem maßgeschneiderten Workshop?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Kontaktieren Sie mich für weitere Informationen und ein individuelles Angebot.
          </p>
          <Link 
            href="/contact" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
          >
            Jetzt anfragen
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}