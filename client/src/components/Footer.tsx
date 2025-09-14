import { Link } from "wouter";
import { useTheme } from "@/lib/ThemeProvider";

export default function Footer() {
  const { toggleTheme, theme } = useTheme();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <i className="bx bx-analyse text-white text-xl"></i>
              </div>
              <span className="font-montserrat font-bold text-xl">
                Julius<span className="text-primary">Preu</span>
              </span>
            </div>
            <p className="text-white mb-6">
              Professioneller Jongleur, Weltmeister und Künstler mit atemberaubenden Shows für Events, Festivals und Galas.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/jugglingaroundtheworld/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <i className="bx bxl-instagram text-xl"></i>
              </a>
              <a href="https://www.facebook.com/julius.preu" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <i className="bx bxl-facebook text-xl"></i>
              </a>
              <a href="https://www.youtube.com/@juliuspreu4881" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <i className="bx bxl-youtube text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6 text-primary">Navigation</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/shows" className="text-white hover:text-primary transition-colors">Shows</Link></li>
              <li><Link href="/workshops" className="text-white hover:text-primary transition-colors">Workshops</Link></li>
              <li><Link href="/about" className="text-white hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/media" className="text-white hover:text-primary transition-colors">Presse</Link></li>
              <li><Link href="/contact" className="text-white hover:text-primary transition-colors">Kontakt</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6 text-primary">Show-Typen</h3>
            <ul className="space-y-3">
              <li><a href="#shows" className="text-white hover:text-primary transition-colors">Solo Shows</a></li>
              <li><a href="#shows" className="text-white hover:text-primary transition-colors">Gravitos Acts</a></li>
              <li><a href="#shows" className="text-white hover:text-primary transition-colors">Jonglissimo Acts</a></li>
              <li><a href="#workshops" className="text-white hover:text-primary transition-colors">Firmen-Workshops</a></li>
              <li><a href="#workshops" className="text-white hover:text-primary transition-colors">Schulprogramme</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6 text-primary">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <img src="/E-Mail.svg" alt="E-Mail" className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) saturate(100%) invert(19%) sepia(96%) saturate(7471%) hue-rotate(354deg) brightness(103%) contrast(98%)' }} />
                <a href="mailto:info@juliuspreu.com" className="text-white hover:text-primary transition-colors">info@juliuspreu.com</a>
              </li>
              <li className="flex items-center">
                <img src="/Telefon.svg" alt="Telefon" className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) saturate(100%) invert(19%) sepia(96%) saturate(7471%) hue-rotate(354deg) brightness(103%) contrast(98%)' }} />
                <a href="tel:+436606807965" className="text-white hover:text-primary transition-colors">+43 660 680 79 65</a>
              </li>
              <li className="flex items-center">
                <img src="/Standort.svg" alt="Standort" className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) saturate(100%) invert(19%) sepia(96%) saturate(7471%) hue-rotate(354deg) brightness(103%) contrast(98%)' }} />
                <span className="text-white">Sierning, Oberösterreich</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <button 
                onClick={toggleTheme}
                className="flex items-center text-white hover:text-primary transition-colors"
              >
                <i className={`bx ${theme === 'dark' ? 'bx-sun' : 'bx-moon'} mr-2`}></i>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Julius Preu. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-white hover:text-primary text-sm">Datenschutz</Link>
              <Link href="/imprint" className="text-white hover:text-primary text-sm">Impressum</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
