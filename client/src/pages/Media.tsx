import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaSection from "@/components/MediaSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Helmet } from "react-helmet";
import { Link } from "wouter";

export default function Media() {
  return (
    <>
      <Helmet>
        <title>Medien & Presse | Julius Preu - Videos, Fotos & Presseberichte</title>
        <meta name="description" content="Entdecken Sie Videos, Fotos und Presseberichte über Weltmeister Julius Preu. TV-Auftritte, Presseartikel und beeindruckende Performance-Videos." />
        <meta name="keywords" content="Julius Preu Videos, Jonglage Videos, Presse Julius Preu, TV Auftritte, Performance Videos, Medienberichte Jonglage" />
        <meta property="og:title" content="Medien & Presse | Julius Preu - Videos, Fotos & Presseberichte" />
        <meta property="og:description" content="Entdecken Sie Videos, Fotos und Presseberichte über Weltmeister Julius Preu. TV-Auftritte und beeindruckende Performance-Videos." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://juliuspreu.com/media" />
        <meta property="og:image" content="https://juliuspreu.com/20240627-DSC03407.jpg" />
        <link rel="canonical" href="https://juliuspreu.com/media" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/header-presse.jpg" 
          alt="Julius Preu Medien" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Medien & Presse
          </h1>
        </div>
      </section>

      <main>
        <MediaSection />

        {/* Press Kit Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Presse & <span className="text-primary">Download</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hier finden Sie alle wichtigen Materialien für Ihre Berichterstattung.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="/Pressefotos.svg" alt="Pressefotos" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-red-500 mb-3">Pressefotos</h3>
                <p className="text-gray-300 mb-4">
                  Hochauflösende Fotos von Performances und Portraits für Ihre Berichterstattung.
                </p>
                <a href="#" className="text-primary hover:text-primary/80 font-semibold">
                  Download (ZIP, 15MB)
                </a>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="/Biographie.svg" alt="Biographie" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-red-500 mb-3">Biografien</h3>
                <p className="text-gray-300 mb-4">
                  Kurze und ausführliche Biografien sowie Fact-Sheets über Julius Preu.
                </p>
                <a href="#" className="text-primary hover:text-primary/80 font-semibold">
                  Download (PDF, 2MB)
                </a>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="/Video-Material.svg" alt="Video-Material" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-semibold text-red-500 mb-3">Video-Material</h3>
                <p className="text-gray-300 mb-4">
                  Demo-Videos und Performance-Ausschnitte in verschiedenen Formaten.
                </p>
                <a href="#" className="text-primary hover:text-primary/80 font-semibold">
                  Download (ZIP, 250MB)
                </a>
              </div>
            </div>


          </div>
        </section>

        {/* Media Coverage */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Mediale <span className="text-primary">Aufmerksamkeit</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Julius Preu in den Medien - eine Auswahl der medialen Berichterstattung.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img src="/Video-Material.svg" alt="Video-Material" className="w-8 h-8 filter brightness-0" />
                </div>
                <h4 className="text-xl font-semibold text-primary mb-3">ORF Sport</h4>
                <p className="text-gray-600">Weltmeisterschaft 2024 - Live-Übertragung der Jonglier-Championships</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img src="/Pressefotos.svg" alt="Pressefotos" className="w-8 h-8 filter brightness-0" />
                </div>
                <h4 className="text-xl font-semibold text-primary mb-3">Kurier</h4>
                <p className="text-gray-600">"Der Mann mit den fliegenden Keulen" - Ausführliches Portrait</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img src="/Pressefotos.svg" alt="Pressefotos" className="w-8 h-8 filter brightness-0" />
                </div>
                <h4 className="text-xl font-semibold text-primary mb-3">Die Presse</h4>
                <p className="text-gray-600">Portrait: "Präzision in Perfektion" - Über die Kunst der Jonglage</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img src="/Video-Material.svg" alt="Video-Material" className="w-8 h-8 filter brightness-0" />
                </div>
                <h4 className="text-xl font-semibold text-primary mb-3">Der Standard</h4>
                <p className="text-gray-600">Interview: "Jonglieren als Kunstform" - Einblicke in die Profi-Welt</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Interesse an einem Interview oder Feature?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für Presseanfragen, Interviews oder exklusives Material für Ihre Berichterstattung.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Presseanfrage stellen
              <i className="bx bx-right-arrow-alt ml-2 text-xl"></i>
            </Link>
          </div>
        </section>

        {/* Press Contact - GANZ NACH UNTEN */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pressekontakt
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Für Presseanfragen und weitere Materialien kontaktieren Sie uns gerne direkt:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <img src="/E-Mail.svg" alt="Email" className="w-6 h-6 filter brightness-0" />
                  <a href="mailto:info@juliuspreu.com" className="text-xl text-primary hover:text-red-400 font-medium">
                    info@juliuspreu.com
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <img src="/Telefon.svg" alt="Telefon" className="w-6 h-6 filter brightness-0" />
                  <a href="tel:+4366068079665" className="text-xl text-primary hover:text-red-400 font-medium">
                    +43 660 680 79 65
                  </a>
                </div>
              </div>
              

            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}