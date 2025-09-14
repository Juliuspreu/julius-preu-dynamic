import React from 'react';

interface MediaCardProps {
  media: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    source: string;
    date: string;
    type: string;
  };
  onClick: () => void;
}

export default function MediaCard({ media, onClick }: MediaCardProps) {
  const cardStyle = {
    backgroundColor: '#1f2937',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    color: 'white',
    cursor: 'pointer'
  };

  const contentStyle = {
    backgroundColor: '#1f2937',
    padding: '1.5rem'
  };

  const titleStyle = {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: '1.25rem',
    marginBottom: '0.5rem'
  };

  const descriptionStyle = {
    color: '#d1d5db',
    marginBottom: '1rem'
  };

  const metaStyle = {
    color: '#d1d5db'
  };

  const buttonStyle = {
    color: '#dc2626',
    marginTop: '1rem'
  };

  return (
    <div 
      className="group cursor-pointer hover:scale-105 transition-all duration-300"
      style={cardStyle}
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={media.imageUrl}
          alt={media.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
          onError={(e) => {
            console.error('Image failed to load:', media.imageUrl);
            e.currentTarget.style.display = 'none';
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', media.imageUrl);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100 flex items-end">
          <div className="p-4 w-full">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              media.type === "tv" ? "bg-secondary/80 text-white" :
              media.type === "press" ? "bg-primary/80 text-white" :
              "bg-accent/80 text-white"
            }`}>
              {media.type === "tv" ? "TV-Auftritt" :
               media.type === "press" ? "Pressebericht" :
               "Video"}
            </span>
          </div>
        </div>
        {(media.type === "tv" || media.type === "video") && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full">
              <i className="bx bx-play text-2xl"></i>
            </button>
          </div>
        )}
      </div>
      <div style={contentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={titleStyle}>
            {media.title}
          </h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ ...metaStyle, fontSize: '0.875rem' }}>{media.source}</span>
          <span style={{ ...metaStyle, fontSize: '0.875rem' }}>{media.date}</span>
        </div>
        <p style={descriptionStyle}>
          {media.description}
        </p>
        <button style={{ ...buttonStyle, display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}>
          Details anzeigen <i className="bx bx-right-arrow-alt ml-1"></i>
        </button>
      </div>
    </div>
  );
}