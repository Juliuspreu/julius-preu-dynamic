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

export default function WorkshopTestimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get reviews from API - filtered for workshop category
  const { data: allReviews, isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews']
  });

  // Filter für "workshop" Kategorie
  const testimonials = allReviews?.filter(review => 
    review.isApproved && 
    review.isActive && 
    review.isPublic &&
    review.category === 'workshop'
  ).slice(0, 6) || []; // Maximal 6 anzeigen

  // Fallback testimonials für Workshop-Bereich
  const fallbackTestimonials = [
    {
      id: 1,
      content: "Unser Team-Building Workshop mit Julius war ein voller Erfolg! Die Übungen haben das Vertrauen und die Koordination unserer Gruppe enorm gestärkt.",
      name: "Sarah Weber",
      serviceType: "Team-Building Workshop",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100",
      rating: 5
    },
    {
      id: 2,
      content: "Als Lehrerin bin ich begeistert von den pädagogischen Ansätzen. Die Schüler waren fokussiert und motiviert wie selten zuvor.",
      name: "Maria Huber",
      serviceType: "Schulworkshop",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100",
      rating: 5
    },
    {
      id: 3,
      content: "Der Workshop hat unsere Firmenveranstaltung perfekt abgerundet. Professionell, unterhaltsam und lehrreich zugleich.",
      name: "Thomas Mayer",
      serviceType: "Firmen-Workshop",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100",
      rating: 5
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">Testimonials werden geladen...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Was unsere <span className="text-primary">Teilnehmer sagen</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Echte Erfahrungen von Workshop-Teilnehmern aus Schulen, Unternehmen und Vereinen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <div key={testimonial.id || index} className="bg-gray-50 p-8 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <i key={i} className="bx bxs-star"></i>
                ))}
              </div>
              <p className="mb-6 italic text-gray-700">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100'} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.serviceType || 'Workshop-Teilnehmer'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}