export default function PerformersSection() {
  const performers = [
    {
      id: 1,
      name: "Alex Rivera",
      profession: "Juggler & Comedian",
      rating: 4.5,
      reviews: 36,
      image: "https://pixabay.com/get/g0c80ba1c9d92baa60b5d5af564ed3fdc39249ad91ded8b24173cfa14cda6781f0e6cd32180460542c778a717bfea177fa3d8d192be757720f4e3c6550dbe0374_1280.jpg"
    },
    {
      id: 2,
      name: "Maya Chen",
      profession: "Magician & Illusionist",
      rating: 5,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
    },
    {
      id: 3,
      name: "Carlos Santiago",
      profession: "Fire Performer",
      rating: 4.5,
      reviews: 28,
      image: "https://pixabay.com/get/gf923603df806bffed3d4c4ed2dd2e4e51c4a13ded102bf16a274e085057bf8f3b189f6237193adac8717c207b2dda90566dcb8b9a69432101d299da9340ea805_1280.jpg"
    },
    {
      id: 4,
      name: "Sophia Kim",
      profession: "Aerial Artist",
      rating: 5,
      reviews: 47,
      image: "https://pixabay.com/get/g9fe674b926221085c034d369d92c49bf641e95945b1191cb074144f40bb1e672a7b7bdfffee8402fbd383fa313ad1175b354d785ea99f47b73f7ff95e2cd4182_1280.jpg"
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bx bxs-star"></i>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="bx bxs-star-half"></i>);
    }
    
    // Add empty stars to reach 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bx bx-star"></i>);
    }
    
    return stars;
  };

  return (
    <section id="performers" className="py-20 bg-gradient-to-b from-neutral to-white dark:from-dark-bg dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 dark:text-white">
            Meet Our <span className="text-primary">Performers</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get to know our talented roster of professional entertainers available for your events.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {performers.map((performer) => (
            <div key={performer.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md group">
              <div className="relative overflow-hidden">
                <img 
                  src={performer.image} 
                  alt={`${performer.name} - ${performer.profession}`} 
                  className="w-full h-72 object-cover object-center transition-transform group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                  <div className="flex gap-3">
                    <a href="#" className="bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full transition-colors">
                      <i className="bx bxl-instagram text-white text-xl"></i>
                    </a>
                    <a href="#" className="bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full transition-colors">
                      <i className="bx bx-link-alt text-white text-xl"></i>
                    </a>
                    <a href="#" className="bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full transition-colors">
                      <i className="bx bx-play text-white text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-montserrat font-semibold text-lg mb-1">{performer.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{performer.profession}</p>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {renderStars(performer.rating)}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({performer.reviews} reviews)</span>
                </div>
                <a href="#contact" className="text-primary text-sm font-medium hover:underline">Book for your event →</a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            View All Performers
            <i className="bx bx-right-arrow-alt"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
