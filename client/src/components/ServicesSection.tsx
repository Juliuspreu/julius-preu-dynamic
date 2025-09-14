export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "Juggling Shows",
      description: "From balls and clubs to fire and knives, our jugglers will amaze your guests with skillful manipulation and comedy.",
      price: "From $350",
      image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      alt: "Juggling performance"
    },
    {
      id: 2,
      title: "Magic & Illusion",
      description: "Close-up magic, stage illusions, and mind-reading performances that will leave your audience speechless.",
      price: "From $400",
      image: "https://images.unsplash.com/photo-1615092296061-e2ccfeb2f3d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      alt: "Magic performance"
    },
    {
      id: 3,
      title: "Aerial Acts",
      description: "Breathtaking aerial silk, hoop, and trapeze performances that add elegance and drama to your event.",
      price: "From $650",
      image: "https://pixabay.com/get/gac0b9bd60f720565fef2f73e8659e218fb8984b45bbc618ed3626dfb98d47f93ad9d956caf72481057d02a5d23160d4180afff4c663d0410dc7c14d01fc82852_1280.jpg",
      alt: "Aerial performance"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 dark:text-white">
            Discover Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse and compare different types of performances and entertainment options for your next event.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-neutral dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 group"
            >
              <img 
                src={service.image} 
                alt={service.alt} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <h3 className="font-montserrat font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-semibold">{service.price}</span>
                  <a href="#pricing" className="text-sm font-medium hover:underline">Compare Options →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#pricing" 
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            View All Services
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
