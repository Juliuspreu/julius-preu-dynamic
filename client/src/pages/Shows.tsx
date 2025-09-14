import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShowsSection from "@/components/ShowsSection";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Feature } from "@shared/schema";

export default function Shows() {
  const { data: features, isLoading } = useQuery<Feature[]>({
    queryKey: ["/api/features"],
  });

  return (
    <>
      <Helmet>
        <title>Spektakuläre Jonglage Shows | Julius Preu - LED & Licht Performances</title>
        <meta name="description" content="Buchen Sie spektakuläre Jonglage-Shows von Weltmeister Julius Preu: LED Light Shows, Solo Performances und Duo Acts. Kings Gambit, Nightlight und mehr für unvergessliche Events." />
        <meta name="keywords" content="Jonglage Show buchen, LED Jonglage Performance, Kings Gambit Show, Solo Jonglage Act, Duo Performance, Event Entertainment, Julius Preu Shows" />
        <meta property="og:title" content="Spektakuläre Jonglage Shows | Julius Preu" />
        <meta property="og:description" content="Entdecken Sie die beeindruckenden Show-Formate von Weltmeister Julius Preu: LED Light Shows, Solo Performances und Duo Acts für unvergessliche Events." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://juliuspreu.com/shows" />
        <meta property="og:image" content="https://juliuspreu.com/20240627-DSC03407.jpg" />
        <link rel="canonical" href="https://juliuspreu.com/shows" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/header-shows.jpg" 
          alt="Julius Preu Performance" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Shows
          </h1>
        </div>
      </section>

      <main>
        <ShowsSection />

        {/* Performance Details */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Was macht unsere Shows <span className="text-primary">besonders?</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Jede Performance wird individuell auf Ihre Veranstaltung abgestimmt und mit höchster Präzision ausgeführt.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img src="/Weltmeister-Qualitaet.svg" alt="Weltmeister-Qualität" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Weltmeister-Qualität</h3>
                <p className="text-white">
                  Performances auf höchstem Niveau von einem mehrfachen Weltmeister im Jonglieren.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img src="/Individuelle Anpassung.svg" alt="Individuelle Anpassung" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Individuelle Anpassung</h3>
                <p className="text-white">
                  Jede Show wird speziell auf Ihre Veranstaltung, Ihr Publikum und Ihre Wünsche zugeschnitten.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img src="/Innovation u Technik.svg" alt="Innovation & Technik" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Innovation & Technik</h3>
                <p className="text-white">
                  Modernste LED-Technik und innovative Choreographien für unvergessliche Erlebnisse.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img src="/Flexible Dauer.svg" alt="Flexible Dauer" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Flexible Dauer</h3>
                <p className="text-white">
                  Show-Längen von 8-20 Minuten, je nach Veranstaltungsformat und Ihren Anforderungen.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img src="/Alle Eventgroeßen.svg" alt="Alle Eventgrößen" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Alle Eventgrößen</h3>
                <p className="text-white">
                  Von intimen Veranstaltungen mit 30 Gästen bis zu großen Events mit über 1000 Zuschauern.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img src="/Professionell u Zuverlaessig.svg" alt="Professionell & Zuverlässig" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Professionell & Zuverlässig</h3>
                <p className="text-white">
                  Pünktlich, professionell und mit kompletter technischer Ausstattung für Ihre Veranstaltung.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Bereit für eine unvergessliche Show?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für eine persönliche Beratung und ein maßgeschneidertes Angebot für Ihre Veranstaltung.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Show jetzt buchen
              <i className="bx bx-right-arrow-alt ml-2 text-xl"></i>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}