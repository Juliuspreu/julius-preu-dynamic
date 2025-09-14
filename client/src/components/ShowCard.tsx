import React from 'react';

interface ShowCardProps {
  show: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
  };
  categories: Array<{ id: string; name: string; }>;
  onClick: () => void;
}

export default function ShowCard({ show, categories, onClick }: ShowCardProps) {
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
          src={show.imageUrl}
          alt={show.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full">
            <i className="bx bx-play text-2xl"></i>
          </button>
        </div>
      </div>
      <div style={contentStyle}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-montserrat font-semibold text-xl transition-colors" style={titleStyle}>
            {show.title}
          </h3>
          <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
            {categories.find(cat => cat.id === show.category)?.name.replace(" Acts", "").replace(" Shows", "")}
          </span>
        </div>
        <p className="line-clamp-2" style={descriptionStyle}>
          {show.description}
        </p>
        <button className="flex items-center text-sm font-medium hover:underline" style={buttonStyle}>
          Details anzeigen <i className="bx bx-right-arrow-alt ml-1"></i>
        </button>
      </div>
    </div>
  );
}