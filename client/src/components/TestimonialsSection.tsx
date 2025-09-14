import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Review {
  id: number;
  name: string;
  email?: string;
  rating: number;
  title: string;
  content: string;
  serviceType?: string;
  eventDate?: string;
  location?: string;
  category?: string;
  imageUrl?: string;
  isApproved: boolean;
  isActive: boolean;
  isPublic: boolean;
  sortOrder: number;
  createdAt: string;
}

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get reviews from API
  const { data: allReviews, isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews']
  });

  // Filter für "general" Kategorie - für Startseite
  const testimonials = allReviews?.filter(review => 
    review.isApproved && 
    review.isActive && 
    review.isPublic &&
    (!review.category || review.category === 'general') // Nur allgemeine Testimonials
  ).slice(0, 6) || []; // Maximal 6 anzeigen

  // Fallback testimonials falls noch keine Reviews vorhanden
  const fallbackTestimonials = [
    {
      id: 1,
      text: "Daniel and Julius presented a strikingly innovative LED juggling act at the 2024 IJA Juggling Championships. They managed to create a symbiosis of their precise routine, technical prowess, and beautiful programming of the clubs. As the director of the IJA Juggling Championships, I have seen hundreds of world-class acts from the best jugglers in the world. Daniel and Julius's routine exceeded my expectations.",
      name: "Viveca Gardiner",
      position: "Direktorin der Jonglierweltmeisterschaften",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 2,
      text: "Julius und Daniel von Gravitos haben sich ihren Weltrekord verdient. Ihre hervorragende Qualität und Professionalität machen die Zusammenarbeit immer äußerst angenehm und beeindrucken unsere Gäste nachhaltig. Es ist eine Freude, mit ihnen zusammenzuarbeiten, und ihre außergewöhnlichen Fähigkeiten hinterlassen stets einen bleibenden Eindruck.",
      name: "Felix Müller",
      position: "Event Manager von Jochen Schweizer Showacts",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 3,
      text: "Auf der Suche nach einem spektakulären Showact sind wir auf Gravitos gestoßen, und das stellte sich als Glücksgriff heraus. Ihre LED-Jonglage ist wahrlich ein Eyecatcher und begeisterte den ganzen Saal. Besonders begeistert waren wir aber von der individuellen Komponente: Mit der Einbindung des Unternehmenslogos war der Auftritt wirklich rundum gelungen.",
      name: "Patrick Reiterer",
      position: "Eventmanager Wiener Netze",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 4,
      text: "Die Show von Gravitos im Rahmen eines unserer Champions League Matches peppte unsere Veranstaltung auf und bot den Zuschauern eine spannende Showeinlage zwischen den Matches.",
      name: "Robert Renner",
      position: "Manager von Serienmeister LINZ AG Froschberg",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 5,
      text: "Gravitos verspricht Weltklasse LED-Jonglage und das halten sie auch. Ihre Keulen schreiben zahllose Muster in die Dunkelheit, welche passend zur Musik in verschiedensten Farben erstrahlen. Ein echtes Highlight des 2. Tübinger Kleinkunstpreises!",
      name: "Marian M.",
      position: "Organisator des Tübinger Kleinkunstpreises",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 dark:text-white">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Read what our clients have to say about their experience with our performers.
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-x-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100 / testimonials.length}%)`, width: `${testimonials.length * 100}%` }}
            >
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-neutral dark:bg-gray-800 p-6 rounded-xl shadow-sm h-full">
                    <div className="flex text-yellow-400 mb-4">
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                    </div>
                    <p className="mb-6 italic text-gray-700 dark:text-gray-300">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100'} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="font-medium dark:text-white">{testimonial.name}</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.serviceType || 'Kunde'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <i className="bx bx-chevron-left text-2xl"></i>
          </button>
          
          <button 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <i className="bx bx-chevron-right text-2xl"></i>
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index 
                    ? "bg-primary" 
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
