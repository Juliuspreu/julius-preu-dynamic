import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const savePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Cookie-Einstellungen</h3>
            <p className="text-gray-300 text-sm mb-4">
              Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten. 
              Einige Cookies sind notwendig für die Funktionalität, andere helfen uns bei der Analyse und Verbesserung.
            </p>
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="mr-2"
                />
                <span className="text-sm">Notwendige Cookies (immer aktiv)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm">Analyse-Cookies</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm">Marketing-Cookies</span>
              </label>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 lg:ml-4">
            <button
              onClick={acceptNecessary}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm font-medium transition-colors"
            >
              Nur notwendige
            </button>
            <button
              onClick={savePreferences}
              className="px-4 py-2 bg-primary hover:bg-primary/90 rounded text-sm font-medium transition-colors"
            >
              Auswahl speichern
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-medium transition-colors"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-gray-400">
          Weitere Informationen finden Sie in unserer{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Datenschutzerklärung
          </a>
        </div>
      </div>
    </div>
  );
}