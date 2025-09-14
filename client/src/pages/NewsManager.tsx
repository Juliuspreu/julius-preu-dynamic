import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trash2, ToggleLeft, ToggleRight, Lock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ManagerNavigation from "@/components/ManagerNavigation";

interface NewsPost {
  id: string;
  title: string;
  content: string;
  media_url: string;
  media_type: string;
  link?: string;
  timestamp: string;
  category: string;
  active: boolean;
}

export default function NewsManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const queryClient = useQueryClient();

  // Get current posts - always call hooks at top level
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['/api/news/posts'],
    queryFn: async () => {
      const response = await fetch('/api/news/posts');
      return response.json();
    },
    enabled: isAuthenticated // Only fetch when authenticated
  });

  // Add new post
  const addPostMutation = useMutation({
    mutationFn: async (postData: Partial<NewsPost>) => {
      const response = await fetch('/api/news/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/news/posts'] });
      setNewTitle("");
      setNewContent("");
      setNewLink("");
      setNewCategory("");
      setSelectedImage("");
    }
  });

  // Toggle post active status
  const togglePostMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const response = await fetch(`/api/news/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/news/posts'] });
    }
  });

  // Delete post
  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/news/posts/${id}`, {
        method: 'DELETE'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/news/posts'] });
    }
  });

  const availableImages = [
    { url: "/20240627-DSC03407.jpg", name: "LED Performance" },
    { url: "/20240627-DSC03185.jpg", name: "Solo Act" },
    { url: "/20240627-DSC03436.jpg", name: "Behind Scenes" },
    { url: "/20240627-DSC03479.jpg", name: "Training" },
    { url: "/20240627-DSC03516.jpg", name: "Event" },
    { url: "/JPI_2779.jpg", name: "Duo Performance" },
    { url: "/JPI_3037.jpg", name: "Workshop" },
    { url: "/JPI_3301.jpg", name: "School Program" },
    { url: "/JPI_3313.jpg", name: "Corporate Event" },
    { url: "/Juli.jpg", name: "Portrait" },
    { url: "/450135814_358427793733975_205758004148829675_n.jpg", name: "Performance Shot" }
  ];

  const categories = ["Performance", "Workshop", "Ankündigung", "Presse", "Erfolg"];

  const handleLogin = () => {
    if (password === "jonglissimo2024") {
      setIsAuthenticated(true);
    } else {
      alert("Falsches Passwort");
    }
  };

  const generatePostId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const postData = {
      id: generatePostId(),
      title: newTitle || "Neue Neuigkeit",
      content: newContent || "Inhalt wird noch hinzugefügt...",
      media_url: selectedImage || "/placeholder-news.jpg",
      media_type: 'IMAGE',
      link: newLink || "",
      category: newCategory || "Allgemein",
      active: true
    };

    addPostMutation.mutate(postData);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              News Manager - Anmeldung
            </CardTitle>
            <Link href="/julius-cms" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Zurück zur CMS-Übersicht
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Passwort eingeben"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Anmelden
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 cms-manager">
      <ManagerNavigation currentManager="news-manager" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            News Manager
          </h1>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Abmelden
          </Button>
        </div>
        
        {/* Add New Post Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Neue Nachricht hinzufügen</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Titel</label>
                  <Input
                    type="text"
                    placeholder="Titel der Nachricht (optional - Standard: 'Neue Nachricht')"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kategorie</label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategorie wählen (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bild</label>
                <div className="space-y-2">
                  <Select value={selectedImage} onValueChange={setSelectedImage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Vorhandenes Bild wählen (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableImages.map((image) => (
                        <SelectItem key={image.url} value={image.url}>
                          {image.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">oder</span>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const mockUrl = `/uploads/${file.name}`;
                          setSelectedImage(mockUrl);
                        }
                      }}
                      className="text-sm"
                    />
                  </div>
                  <Input
                    type="url"
                    placeholder="oder Bild-URL eingeben"
                    value={selectedImage}
                    onChange={(e) => setSelectedImage(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Inhalt</label>
                <Textarea
                  placeholder="Inhalt der Nachricht (optional - Standard: 'Inhalt wird noch hinzugefügt...')"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Link (optional)</label>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-4">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <Button type="submit" disabled={addPostMutation.isPending}>
                  {addPostMutation.isPending ? "Hinzufügen..." : "Nachricht hinzufügen"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Current Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Aktuelle Nachrichten</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Laden...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(posts) ? posts.map((post: NewsPost) => (
                  <div key={post.id} className="border rounded-lg overflow-hidden">
                    <div className="relative">
                      <img 
                        src={post.media_url} 
                        alt={post.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="default" className="bg-primary">
                          {post.category}
                        </Badge>
                      </div>
                      {!post.active && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold">Inaktiv</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
                        {post.content}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500">
                          {new Date(post.timestamp).toLocaleDateString('de-DE')}
                        </span>
                        {post.link && (
                          <a 
                            href={post.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-dark flex items-center gap-1"
                          >
                            <span className="text-sm">Link öffnen</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant={post.active ? "default" : "secondary"}>
                          {post.active ? "Aktiv" : "Inaktiv"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePostMutation.mutate({ id: post.id, active: !post.active })}
                          disabled={togglePostMutation.isPending}
                        >
                          {post.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                          {post.active ? "Deaktivieren" : "Aktivieren"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Nachricht wirklich löschen?")) {
                              deletePostMutation.mutate(post.id);
                            }
                          }}
                          disabled={deletePostMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                          Löschen
                        </Button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full text-center text-gray-500">
                    Keine Nachrichten gefunden
                  </div>
                )}
              </div>
            )}
          </CardContent>
          
          <div className="p-6 border-t">
            <div className="text-sm text-muted-foreground">
              <p><strong>Hinweis:</strong> Nur aktive Nachrichten werden auf der Website angezeigt. Die Reihenfolge entspricht dem Hinzufügungsdatum.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}