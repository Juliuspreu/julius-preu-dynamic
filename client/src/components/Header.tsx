import { useTheme } from "@/lib/ThemeProvider";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm shadow-md py-2" 
        : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <i className="bx bx-analyse text-white text-xl"></i>
            </div>
            <span className={`font-montserrat font-bold text-xl transition-colors ${
              scrolled ? "text-gray-900" : "text-white"
            }`}>
              Julius<span className="text-primary">Preu</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-6 font-medium">
                <li><Link href="/" onClick={() => window.scrollTo(0, 0)} className={`${scrolled ? "text-gray-900" : "text-white"} hover:text-primary transition-colors`}>Home</Link></li>
                <li><Link href="/shows" onClick={() => window.scrollTo(0, 0)} className={`${scrolled ? "text-gray-900" : "text-white"} hover:text-primary transition-colors`}>Shows</Link></li>
                <li><Link href="/workshops" onClick={() => window.scrollTo(0, 0)} className={`${scrolled ? "text-gray-900" : "text-white"} hover:text-primary transition-colors`}>Workshops</Link></li>
                <li><Link href="/videokurs" onClick={() => window.scrollTo(0, 0)} className={`${scrolled ? "text-gray-900" : "text-white"} hover:text-primary transition-colors`}>Videokurs</Link></li>
                <li><Link href="/about" onClick={() => window.scrollTo(0, 0)} className={`${scrolled ? "text-gray-900" : "text-white"} hover:text-primary transition-colors`}>About</Link></li>
                <li><Link href="/media" onClick={() => window.scrollTo(0, 0)} className={`${scrolled ? "text-gray-900" : "text-white"} hover:text-primary transition-colors`}>Presse</Link></li>
                <li><Link href="/contact" onClick={() => window.scrollTo(0, 0)} className={`${scrolled ? "text-gray-900" : "text-white"} hover:text-primary transition-colors`}>Kontakt</Link></li>
              </ul>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  scrolled || theme === 'dark'
                    ? "hover:bg-gray-100 dark:hover:bg-gray-800" 
                    : "bg-white/10 hover:bg-white/20"
                }`}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <i className={`bx ${theme === 'dark' ? 'bx-sun' : 'bx-moon'} text-2xl ${
                  scrolled 
                    ? "text-gray-600" 
                    : "text-white"
                }`}></i>
              </button>
              
              <a 
                href="#contact" 
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  scrolled || theme === 'dark'
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm hover:scale-105"
                }`}
              >
                Book Now
              </a>
            </div>
          </div>
          
          <button 
            className="md:hidden p-2" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className={`bx bx-menu text-3xl ${
              !scrolled && theme === 'light' ? "text-white" : ""
            }`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <ul className="py-4 px-6 space-y-3 font-medium">
              <li><Link href="/" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
              <li><Link href="/shows" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Shows</Link></li>
              <li><Link href="/workshops" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Workshops</Link></li>
              <li><Link href="/videokurs" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Videokurs</Link></li>
              <li><Link href="/about" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
              <li><Link href="/media" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Presse</Link></li>
              <li><Link href="/contact" className="block py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Kontakt</Link></li>
              <li>
                <button 
                  onClick={toggleTheme}
                  className="flex items-center py-2 hover:text-primary transition-colors"
                >
                  <i className={`bx ${theme === 'dark' ? 'bx-sun' : 'bx-moon'} mr-2`}></i>
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
