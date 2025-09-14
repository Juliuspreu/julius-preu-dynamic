import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowRight, Plus } from "lucide-react";
import { useState } from "react";

interface NewsPost {
  id: string;
  title: string;
  content: string;
  media_url: string;
  media_type: string;
  link?: string;
  timestamp: string;
  category: string;
  active?: boolean;
}

export default function NewsSection() {
  const [showAll, setShowAll] = useState(false);
  
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['/api/news/posts'],
    queryFn: async () => {
      const response = await fetch('/api/news/posts');
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      return data.filter((post: NewsPost) => post.active !== false) || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Show only the 3 most recent posts initially
  const displayedPosts = showAll ? posts : posts.slice(0, 3);
  const hasMorePosts = posts.length > 3;

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Aktuelles & News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
                <div className="aspect-video bg-gray-300 dark:bg-gray-600"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || posts.length === 0) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Aktuelles & News
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Keine Neuigkeiten verfügbar.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20" style={{ backgroundColor: 'white' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16" style={{ color: '#111827' }}>
          Aktuelles & News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map((post: NewsPost) => (
            <article key={post.id} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ backgroundColor: 'white' }}>
              <div className="relative aspect-video">
                <img 
                  src={post.media_url} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2" style={{ color: '#1f2937' }}>
                  {post.title}
                </h3>
                <p className="line-clamp-3 mb-4" style={{ color: '#6b7280' }}>
                  {post.content}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#6b7280' }}>
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.timestamp).toLocaleDateString('de-DE')}</span>
                  </div>
                  {post.link && (
                    <a 
                      href={post.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark transition-colors duration-200 flex items-center gap-1 font-medium"
                    >
                      <span className="text-sm">Weiterlesen</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Load More Button */}
        {hasMorePosts && !showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Mehr anzeigen
            </button>
          </div>
        )}
        
        {/* Show Less Button */}
        {showAll && hasMorePosts && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Weniger anzeigen
            </button>
          </div>
        )}
      </div>
    </section>
  );
}