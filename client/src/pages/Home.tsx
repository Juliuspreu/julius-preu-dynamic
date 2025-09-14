import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ShowsSection from "@/components/ShowsSection";
import WorkshopsSection from "@/components/WorkshopsSection";
import NewsSection from "@/components/NewsSection";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Julius Preu - Professioneller Jongleur und Performer</title>
        <meta name="description" content="Julius Preu - Weltmeister im Jonglieren mit spektakulären LED- und Lichter-Shows für Events, Festivals und Galas. Buchen Sie einzigartige Performances und Workshops." />
        <meta property="og:title" content="Julius Preu - Jonglage trifft Innovation" />
        <meta property="og:description" content="Entdecken Sie atemberaubende Jonglage-Shows und Workshops von Weltmeister Julius Preu für Ihr nächstes Event." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://juliuspreu.com" />
      </Helmet>
      
      <Header />
      
      <main>
        <HeroSection />
        <ShowsSection />
        <WorkshopsSection />
        <NewsSection />
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Bereit für eine unvergessliche Performance?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie Julius Preu für eine persönliche Beratung und ein maßgeschneidertes Angebot für Ihre Veranstaltung.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Jetzt Kontakt aufnehmen
              <i className="bx bx-right-arrow-alt ml-2 text-xl"></i>
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
