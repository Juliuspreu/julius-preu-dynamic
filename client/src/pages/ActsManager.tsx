import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trash2, ToggleLeft, ToggleRight, Lock, Plus, Edit, X, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ManagerNavigation from "@/components/ManagerNavigation";

interface Act {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
  category: string;
  duration: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ActsManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [editingAct, setEditingAct] = useState<Act | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editVideoUrl, setEditVideoUrl] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const queryClient = useQueryClient();

  // Get current acts - always call hooks at top level
  const { data: acts = [], isLoading } = useQuery({
    queryKey: ['/api/acts/manage'],
    queryFn: async () => {
      const response = await fetch('/api/acts/manage');
      return response.json();
    },
    enabled: isAuthenticated // Only fetch when authenticated
  });

  // Add new act
  const addActMutation = useMutation({
    mutationFn: async (actData: Partial<Act>) => {
      const response = await fetch('/api/acts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actData)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/acts/manage'] });
      queryClient.invalidateQueries({ queryKey: ['/api/acts'] });
      setNewTitle("");
      setNewDescription("");
      setNewVideoUrl("");
      setNewImageUrl("");
      setNewCategory("");
      setNewDuration("");
    }
  });

  // Toggle act active status
  const toggleActMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const response = await fetch(`/api/acts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/acts/manage'] });
      queryClient.invalidateQueries({ queryKey: ['/api/acts'] });
    }
  });

  // Update act
  const updateActMutation = useMutation({
    mutationFn: async (actData: Partial<Act> & { id: string }) => {
      const response = await fetch(`/api/acts/${actData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actData)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/acts/manage'] });
      queryClient.invalidateQueries({ queryKey: ['/api/acts'] });
      setEditingAct(null);
      setEditTitle("");
      setEditDescription("");
      setEditVideoUrl("");
      setEditImageUrl("");
      setEditCategory("");
      setEditDuration("");
    }
  });

  // Delete act
  const deleteActMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/acts/${id}`, {
        method: 'DELETE'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/acts/manage'] });
      queryClient.invalidateQueries({ queryKey: ['/api/acts'] });
    }
  });

  const handleLogin = () => {
    if (password === "jonglissimo2024") {
      setIsAuthenticated(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const actData = {
      title: newTitle || "Neue Show",
      description: newDescription || "Beschreibung wird noch hinzugefügt",
      videoUrl: newVideoUrl || "",
      imageUrl: newImageUrl || "/placeholder-image.jpg",
      category: newCategory || "allgemein",
      duration: newDuration || "3:00"
    };

    addActMutation.mutate(actData);
  };

  const startEditingAct = (act: Act) => {
    setEditingAct(act);
    setEditTitle(act.title);
    setEditDescription(act.description);
    setEditVideoUrl(act.videoUrl);
    setEditImageUrl(act.imageUrl);
    setEditCategory(act.category);
    setEditDuration(act.duration);
  };

  const cancelEditing = () => {
    setEditingAct(null);
    setEditTitle("");
    setEditDescription("");
    setEditVideoUrl("");
    setEditImageUrl("");
    setEditCategory("");
    setEditDuration("");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAct || !editTitle || !editDescription || !editCategory) return;

    const actData = {
      id: editingAct.id,
      title: editTitle,
      description: editDescription,
      videoUrl: editVideoUrl,
      imageUrl: editImageUrl,
      category: editCategory,
      duration: editDuration
    };

    updateActMutation.mutate(actData);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Acts Manager - Anmeldung
            </CardTitle>
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
      <ManagerNavigation currentManager="acts-manager" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Acts Manager
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
        
        {/* Add New Act Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Neuen Act hinzufügen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Titel</label>
                  <Input
                    type="text"
                    placeholder="Act Titel (optional - Standard: 'Neue Show')"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Kategorie</label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategorie auswählen (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">Solo Acts</SelectItem>
                      <SelectItem value="duo">Duo Acts</SelectItem>
                      <SelectItem value="gravitos">Gravitos Acts</SelectItem>
                      <SelectItem value="jonglissimo">Jonglissimo Acts</SelectItem>
                      <SelectItem value="show">Allgemeine Shows</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Beschreibung</label>
                <Textarea
                  placeholder="Act Beschreibung (optional - Standard: 'Beschreibung folgt in Kürze...')"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Video URL</label>
                  <Input
                    type="url"
                    placeholder="YouTube Video URL"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    YouTube URL (falls leer, wird automatisch das Thumbnail verwendet)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Bild</label>
                  <div className="space-y-2">
                    <Input
                      type="url"
                      placeholder="Bild URL oder leer lassen für YouTube Thumbnail"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">oder</span>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // In real implementation, upload file and get URL
                            const mockUrl = `/uploads/${file.name}`;
                            setNewImageUrl(mockUrl);
                          }
                        }}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={addActMutation.isPending}
              >
                {addActMutation.isPending ? "Wird hinzugefügt..." : "Act hinzufügen"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Acts List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Vorhandene Acts ({acts.length})
          </h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Lade Acts...</p>
            </div>
          ) : acts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Keine Acts vorhanden.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {acts.map((act: Act) => (
                <Card key={act.id} className={`${!act.active ? 'opacity-60' : ''}`}>
                  <CardContent className="p-6">
                    {editingAct?.id === act.id ? (
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
                                <SelectItem value="solo">Solo Acts</SelectItem>
                                <SelectItem value="duo">Duo Acts</SelectItem>
                                <SelectItem value="gravitos">Gravitos Acts</SelectItem>
                                <SelectItem value="jonglissimo">Jonglissimo Acts</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Beschreibung *</label>
                          <Textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            rows={3}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Video URL</label>
                            <Input
                              type="url"
                              value={editVideoUrl}
                              onChange={(e) => setEditVideoUrl(e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Bild URL</label>
                            <Input
                              type="url"
                              value={editImageUrl}
                              onChange={(e) => setEditImageUrl(e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Dauer</label>
                            <Input
                              type="text"
                              value={editDuration}
                              onChange={(e) => setEditDuration(e.target.value)}
                              placeholder="z.B. 3:12"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button 
                            type="submit" 
                            size="sm"
                            disabled={updateActMutation.isPending}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {updateActMutation.isPending ? "Speichern..." : "Speichern"}
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
                              {act.title}
                            </h3>
                            <Badge variant={act.active ? "default" : "secondary"}>
                              {act.active ? "Aktiv" : "Inaktiv"}
                            </Badge>
                            <Badge variant="outline">
                              {act.category}
                            </Badge>
                            {act.duration && (
                              <Badge variant="outline" className="bg-blue-50">
                                {act.duration}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                            {act.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            {act.videoUrl && (
                              <a 
                                href={act.videoUrl.replace('/embed/', '/watch?v=')} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:text-primary"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Video
                              </a>
                            )}
                            <span>
                              Erstellt: {new Date(act.createdAt).toLocaleDateString('de-DE')}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          {act.imageUrl && (
                            <img 
                              src={act.imageUrl} 
                              alt={act.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditingAct(act)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleActMutation.mutate({ 
                              id: act.id, 
                              active: !act.active 
                            })}
                            disabled={toggleActMutation.isPending}
                          >
                            {act.active ? (
                              <ToggleRight className="w-5 h-5 text-green-500" />
                            ) : (
                              <ToggleLeft className="w-5 h-5 text-gray-400" />
                            )}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteActMutation.mutate(act.id)}
                            disabled={deleteActMutation.isPending}
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
        </div>
      </div>
    </div>
  );
}