import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import { Helmet } from "react-helmet";
import { Link } from "wouter";

export default function About() {
  return (
    <>
      <Helmet>
        <title>Über Julius Preu | Weltmeister der Jonglage</title>
        <meta name="description" content="Lernen Sie Julius Preu kennen - Weltmeister im Jonglieren mit über 15 Jahren Erfahrung. Von internationalen Bühnen bis zu intimen Veranstaltungen." />
        <meta property="og:title" content="Über Julius Preu | Weltmeister der Jonglage" />
        <meta property="og:description" content="Lernen Sie Julius Preu kennen - Weltmeister im Jonglieren mit über 15 Jahren Erfahrung." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://juliuspreu.com/about" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/header-about.jpg" 
          alt="Julius Preu Portrait" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Über mich
          </h1>
        </div>
      </section>

      <main>
        <AboutSection />
      </main>
      
      <Footer />
    </>
  );
}