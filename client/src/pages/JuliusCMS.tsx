import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

export default function JuliusCMS() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "jonglissimo2024") {
      setIsAuthenticated(true);
    } else {
      alert("Falsches Passwort");
    }
  };

  const cmsModules = [
    {
      id: "news",
      title: "News verwalten",
      description: "Nachrichten und Updates bearbeiten",
      icon: "📰",
      path: "/news-manager"
    },
    {
      id: "shows",
      title: "Shows verwalten", 
      description: "Acts und Performances bearbeiten",
      icon: "🎭",
      path: "/acts-manager"
    },
    {
      id: "media",
      title: "Medien verwalten",
      description: "Bilder und Videos organisieren",
      icon: "📸",
      path: "/media-manager"
    },
    {
      id: "erfolge",
      title: "Erfolge verwalten",
      description: "Auszeichnungen und Achievements bearbeiten",
      icon: "🏆",
      path: "/erfolge-manager"
    },
    {
      id: "features",
      title: "Features verwalten",
      description: "Show-Features und Eigenschaften bearbeiten",
      icon: "⭐",
      path: "/features-manager"
    },
    {
      id: "instagram",
      title: "Instagram verwalten",
      description: "Social Media Posts bearbeiten",
      icon: "📱",
      path: "/instagram-manager"
    },
    {
      id: "rezensionen",
      title: "Rezensionen verwalten",
      description: "Kundenbewertungen und Testimonials bearbeiten",
      icon: "💬",
      path: "/rezensionen-manager"
    }
  ];

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Julius CMS - Anmeldung</title>
        </Helmet>
        
        <Header />
        
        <main className="min-h-screen bg-gray-50 flex items-center justify-center py-24">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Julius CMS
                </h1>
                <p className="text-gray-600">
                  Content Management System
                </p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Passwort
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Passwort eingeben"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-md transition-colors"
                >
                  Anmelden
                </button>
              </form>
            </div>
          </div>
        </main>
        
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Julius CMS - Dashboard</title>
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Julius CMS Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Verwalten Sie alle Inhalte Ihrer Website von einem zentralen Ort aus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {cmsModules.map((module) => (
              <div
                key={module.id}
                onClick={() => setLocation(module.path)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4 text-center">
                    {module.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {module.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPassword("");
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}