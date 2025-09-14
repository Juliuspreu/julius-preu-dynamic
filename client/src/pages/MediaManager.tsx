import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trash2, ToggleLeft, ToggleRight, Lock, Plus, Edit, X, Save, ArrowLeft, Upload } from "lucide-react";
import { Link } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ManagerNavigation from "@/components/ManagerNavigation";

interface MediaItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  active: boolean;
  eventType?: string;
  eventDate?: string;
  createdAt: string;
  updatedAt: string;
}

export default function MediaManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newEventType, setNewEventType] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editEventType, setEditEventType] = useState("");
  const [editEventDate, setEditEventDate] = useState("");
  const queryClient = useQueryClient();

  // Get current media items - always call hooks at top level
  const { data: mediaItems = [], isLoading } = useQuery({
    queryKey: ['/api/media/manage'],
    queryFn: async () => {
      const response = await fetch('/api/media/manage');
      return response.json();
    },
    enabled: isAuthenticated // Only fetch when authenticated
  });

  // Toggle media item active status
  const toggleMediaMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const response = await fetch(`/api/media/${id}/toggle`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/media/manage'] });
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
    }
  });

  // Add new media item
  const addMediaMutation = useMutation({
    mutationFn: async (mediaData: any) => {
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mediaData)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/media/manage'] });
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      setNewTitle("");
      setNewDescription("");
      setNewImageUrl("");
      setNewCategory("");
      setNewEventType("");
      setNewEventDate("");
    }
  });

  // Update media item
  const updateMediaMutation = useMutation({
    mutationFn: async (mediaData: Partial<MediaItem> & { id: string }) => {
      const response = await fetch(`/api/media/${mediaData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mediaData)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/media/manage'] });
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      setEditingMedia(null);
      setEditTitle("");
      setEditDescription("");
      setEditImageUrl("");
      setEditCategory("");
      setEditEventType("");
      setEditEventDate("");
    }
  });

  // Delete media item
  const deleteMediaMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/media/manage'] });
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
    }
  });

  const handleLogin = () => {
    if (password === "jonglissimo2024") {
      setIsAuthenticated(true);
    } else {
      alert("Falsches Passwort!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Keine Required Fields mehr - Smart Defaults werden verwendet

    const mediaData = {
      title: newTitle,
      description: newDescription,
      imageUrl: newImageUrl,
      category: newCategory,
      eventType: newEventType,
      eventDate: newEventDate
    };

    addMediaMutation.mutate(mediaData);
  };

  const startEditingMedia = (media: MediaItem) => {
    setEditingMedia(media);
    setEditTitle(media.title);
    setEditDescription(media.description);
    setEditImageUrl(media.imageUrl);
    setEditCategory(media.category);
    setEditEventType(media.eventType || "");
    setEditEventDate(media.eventDate || "");
  };

  const cancelEditing = () => {
    setEditingMedia(null);
    setEditTitle("");
    setEditDescription("");
    setEditImageUrl("");
    setEditCategory("");
    setEditEventType("");
    setEditEventDate("");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMedia) return;

    const mediaData = {
      id: editingMedia.id,
      title: editTitle,
      description: editDescription,
      imageUrl: editImageUrl,
      category: editCategory,
      eventType: editEventType,
      eventDate: editEventDate
    };

    updateMediaMutation.mutate(mediaData);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Media Manager Login
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
      <ManagerNavigation currentManager="media-manager" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Media Manager
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

        {/* Add new media form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Neues Media Item hinzufügen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Titel</label>
                  <Input
                    type="text"
                    placeholder="Titel (optional - Standard: 'Neues Medienelement')"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Kategorie</label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategorie wählen (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pressefotos">Pressefotos</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="videos">Videos</SelectItem>
                      <SelectItem value="backstage">Backstage</SelectItem>
                      <SelectItem value="allgemein">Allgemein</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Beschreibung</label>
                <Textarea
                  placeholder="Beschreibung (optional - Standard: 'Beschreibung wird noch hinzugefügt')"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Bild</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif,.svg,.webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const mockUrl = `/uploads/${file.name}`;
                          setNewImageUrl(mockUrl);
                        }
                        setSelectedFile(file || null);
                      }}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-500">JPG, PNG, GIF, SVG, WebP (max. 10MB)</p>
                    <div className="text-center text-gray-500 text-sm">oder</div>
                    <Input
                      type="url"
                      placeholder="Bild-URL eingeben (optional)"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Event Typ</label>
                  <Input
                    type="text"
                    value={newEventType}
                    onChange={(e) => setNewEventType(e.target.value)}
                    placeholder="z.B. Festival, Gala"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Event Datum</label>
                  <Input
                    type="text"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    placeholder="z.B. 2024"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={addMediaMutation.isPending}
                className="w-full md:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                {addMediaMutation.isPending ? "Hinzufügen..." : "Media Item hinzufügen"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Media items list */}
        <Card>
          <CardHeader>
            <CardTitle>Media Items ({mediaItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Lade Media Items...</p>
              </div>
            ) : mediaItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Keine Media Items vorhanden.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {mediaItems.map((media: MediaItem) => (
                  <Card key={media.id} className={`${!media.active ? 'opacity-60' : ''}`}>
                    <CardContent className="p-6">
                      {editingMedia?.id === media.id ? (
                        // Edit form
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Titel *</label>
                              <Input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Kategorie *</label>
                              <Select value={editCategory} onValueChange={setEditCategory} required>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pressefotos">Pressefotos</SelectItem>
                                  <SelectItem value="events">Events</SelectItem>
                                  <SelectItem value="videos">Videos</SelectItem>
                                  <SelectItem value="backstage">Backstage</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Beschreibung</label>
                            <Textarea
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Bild URL *</label>
                              <Input
                                type="url"
                                value={editImageUrl}
                                onChange={(e) => setEditImageUrl(e.target.value)}
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Event Typ</label>
                              <Input
                                type="text"
                                value={editEventType}
                                onChange={(e) => setEditEventType(e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Event Datum</label>
                              <Input
                                type="text"
                                value={editEventDate}
                                onChange={(e) => setEditEventDate(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button 
                              type="submit" 
                              size="sm"
                              disabled={updateMediaMutation.isPending}
                            >
                              <Save className="w-4 h-4 mr-2" />
                              {updateMediaMutation.isPending ? "Speichern..." : "Speichern"}
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={cancelEditing}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Abbrechen
                            </Button>
                          </div>
                        </form>
                      ) : (
                        // Display mode
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {media.title}
                              </h3>
                              <Badge variant={media.active ? "default" : "secondary"}>
                                {media.active ? "Aktiv" : "Inaktiv"}
                              </Badge>
                              <Badge variant="outline">
                                {media.category}
                              </Badge>
                              {media.eventType && (
                                <Badge variant="outline" className="bg-blue-50">
                                  {media.eventType}
                                </Badge>
                              )}
                            </div>
                            
                            {media.description && (
                              <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                                {media.description}
                              </p>
                            )}
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              {media.eventDate && (
                                <span>Event: {media.eventDate}</span>
                              )}
                              <span>
                                Erstellt: {new Date(media.createdAt).toLocaleDateString('de-DE')}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            {media.imageUrl && (
                              <img 
                                src={media.imageUrl} 
                                alt={media.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditingMedia(media)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleMediaMutation.mutate({ 
                                id: media.id, 
                                active: !media.active 
                              })}
                              disabled={toggleMediaMutation.isPending}
                            >
                              {media.active ? (
                                <ToggleRight className="w-5 h-5 text-green-500" />
                              ) : (
                                <ToggleLeft className="w-5 h-5 text-gray-400" />
                              )}
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteMediaMutation.mutate(media.id)}
                              disabled={deleteMediaMutation.isPending}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}