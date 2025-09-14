import { Helmet } from 'react-helmet';
import content from '../data/content.json';

interface SEOHeadProps {
  page?: keyof typeof content.seo.pages;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
}

export default function SEOHead({ 
  page = 'home', 
  customTitle, 
  customDescription, 
  customImage 
}: SEOHeadProps) {
  const seoData = content.seo;
  const pageData = seoData.pages[page];
  
  const title = customTitle || pageData.title || seoData.defaultTitle;
  const description = customDescription || pageData.description || seoData.defaultDescription;
  const keywords = pageData.keywords || seoData.defaultKeywords;
  const image = customImage || seoData.ogImage;
  
  // Aktuelle URL für Open Graph
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Helmet>
      {/* Basis Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={seoData.author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="de" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph Tags für Social Media */}
      <meta property="og:type" content={seoData.ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={seoData.siteName} />
      <meta property="og:locale" content="de_DE" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={seoData.twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Zusätzliche SEO Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* JSON-LD Structured Data für bessere Google-Ergebnisse */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Julius Preu",
          "jobTitle": "Professioneller Jongleur & Weltmeister",
          "url": currentUrl,
          "image": image,
          "sameAs": [
            "https://www.instagram.com/juliuspreu",
            "https://www.youtube.com/juliuspreu"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "DE",
            "addressRegion": "Deutschland"
          },
          "offers": [
            {
              "@type": "Service",
              "name": "LED Jonglage Shows",
              "description": "Spektakuläre LED-Lichtshows für Events und Galas",
              "category": "Entertainment Services",
              "areaServed": ["Deutschland", "Österreich"]
            },
            {
              "@type": "Service", 
              "name": "Jonglage Workshops",
              "description": "Interaktive Workshops für Unternehmen und Schulen",
              "category": "Educational Services",
              "areaServed": ["Deutschland", "Österreich"]
            }
          ],
          "award": "Weltmeister im Jonglieren 2023",
          "knowsAbout": ["Jonglage", "LED Performance", "Workshopleitung", "Teambuilding"],
          "performer": {
            "@type": "Organization",
            "name": "Jonglissimo"
          }
        })}
      </script>
    </Helmet>
  );
}