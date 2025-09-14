import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MediaCard from './MediaCard';

interface APIMediaItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  active: boolean;
  eventType?: string;
  eventDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface DisplayMediaItem {
  id: string;
  title: string;
  source: string;
  date: string;
  description: string;
  imageUrl: string;
  type: string;
  link?: string;
  embedUrl?: string;
}

export default function MediaSection() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeMedia, setActiveMedia] = useState<DisplayMediaItem | null>(null);
  
  // Fetch dynamic media data from API
  const { data: dynamicMedia = [], isLoading, error } = useQuery({
    queryKey: ['/api/media'],
    queryFn: async () => {
      const response = await fetch('/api/media');
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }
      return response.json();
    }
  });
  
  const tabs = [
    { id: "all", name: "Alle Medien" },
    { id: "pressefotos", name: "Pressefotos" },
    { id: "events", name: "Events" },
    { id: "videos", name: "Videos" },
    { id: "backstage", name: "Backstage" },
    { id: "performance", name: "Performance" },
    { id: "workshop", name: "Workshop" },
    { id: "tv", name: "TV-Auftritte" },
    { id: "press", name: "Presse" }
  ];
  
  // Static legacy media items
  const staticMediaItems: DisplayMediaItem[] = [
    {
      id: "ija-championship",
      title: "IJA Juggling Championship 2024",
      source: "International Jugglers' Association",
      date: "Juli 2024",
      description: "Daniel and Julius presented a strikingly innovative LED juggling act at the 2024 IJA Juggling Championship, showcasing their unique blend of technology and traditional juggling mastery.",
      imageUrl: "/ija2024-6-1_1749493792416.jpg",
      type: "tv",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "gravitos-performance",
      title: "Gravitos Duo - Absolute Profis",
      source: "Event Documentation",
      date: "Juni 2024",
      description: "Das Gravitos Duo hat so viel Spaß bei ihren Auftritten, dass die Freude fast ansteckend wird. Eine spektakuläre Performance mit perfekter Synchronisation und beeindruckenden Lichteffekten.",
      imageUrl: "/08-vanetti_1749486494882.jpeg",
      type: "tv",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "workshop-success",
      title: "\"Jonglieren lernen mit den Profis\"",
      source: "Lokale Presse",
      date: "Mai 2024",
      description: "Erfolgreiche Workshop-Serie mit Julius Preu: Teilnehmer jeden Alters entdecken die Faszination des Jonglierens und erleben, wie Konzentration und Koordination spielerisch trainiert werden.",
      imageUrl: "/20240627-DSC03185_1749493514378.jpg",
      type: "press",
      link: "#"
    },
    {
      id: "performance-review",
      title: "\"Weltmeister-Qualität hautnah erleben\"",
      source: "Veranstaltungsmagazin",
      date: "April 2024",
      description: "Ein ausführlicher Bericht über die beeindruckende Performance von Julius Preu und seinem Team. Professionelle Jonglage trifft auf innovative Bühnentechnik.",
      imageUrl: "/JPI_3297.jpg",
      type: "press",
      link: "#"
    },
    {
      id: "gravitos-highlights",
      title: "Gravitos Show Highlights",
      source: "Performance Video",
      date: "Februar 2024",
      description: "Die besten Momente aus unseren Gravitos Shows, mit spektakulären Lichteffekten und synchroner Keulenjonglage. Eine Demonstration höchster Artistik und Präzision.",
      imageUrl: "/galactica1_1749487146955.jpg",
      type: "video",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "workshop-documentation",
      title: "Workshop Impressionen",
      source: "Eigene Dokumentation",
      date: "März 2024",
      description: "Einblicke in die professionellen Jonglage-Workshops: Von den ersten Würfen bis zu komplexen Mustern - hier entstehen neue Talente unter professioneller Anleitung.",
      imageUrl: "/_MG_6823_1749493730352.JPG",
      type: "video",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];
  
  // Convert API media items to display format
  const convertApiToDisplay = (apiItems: APIMediaItem[]): DisplayMediaItem[] => {
    return apiItems.map(item => ({
      id: item.id,
      title: item.title,
      source: item.eventType || "Neue Medien",
      date: item.eventDate || new Date(item.createdAt).toLocaleDateString('de-DE'),
      description: item.description,
      imageUrl: item.imageUrl,
      type: item.category,
      link: "#"
    }));
  };
  
  // Combine static and dynamic media
  const allMediaItems = [
    ...convertApiToDisplay(dynamicMedia),
    ...staticMediaItems
  ];
  
  // Filter media items based on active tab
  const filteredMedia = activeTab === "all" 
    ? allMediaItems 
    : allMediaItems.filter(item => item.type === activeTab);

  const openMediaDetails = (media: DisplayMediaItem) => {
    setActiveMedia(media);
    setTimeout(() => {
      const modal = document.getElementById("media-modal");
      if (modal) {
        modal.scrollTop = 0;
      }
    }, 100);
  };

  const closeMediaDetails = () => {
    setActiveMedia(null);
  };

  if (isLoading) {
    return (
      <section id="media" className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-dark-bg">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">Lade Medien...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Media fetch error:', error);
    // Still show static content if API fails
  }

  return (
    <section id="media" className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title dark:text-white">
            Media & <span className="text-primary">Presse</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Entdecken Sie meine Auftritte in TV, Presse und Online-Medien.
          </p>
        </div>
        
        {/* Media Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id 
                  ? "bg-primary text-white" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        
        {/* Media Grid - Professional Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMedia.map(media => (
            <div
              key={media.id}
              className="group cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => openMediaDetails(media)}
              style={{
                backgroundColor: '#1f2937',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                color: 'white'
              }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={media.imageUrl} 
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onLoad={() => console.log('Image loaded successfully:', media.imageUrl)}
                  onError={(e) => {
                    console.warn('Failed to load image:', media.imageUrl);
                    e.currentTarget.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100 flex items-end">
                  <div className="p-4 w-full">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      media.type === "tv" ? "bg-red-500/80 text-white" :
                      media.type === "press" ? "bg-blue-500/80 text-white" :
                      media.type === "video" ? "bg-green-500/80 text-white" :
                      "bg-gray-500/80 text-white"
                    }`}>
                      {media.type === "tv" ? "TV-Auftritt" :
                       media.type === "press" ? "Pressebericht" :
                       media.type === "video" ? "Video" :
                       "Galerie"}
                    </span>
                  </div>
                </div>
                {(media.type === "tv" || media.type === "video") && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full">
                      <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <div style={{
                backgroundColor: '#1f2937',
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{
                    color: '#dc2626',
                    fontWeight: '600',
                    fontSize: '1.25rem',
                    marginBottom: '0.5rem'
                  }}>
                    {media.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>{media.source}</span>
                  <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>{media.date}</span>
                </div>
                <p style={{
                  color: '#d1d5db',
                  marginBottom: '1rem'
                }}>
                  {media.description}
                </p>
                <button style={{
                  color: '#dc2626',
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  Details anzeigen
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Keine Medien in dieser Kategorie verfügbar.
            </p>
          </div>
        )}
      </div>
      
      {/* Media Detail Modal */}
      {activeMedia && (
        <div 
          id="media-modal"
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeMediaDetails}
        >
          <div 
            className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-red-500">
                  {activeMedia.title}
                </h2>
                <button
                  onClick={closeMediaDetails}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Video or Image Display */}
              {activeMedia.embedUrl ? (
                <div className="aspect-video mb-4">
                  <iframe
                    src={activeMedia.embedUrl}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <img 
                    src={activeMedia.imageUrl} 
                    alt={activeMedia.title}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">
                  {activeMedia.source} • {activeMedia.date}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {activeMedia.description}
                </p>
              </div>
              
              {activeMedia.link && activeMedia.link !== "#" && (
                <div className="mt-4">
                  <a
                    href={activeMedia.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Vollständigen Artikel lesen
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}