import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Videokurs() {
  return (
    <>
      <Helmet>
        <title>Online Videokurs - Jonglieren lernen | Julius Preu</title>
        <meta name="description" content="Lernen Sie Jonglieren mit dem umfassenden Online-Videokurs von Weltmeister Julius Preu. Für Kinder und Anfänger geeignet - Tücher, Bälle, Teller, Diabolos, Ringe und Keulen." />
        <meta name="keywords" content="Jonglieren lernen, Videokurs, Online Tutorial, Jonglage Kurs, Jonglieren Anfänger, Kinder Jonglieren" />
        <meta property="og:title" content="Online Videokurs - Jonglieren lernen | Julius Preu" />
        <meta property="og:description" content="Lernen Sie Jonglieren mit dem umfassenden Online-Videokurs von Weltmeister Julius Preu. Für Kinder und Anfänger geeignet." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://juliuspreu.com/videokurs" />
        <meta property="og:image" content="https://juliuspreu.com/JPI_3313.jpg" />
        <link rel="canonical" href="https://juliuspreu.com/videokurs" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/header-videokurs.jpg" 
          alt="Videokurs Julius Preu" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Jonglieren lernen
          </h1>
        </div>
      </section>

      <main>
        {/* Course Overview Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Lernen Sie Jonglieren von einem Weltmeister
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Umfassende Video-Tutorials für alle Schwierigkeitsstufen - perfekt für Kinder und Anfänger geeignet. 
                Schritt für Schritt erklärt von Julius Preu.
              </p>
            </div>

            {/* Course Preview Video */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l7-5-7-5z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">Kurs-Vorschau Video</p>
                    <p className="text-sm text-gray-500">Klicken Sie hier für einen Einblick in den Kurs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: "Tücher",
                  description: "Sanfter Einstieg in die Jonglage mit bunten Tüchern"
                },
                {
                  title: "Bälle",
                  description: "Klassisches Balljonglieren von den Grundlagen bis zu fortgeschrittenen Tricks"
                },
                {
                  title: "Teller",
                  description: "Spektakuläres Tellerdrehen und -jonglieren lernen"
                },
                {
                  title: "Diabolos",
                  description: "Beeindruckende Diabolo-Tricks und -Techniken"
                },
                {
                  title: "Ringe",
                  description: "Elegantes Ringjonglieren für fortgeschrittene Techniken"
                },
                {
                  title: "Keulen",
                  description: "Professionelle Keulen-Jonglage wie bei den Weltmeisterschaften"
                }
              ].map((skill, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{skill.title}</h3>
                  <p className="text-gray-600">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Wählen Sie Ihren Kurs
              </h2>
              <p className="text-xl text-gray-600">
                Zwei Kursoptionen, perfekt abgestimmt auf Ihre Bedürfnisse
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Basic Course */}
              <div className="bg-white rounded-lg shadow-lg p-8 relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Basis Kurs</h3>
                  <div className="text-4xl font-bold text-primary mb-2">19,99€</div>
                  <p className="text-gray-600">Perfekt für den Einstieg und ambitionierte Sportler</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-900">Jonglieren mit Tüchern</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-900">Grundlagen Balljonglieren</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-900">Für Kinder & Anfänger geeignet</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-900">Lebenslanger Zugang</span>
                  </li>
                </ul>
                
                <button className="w-full btn-primary">
                  Basis Kurs kaufen
                </button>
              </div>

              {/* Premium Course */}
              <div className="bg-white rounded-lg shadow-lg p-8 relative border-2 border-primary">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Beliebt
                  </span>
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Komplett Kurs</h3>
                  <div className="text-4xl font-bold text-primary mb-2">49,99€</div>
                  <p className="text-gray-600">Alles was Sie brauchen</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-900">Alle Jonglage-Gegenstände</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-900">Tücher, Bälle, Teller, Diabolos</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-900">Ringe & Keulen</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-900">Fortgeschrittene Techniken</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-900">Bonus Materialien</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-900">Lebenslanger Zugang</span>
                  </li>
                </ul>
                
                <button className="w-full btn-primary">
                  Komplett Kurs kaufen
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Was macht unseren Kurs besonders?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <img src="/Weltmeister-Expertise.svg" alt="Weltmeister-Expertise" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Weltmeister-Expertise</h3>
                <p className="text-gray-600">
                  Lernen Sie von Julius Preu, mehrfachem Jonglierweltmeister mit jahrzehntelanger Erfahrung
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <img src="/Schritt-fuer-Schritt.svg" alt="Schritt-für-Schritt" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Schritt-für-Schritt</h3>
                <p className="text-gray-600">
                  Strukturierte Lektionen vom ersten Wurf bis zu fortgeschrittenen Techniken
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <img src="/Fuer alle Altersgruppen.svg" alt="Für alle Altersgruppen" className="w-8 h-8 filter brightness-0 invert" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Für alle Altersgruppen</h3>
                <p className="text-gray-600">
                  Speziell entwickelt für Kinder und Anfänger, aber auch für Fortgeschrittene geeignet
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}