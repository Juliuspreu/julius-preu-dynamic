import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkshopsSection from "@/components/WorkshopsSection";
import WorkshopTestimonials from "@/components/WorkshopTestimonials";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface Review {
  id: number;
  name: string;
  email?: string;
  rating: number;
  title: string;
  content: string;
  serviceType?: string;
  eventDate?: string;
  location?: string;
  isApproved: boolean;
  isActive: boolean;
  isPublic: boolean;
  sortOrder: number;
  createdAt: string;
}

export default function Workshops() {
  const { data: allReviews, isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews']
  });

  const testimonials = allReviews?.filter(review => 
    review.isApproved && 
    review.isActive && 
    review.isPublic && 
    (review.serviceType === 'workshop' || review.serviceType === 'teambuilding')
  ) || [];

  return (
    <>
      <Helmet>
        <title>Interaktive Jonglage Workshops | Julius Preu - Teambuilding & Schulprogramme</title>
        <meta name="description" content="Professionelle Jonglier-Workshops von Weltmeister Julius Preu für Unternehmen, Schulen und Privatpersonen. Teambuilding, pädagogische Programme und individuelle Trainings." />
        <meta name="keywords" content="Jonglage Workshop, Teambuilding Jonglieren, Schul-Workshop, Corporate Workshop, Jonglieren lernen, Workshop buchen, Julius Preu Workshop" />
        <meta property="og:title" content="Interaktive Jonglage Workshops | Julius Preu" />
        <meta property="og:description" content="Professionelle Jonglier-Workshops für Unternehmen, Schulen und Privatpersonen. Teambuilding und pädagogische Programme vom Weltmeister." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://juliuspreu.com/workshops" />
        <meta property="og:image" content="https://juliuspreu.com/JPI_3313.jpg" />
        <link rel="canonical" href="https://juliuspreu.com/workshops" />
      </Helmet>
      
      <Header />
      
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/header-workshops.jpg" 
          alt="Workshop Julius Preu" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Workshops
          </h1>
        </div>
      </section>

      <main>
        <WorkshopsSection />

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Warum <span className="text-primary">Jonglage-Workshops?</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Jonglieren bietet weit mehr als nur Unterhaltung - es ist ein effektives Tool für persönliche und berufliche Entwicklung.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <img src="/Konzentration u Fokus.svg" alt="Konzentration & Fokus" className="w-6 h-6 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Konzentration & Fokus</h3>
                <p className="text-gray-600">
                  Jonglieren verbessert nachweislich die Konzentrationsfähigkeit und trainiert das Gehirn in der Fokussierung auf komplexe Bewegungsabläufe.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <img src="/Teambuilding.svg" alt="Teambuilding" className="w-6 h-6 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Teambuilding</h3>
                <p className="text-gray-600">
                  Gemeinsames Lernen schafft Verbindungen. Teams entwickeln Vertrauen und Kommunikation durch die gemeinsame Herausforderung.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <img src="/Stressabbau.svg" alt="Stressabbau" className="w-6 h-6 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Stressabbau</h3>
                <p className="text-gray-600">
                  Die rhythmische Bewegung und der Fokus auf den Moment wirken entspannend und helfen beim Abbau von Stress und Anspannung.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <img src="/Selbstvertrauen.svg" alt="Selbstvertrauen" className="w-6 h-6 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Selbstvertrauen</h3>
                <p className="text-gray-600">
                  Erfolgserlebnisse beim Erlernen neuer Fertigkeiten stärken das Selbstvertrauen und die Bereitschaft, neue Herausforderungen anzunehmen.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <img src="/Koordination.svg" alt="Koordination" className="w-6 h-6 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Koordination</h3>
                <p className="text-gray-600">
                  Hand-Augen-Koordination und motorische Fähigkeiten werden gezielt trainiert und verbessert - in jedem Alter.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <img src="/Spass u Motivation.svg" alt="Spaß & Motivation" className="w-6 h-6 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Spaß & Motivation</h3>
                <p className="text-gray-600">
                  Lernen durch Spiel und Freude motiviert nachhaltig und schafft positive Erlebnisse, die lange in Erinnerung bleiben.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center">Lade Bewertungen...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`bx bxs-star ${
                              i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{testimonial.title}</h3>
                    <p className="text-gray-600 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      {testimonial.location && (
                        <p className="text-gray-500 text-sm">{testimonial.location}</p>
                      )}
                      {testimonial.eventDate && (
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(testimonial.eventDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <WorkshopTestimonials />

        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Bereit für einen inspirierenden Workshop?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für eine persönliche Beratung und ein maßgeschneidertes Workshop-Konzept für Ihre Gruppe.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Workshop jetzt anfragen
              <i className="bx bx-right-arrow-alt ml-2 text-xl"></i>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}