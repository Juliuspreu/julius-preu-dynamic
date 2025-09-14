import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ContentItem {
  id?: number;
  section: string;
  title: string;
  content: string;
  imageUrl?: string;
}

export default function Admin() {
  const [activeSection, setActiveSection] = useState("hero");
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const queryClient = useQueryClient();

  // Content sections for the website
  const sections = [
    { id: "hero", name: "Hero Bereich", description: "Hauptüberschrift und Untertitel" },
    { id: "about", name: "Über mich", description: "Persönliche Beschreibung" },
    { id: "shows", name: "Shows", description: "Show-Beschreibungen" },
    { id: "workshops", name: "Workshops", description: "Workshop-Inhalte" },
    { id: "contact", name: "Kontakt", description: "Kontaktinformationen" }
  ];

  // Mock data for development - replace with actual API calls
  const [contentData, setContentData] = useState<ContentItem[]>([
    {
      id: 1,
      section: "hero",
      title: "Präzise Jonglage trifft Innovation",
      content: "Weltmeister-Performances für unvergessliche Events und inspirierende Workshops"
    },
    {
      id: 2,
      section: "about",
      title: "Über Julius Preu",
      content: "Als Weltmeister im Jonglieren bringe ich über 15 Jahre Erfahrung in die Welt der präzisen Jonglage ein. Meine Leidenschaft liegt darin, die Grenzen des Möglichen zu erweitern und dabei Eleganz mit Innovation zu verbinden."
    },
    {
      id: 3,
      section: "shows",
      title: "Spektakuläre Shows",
      content: "Von eleganter Solo-Performance bis zur großen LED-Show - jede Darbietung wird individuell auf Ihr Event abgestimmt."
    }
  ]);

  const handleSave = (item: ContentItem) => {
    if (item.id) {
      // Update existing item
      setContentData(prev => 
        prev.map(data => data.id === item.id ? item : data)
      );
    } else {
      // Add new item
      setContentData(prev => [...prev, { ...item, id: Date.now() }]);
    }
    setEditingItem(null);
  };

  const filteredContent = contentData.filter(item => item.section === activeSection);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            <div className="flex gap-2">
              <a href="/" className="btn btn-outline">Zur Website</a>
              <button className="btn btn-primary">Änderungen veröffentlichen</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Bereiche</h2>
              <nav className="space-y-2">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-medium">{section.name}</div>
                    <div className="text-sm text-gray-500">{section.description}</div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {sections.find(s => s.id === activeSection)?.name}
                  </h2>
                  <button
                    onClick={() => setEditingItem({ section: activeSection, title: "", content: "" })}
                    className="btn btn-primary"
                  >
                    Neuen Inhalt hinzufügen
                  </button>
                </div>
              </div>

              <div className="p-6">
                {filteredContent.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-500 mb-4">Keine Inhalte gefunden</div>
                    <button
                      onClick={() => setEditingItem({ section: activeSection, title: "", content: "" })}
                      className="btn btn-primary"
                    >
                      Ersten Inhalt erstellen
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredContent.map(item => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-gray-600 mt-2 line-clamp-3">{item.content}</p>
                            {item.imageUrl && (
                              <div className="mt-2">
                                <span className="text-sm text-gray-500">Bild: {item.imageUrl}</span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => setEditingItem(item)}
                            className="ml-4 btn btn-outline"
                          >
                            Bearbeiten
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">
                {editingItem.id ? "Inhalt bearbeiten" : "Neuen Inhalt erstellen"}
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titel</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Titel eingeben..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Inhalt</label>
                <textarea
                  value={editingItem.content}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Inhalt eingeben..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Bild URL (optional)</label>
                <input
                  type="text"
                  value={editingItem.imageUrl || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setEditingItem(null)}
                className="btn btn-outline"
              >
                Abbrechen
              </button>
              <button
                onClick={() => handleSave(editingItem)}
                className="btn btn-primary"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}