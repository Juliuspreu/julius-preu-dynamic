import { useState } from "react";

interface EditableContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  showsTitle: string;
  showsDescription: string;
  contactEmail: string;
  contactPhone: string;
}

export default function SimpleAdmin() {
  const [content, setContent] = useState<EditableContent>({
    heroTitle: "Präzise Jonglage trifft Innovation",
    heroSubtitle: "Weltmeister-Performances für unvergessliche Events und inspirierende Workshops",
    aboutTitle: "Über Julius Preu",
    aboutDescription: "Als Weltmeister im Jonglieren bringe ich über 15 Jahre Erfahrung in die Welt der präzisen Jonglage ein. Meine Leidenschaft liegt darin, die Grenzen des Möglichen zu erweitern und dabei Eleganz mit Innovation zu verbinden.",
    showsTitle: "Spektakuläre Shows",
    showsDescription: "Von eleganter Solo-Performance bis zur großen LED-Show - jede Darbietung wird individuell auf Ihr Event abgestimmt.",
    contactEmail: "info@juliuspreu.com",
    contactPhone: "+49 (0) 123 456 789"
  });

  const [activeSection, setActiveSection] = useState("hero");

  const handleSave = () => {
    // Hier würdest du normalerweise die Daten an einen Server senden
    localStorage.setItem('websiteContent', JSON.stringify(content));
    alert('Änderungen gespeichert! Aktualisiere die Hauptseite, um die Änderungen zu sehen.');
  };

  const handleReset = () => {
    localStorage.removeItem('websiteContent');
    window.location.reload();
  };

  const sections = [
    { id: "hero", name: "Hero Bereich", icon: "🏠" },
    { id: "about", name: "Über mich", icon: "👤" },
    { id: "shows", name: "Shows", icon: "🎭" },
    { id: "contact", name: "Kontakt", icon: "📞" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Website Editor</h1>
            <div className="flex gap-3">
              <a 
                href="/" 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Zur Website
              </a>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Zurücksetzen
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Bereiche bearbeiten</h2>
              <nav className="space-y-2">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-md transition-colors flex items-center gap-3 ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">{section.icon}</span>
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">
                {sections.find(s => s.id === activeSection)?.name} bearbeiten
              </h2>

              {/* Hero Section */}
              {activeSection === "hero" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Hauptüberschrift</label>
                    <input
                      type="text"
                      value={content.heroTitle}
                      onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Untertitel</label>
                    <textarea
                      value={content.heroSubtitle}
                      onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* About Section */}
              {activeSection === "about" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Überschrift</label>
                    <input
                      type="text"
                      value={content.aboutTitle}
                      onChange={(e) => setContent({ ...content, aboutTitle: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Beschreibung</label>
                    <textarea
                      value={content.aboutDescription}
                      onChange={(e) => setContent({ ...content, aboutDescription: e.target.value })}
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Shows Section */}
              {activeSection === "shows" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Shows Überschrift</label>
                    <input
                      type="text"
                      value={content.showsTitle}
                      onChange={(e) => setContent({ ...content, showsTitle: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Shows Beschreibung</label>
                    <textarea
                      value={content.showsDescription}
                      onChange={(e) => setContent({ ...content, showsDescription: e.target.value })}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeSection === "contact" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">E-Mail Adresse</label>
                    <input
                      type="email"
                      value={content.contactEmail}
                      onChange={(e) => setContent({ ...content, contactEmail: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefonnummer</label>
                    <input
                      type="tel"
                      value={content.contactPhone}
                      onChange={(e) => setContent({ ...content, contactPhone: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Preview */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-3">Vorschau:</h3>
                {activeSection === "hero" && (
                  <div>
                    <h4 className="text-lg font-bold">{content.heroTitle}</h4>
                    <p className="text-gray-600">{content.heroSubtitle}</p>
                  </div>
                )}
                {activeSection === "about" && (
                  <div>
                    <h4 className="text-lg font-bold">{content.aboutTitle}</h4>
                    <p className="text-gray-600 mt-2">{content.aboutDescription}</p>
                  </div>
                )}
                {activeSection === "shows" && (
                  <div>
                    <h4 className="text-lg font-bold">{content.showsTitle}</h4>
                    <p className="text-gray-600 mt-2">{content.showsDescription}</p>
                  </div>
                )}
                {activeSection === "contact" && (
                  <div>
                    <h4 className="text-lg font-bold">Kontaktdaten</h4>
                    <p className="text-gray-600 mt-2">E-Mail: {content.contactEmail}</p>
                    <p className="text-gray-600">Telefon: {content.contactPhone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}