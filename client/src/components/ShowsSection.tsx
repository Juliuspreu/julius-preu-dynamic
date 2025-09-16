import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ShowCard from "./ShowCard";

interface ShowProps {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
  category: string;
}

export default function ShowsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeShow, setActiveShow] = useState<ShowProps | null>(null);
  const [showMore, setShowMore] = useState<boolean>(false);

  // Show categories
  const categories = [
    { id: "all", name: "Alle Shows" },
    { id: "solo", name: "Solo Shows" },
    { id: "gravitos", name: "Gravitos Acts" },
    { id: "jonglissimo", name: "Jonglissimo Acts" },
  ];

  // Get acts from API
  const { data: apiActs = [] } = useQuery({
    queryKey: ["/api/acts"],
    queryFn: async () => {
      const response = await fetch("/api/acts");
      return response.json();
    },
  });

  // Show data - use API acts if available, fallback to static data
  const shows: ShowProps[] =
    apiActs.length > 0
      ? apiActs
      : [
          {
            id: "led-juggling",
            title: "Lucidor LED Juggling Act",
            description:
              "Ein faszinierender Solo-Act mit leuchtenden LED-Bällen und Keulen sowie einem interaktiven, programmierten Tor aus LED-Keulen. Durch perfekte Präzision und eindrucksvolle Lichteffekte besticht dieser Act. Die synchrone Choreographie zur Musik erschafft eine magische Atmosphäre für Ihr Event.",
            videoUrl: "https://www.youtube.com/embed/niDQsEosK0s",
            imageUrl: "/20240627-DSC03436.jpg",
            category: "solo",
          },
          {
            id: "kings-gambit",
            title: "Kings Gambit",
            description:
              'Eine spannende und innovative Leuchtkeulenjonglage, welche nicht nur die Jury der Jonglierweltmeisterschaft 2024 überzeugte, sondern auch die Sinne verzaubert! Der Act "Kings Gambit" verkörpert eine rasante Leuchtkeulen Performance mit atemberaubender Präzision, synchronisiert zur mitreißenden Musik! Diesen Act zu buchen, ist bestimmt ein kluger Schachzug ;-)',
            videoUrl: "https://www.youtube.com/embed/qlctkxLUaPA",
            imageUrl: "/20240627-DSC03516.jpg",
            category: "gravitos",
          },
          {
            id: "amadeus-ring",
            title: "Amadeus Ring Jonglage",
            description:
              "Elegante Ringjonglage zu Modern-Klassischer Musik. Eine beeindruckende Fusion von Präzision und Eleganz. Hierbei manipulieren wir die Ringe geschickt, verleihen der Vorstellung eine fließende Dynamik und schaffen so eine fesselnde visuelle Darbietung.",
            videoUrl: "https://www.youtube.com/embed/pOl0FctuU_I",
            imageUrl: "https://img.youtube.com/vi/pOl0FctuU_I/maxresdefault.jpg",
            category: "gravitos",
          },
          {
            id: "gravitos-showblock",
            title: "30 Minuten Best of Gravitos - Showblock",
            description:
              "Das Beste von Gravitos in einem spektakulären 30-minütigen Showblock! Erleben Sie beeindruckende Performances, Comedy mit Messern, technische Meisterleistungen und 30 Minuten pure gute Laune. Von klassischer Jonglage bis hin zu waghalsigen Stunts - diese Show bietet das komplette Gravitos-Erlebnis für Ihr Event.",
            videoUrl: "https://www.youtube.com/embed/Mk-7iKexjlU",
            imageUrl: "/20240627-DSC03185.jpg",
            category: "gravitos",
          },
          {
            id: "lightpainting",
            title: "Lightpainting",
            description:
              "Die Evolution der Leuchtperformance: Durch bewegte Glowobjekte und Echtzeit-Videoeffekte entstehen dynamische Lichtspuren auf der Projektionsfläche. Eine innovative Show mit individueller Anpassung - Ihr Logo oder eine besondere Botschaft wird nahtlos integriert für ein unvergessliches Erlebnis. Foto: @vanetti",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            imageUrl: "/attached_assets/08-vanetti_1749486494882.jpeg",
            category: "jonglissimo",
          },
          {
            id: "galactica",
            title: "Galactica",
            description:
              "Ein spektakulärer LED-Showact mit atemberaubenden Visuals, der Sterne und Energiespuren am Nachthimmel entstehen lässt. Weltmeisterliche Präzision trifft auf modernste Technologie und erschafft ein faszinierendes Gesamtkunstwerk aus Licht, Bewegung und Innovation.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            imageUrl: "/galactica1_1749487146955.jpg",
            category: "jonglissimo",
          },
        ];

  // Sort shows to ensure category diversity in first 6
  const sortedShows = [...shows].sort((a, b) => {
    const categoryOrder = { solo: 1, gravitos: 2, jonglissimo: 3 };
    return (
      (categoryOrder[a.category as keyof typeof categoryOrder] || 999) -
      (categoryOrder[b.category as keyof typeof categoryOrder] || 999)
    );
  });

  // Filter shows based on active category
  const filteredShows =
    activeCategory === "all"
      ? sortedShows
      : sortedShows.filter((show) => show.category === activeCategory);

  // Pagination logic - show only 6 initially unless "show more" is clicked
  const displayShows = showMore ? filteredShows : filteredShows.slice(0, 6);
  const hasMoreShows = filteredShows.length > 6;

  const openShowDetails = (show: ShowProps) => {
    setActiveShow(show);
    // When modal is opened, scroll to top of modal
    setTimeout(() => {
      const modal = document.getElementById("show-modal");
      if (modal) modal.scrollTop = 0;
    }, 100);
  };

  const closeShowDetails = () => {
    setActiveShow(null);
  };

  return (
    <section id="shows" className="pt-24 pb-20 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-gray-800 dark:text-gray-800">
            Beeindruckende <span className="text-primary">Shows</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-600 max-w-2xl mx-auto">
            Entdecken Sie eine Vielzahl von Shows und Acts für Ihre
            Veranstaltung - von Solo-Performances bis hin zu komplexen
            Gruppenacts.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => {
                setActiveCategory(category.id);
                setShowMore(false);
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Shows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayShows.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              categories={categories}
              onClick={() => openShowDetails(show)}
            />
          ))}
        </div>

        {/* Show More Button */}
        {hasMoreShows && !showMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowMore(true)}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Mehr anzeigen ({filteredShows.length - 6} weitere Shows)
            </button>
          </div>
        )}
      </div>

      {/* Show Details Modal */}
      {activeShow && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeShowDetails}
        >
          <div
            id="show-modal"
            className="bg-white dark:bg-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="video-container">
              <iframe
                src={activeShow.videoUrl}
                title={activeShow.title}
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-montserrat font-bold text-2xl text-primary">
                  {activeShow.title}
                </h3>
                <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {categories
                    .find((cat) => cat.id === activeShow.category)
                    ?.name.replace(" Acts", "")
                    .replace(" Shows", "")}
                </span>
              </div>
              <p
                className="mb-6 text-gray-700"
                style={{ color: "#374151", fontWeight: "normal" }}
              >
                {activeShow.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="btn-primary"
                  onClick={closeShowDetails}
                >
                  Anfrage senden
                </a>
                <button
                  className="btn-outline dark:text-white"
                  onClick={closeShowDetails}
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
