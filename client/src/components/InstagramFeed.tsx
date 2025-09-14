import { useState, useEffect } from "react";

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  permalink: string;
  timestamp: string;
  thumbnail_url?: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true);
      // Using a public Instagram scraping service for public accounts
      const response = await fetch('/api/instagram/jugglingaroundtheworld');
      
      if (!response.ok) {
        throw new Error('Instagram posts konnten nicht geladen werden');
      }
      
      const data = await response.json();
      setPosts(data.data || []);
    } catch (err) {
      console.error('Error fetching Instagram posts:', err);
      setError('Instagram-Beiträge konnten nicht geladen werden');
    } finally {
      setLoading(false);
    }
  };

  const formatCaption = (caption: string) => {
    if (!caption) return '';
    // Limit caption length for display
    return caption.length > 120 ? caption.substring(0, 120) + '...' : caption;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Aktuelle Updates
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Folgen Sie @jugglingaroundtheworld für die neuesten Einblicke und Updates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden shadow-md animate-pulse">
                <div className="w-full h-64 bg-muted"></div>
                <div className="p-4">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Aktuelle Updates
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Folgen Sie @jugglingaroundtheworld für die neuesten Einblicke und Updates
            </p>
            
            <div className="bg-card rounded-lg p-8 max-w-md mx-auto">
              <i className="bx bxl-instagram text-4xl text-primary mb-4"></i>
              <p className="text-muted-foreground mb-6">
                Besuchen Sie unseren Instagram-Account für aktuelle Beiträge und Behind-the-Scenes-Inhalte.
              </p>
              <a 
                href="https://instagram.com/jugglingaroundtheworld" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <i className="bx bxl-instagram mr-2 text-xl"></i>
                @jugglingaroundtheworld folgen
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Aktuelle Updates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Folgen Sie @jugglingaroundtheworld für die neuesten Einblicke und Updates
          </p>
          <a 
            href="https://instagram.com/jugglingaroundtheworld" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <i className="bx bxl-instagram mr-2 text-xl"></i>
            @jugglingaroundtheworld
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.slice(0, 6).map((post) => (
            <div key={post.id} className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative group">
                {post.media_type === 'VIDEO' ? (
                  <img 
                    src={post.thumbnail_url || post.media_url} 
                    alt="Instagram Video"
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <img 
                    src={post.media_url} 
                    alt="Instagram Post"
                    className="w-full h-64 object-cover"
                  />
                )}
                
                {post.media_type === 'VIDEO' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <i className="bx bx-play-circle text-white text-4xl"></i>
                  </div>
                )}
                
                <a 
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label="Instagram-Post öffnen"
                ></a>
              </div>
              
              <div className="p-4">
                {post.caption && (
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {formatCaption(post.caption)}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(post.timestamp)}</span>
                  <div className="flex items-center">
                    <i className="bx bxl-instagram mr-1"></i>
                    <span>Instagram</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <a 
            href="https://instagram.com/jugglingaroundtheworld" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            <i className="bx bxl-instagram mr-2 text-xl"></i>
            Mehr auf Instagram ansehen
          </a>
        </div>
      </div>
    </section>
  );
}