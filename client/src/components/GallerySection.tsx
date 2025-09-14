import { useState } from "react";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filters = [
    { id: "all", name: "All" },
    { id: "juggling", name: "Juggling" },
    { id: "magic", name: "Magic" },
    { id: "fire", name: "Fire Shows" },
    { id: "aerial", name: "Aerial" }
  ];
  
  const galleryItems = [
    {
      id: 1,
      title: "Light Juggling Show",
      eventType: "Private Event, March 2023",
      category: "juggling",
      image: "https://pixabay.com/get/g494ffa0549d39384804fe20f1764052d40a5b3ea2506540095f2a64e4cc4687547c48fcbfd201f04db4751f0fb69b4a6f8283db6f01c4a2bcc2e6f58642e0069_1280.jpg"
    },
    {
      id: 2,
      title: "Card Magic Performance",
      eventType: "Corporate Event, May 2023",
      category: "magic",
      image: "https://pixabay.com/get/g17de17037a2dfca70ebc403b848270f030bb6288a982e5a10a96c63814483c24116dcd94d42250c949d94d77428b6e855688e767f7f478fb78635acd1d59ba8f_1280.jpg"
    },
    {
      id: 3,
      title: "Fire Dance Show",
      eventType: "Summer Festival, July 2023",
      category: "fire",
      image: "https://pixabay.com/get/g7fd605d317e11b80534333d9cd37d972d48c845b9cf76ea87b7ede786d3b6267fcf316ab84dc1b5f9c7de86e6f1f37102bd5837a129db0919980a4e3f9c97d8a_1280.jpg"
    },
    {
      id: 4,
      title: "Aerial Silk Performance",
      eventType: "Gala Event, February 2023",
      category: "aerial",
      image: "https://pixabay.com/get/g9836055bb8564a633312ff39b67a1401300570162b00e4b5442d9f6f633b172af23260972b77fb9b6817a575c5526c124a9f341764dc2acb68f283f8f55eddf8_1280.jpg"
    },
    {
      id: 5,
      title: "Fire Juggling Act",
      eventType: "Street Festival, June 2023",
      category: "fire",
      image: "https://pixabay.com/get/gf51f2e205435f08c3b3cd497e2c20657c2f18a05a68bc3345c014e5aa384160991754d29dc4d187b389d838e46485d804b257e03ef31eae1104b4ad7b4786509_1280.jpg"
    },
    {
      id: 6,
      title: "Stage Illusion Show",
      eventType: "Theater Event, April 2023",
      category: "magic",
      image: "https://pixabay.com/get/gd2f40f242d93c1b51c0c6a20615f4bd1cc13a566fa365b8e135e747831dba64100d2c3051fb90d683530fdb69761f8947f5759533c22cb2d828d810503edbb94_1280.jpg"
    },
    {
      id: 7,
      title: "Club Juggling Show",
      eventType: "Community Event, May 2023",
      category: "juggling",
      image: "https://images.unsplash.com/photo-1581404917879-53e19259fdda?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
    },
    {
      id: 8,
      title: "Aerial Hoop Performance",
      eventType: "Charity Gala, March 2023",
      category: "aerial",
      image: "https://pixabay.com/get/g4990747cc3f78f3727f77e85b674559e7c482dbca69d706a0efc6efb05caf78a6359cea79188c2d05f1fd901448d8eb601a0af48bd622d57a7ddf464b8c45305_1280.jpg"
    }
  ];
  
  const filteredGallery = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-neutral dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 dark:text-white">
            Performance <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse photos and videos from our past performances and events.
          </p>
        </div>
        
        {/* Gallery Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                activeFilter === filter.id 
                  ? "bg-primary text-white" 
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGallery.map(item => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl aspect-square bg-gray-200 dark:bg-gray-800">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="font-montserrat font-medium text-white text-lg">{item.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{item.eventType}</p>
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full transition-colors">
                    <i className="bx bx-play text-white text-xl"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            View Full Gallery
            <i className="bx bx-right-arrow-alt"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
