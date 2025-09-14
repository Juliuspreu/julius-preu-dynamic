import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { Helmet } from "react-helmet";
import { Link } from "wouter";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Kontakt | Julius Preu - Jonglage Show & Workshop buchen</title>
        <meta name="description" content="Kontaktieren Sie Weltmeister Julius Preu für Ihre nächste Veranstaltung. Shows und Workshops in Deutschland und Österreich. Schnelle Antwort garantiert." />
        <meta name="keywords" content="Julius Preu Kontakt, Jonglage buchen, Show anfragen, Workshop buchen, Event Anfrage, Jonglage Performance buchen" />
        <meta property="og:title" content="Kontakt | Julius Preu - Jonglage Show & Workshop buchen" />
        <meta property="og:description" content="Kontaktieren Sie Weltmeister Julius Preu für Ihre nächste Veranstaltung. Shows und Workshops in Deutschland und Österreich verfügbar." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://juliuspreu.com/contact" />
        <meta property="og:image" content="https://juliuspreu.com/Juli.jpg" />
        <link rel="canonical" href="https://juliuspreu.com/contact" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/header-kontakt.jpg" 
          alt="Julius Preu Kontakt" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Kontakt
          </h1>
        </div>
      </section>

      <main>
        <ContactSection />

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Häufig gestellte <span className="text-primary">Fragen</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hier finden Sie Antworten auf die wichtigsten Fragen rund um Buchungen und Performances.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  onClick={(e) => {
                    const content = e.currentTarget.nextElementSibling;
                    const icon = e.currentTarget.querySelector('.faq-icon');
                    if (content?.classList.contains('hidden')) {
                      content.classList.remove('hidden');
                      icon?.classList.add('rotate-180');
                    } else {
                      content?.classList.add('hidden');
                      icon?.classList.remove('rotate-180');
                    }
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Wie weit im Voraus sollte ich buchen?
                  </h3>
                  <i className="bx bx-chevron-down text-primary text-xl faq-icon transition-transform"></i>
                </button>
                <div className="hidden px-6 py-4 bg-white">
                  <p className="text-gray-600">
                    Für optimale Planung empfehlen wir eine Buchung 2-3 Monate im Voraus. 
                    Bei kurzfristigeren Anfragen kontaktieren Sie uns gerne - oft ist auch 
                    eine spontane Buchung möglich.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  onClick={(e) => {
                    const content = e.currentTarget.nextElementSibling;
                    const icon = e.currentTarget.querySelector('.faq-icon');
                    if (content?.classList.contains('hidden')) {
                      content.classList.remove('hidden');
                      icon?.classList.add('rotate-180');
                    } else {
                      content?.classList.add('hidden');
                      icon?.classList.remove('rotate-180');
                    }
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Welche technischen Voraussetzungen gibt es?
                  </h3>
                  <i className="bx bx-chevron-down text-primary text-xl faq-icon transition-transform"></i>
                </button>
                <div className="hidden px-6 py-4 bg-white">
                  <p className="text-gray-600">
                    Für LED-Shows benötigen wir einen abgedunkelten Raum und Stromanschluss. 
                    Alle weiteren technischen Details besprechen wir gerne individuell je nach 
                    Veranstaltungsort und Show-Format.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  onClick={(e) => {
                    const content = e.currentTarget.nextElementSibling;
                    const icon = e.currentTarget.querySelector('.faq-icon');
                    if (content?.classList.contains('hidden')) {
                      content.classList.remove('hidden');
                      icon?.classList.add('rotate-180');
                    } else {
                      content?.classList.add('hidden');
                      icon?.classList.remove('rotate-180');
                    }
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sind die Workshops für Anfänger geeignet?
                  </h3>
                  <i className="bx bx-chevron-down text-primary text-xl faq-icon transition-transform"></i>
                </button>
                <div className="hidden px-6 py-4 bg-white">
                  <p className="text-gray-600">
                    Absolut! Alle Workshops werden individuell auf das Niveau der Teilnehmer 
                    angepasst. Auch komplette Anfänger können erfolgreich teilnehmen und 
                    schnell erste Erfolge erzielen.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  onClick={(e) => {
                    const content = e.currentTarget.nextElementSibling;
                    const icon = e.currentTarget.querySelector('.faq-icon');
                    if (content?.classList.contains('hidden')) {
                      content.classList.remove('hidden');
                      icon?.classList.add('rotate-180');
                    } else {
                      content?.classList.add('hidden');
                      icon?.classList.remove('rotate-180');
                    }
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Welche Kosten entstehen für eine Buchung?
                  </h3>
                  <i className="bx bx-chevron-down text-primary text-xl faq-icon transition-transform"></i>
                </button>
                <div className="hidden px-6 py-4 bg-white">
                  <p className="text-gray-600">
                    Die Preise variieren je nach Show-Format, Dauer und Aufwand. 
                    Gerne erstellen wir Ihnen ein individuelles, unverbindliches Angebot 
                    basierend auf Ihren spezifischen Anforderungen.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  onClick={(e) => {
                    const content = e.currentTarget.nextElementSibling;
                    const icon = e.currentTarget.querySelector('.faq-icon');
                    if (content?.classList.contains('hidden')) {
                      content.classList.remove('hidden');
                      icon?.classList.add('rotate-180');
                    } else {
                      content?.classList.add('hidden');
                      icon?.classList.remove('rotate-180');
                    }
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Reisen Sie auch international?
                  </h3>
                  <i className="bx bx-chevron-down text-primary text-xl faq-icon transition-transform"></i>
                </button>
                <div className="hidden px-6 py-4 bg-white">
                  <p className="text-gray-600">
                    Ja, gerne! Neben Deutschland und Österreich sind auch internationale 
                    Auftritte möglich. Sprechen Sie uns einfach an und wir besprechen die 
                    Details Ihrer Veranstaltung.
                  </p>
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