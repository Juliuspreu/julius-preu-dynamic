import { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trash2, Star, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ManagerNavigation from "@/components/ManagerNavigation";

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
  isApproved: boolean;
  isActive: boolean;
  isPublic: boolean;
  sortOrder: number;
  createdAt: string;
}

export default function RezensionenManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    title: "",
    content: "",
    serviceType: "",
    eventDate: "",
    location: "",
    imageUrl: "",
    category: "general"
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleLogin = () => {
    if (password === "jonglissimo2024") {
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Fehler",
        description: "Falsches Passwort",
        variant: "destructive",
      });
    }
  };

  // Get all reviews
  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
    enabled: isAuthenticated,
  });

  // Add review mutation
  const addReviewMutation = useMutation({
    mutationFn: async (reviewData: Partial<Review>) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
      if (!response.ok) throw new Error('Failed to create review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      setIsDialogOpen(false);
      setFormData({
        name: "",
        email: "",
        rating: 5,
        title: "",
        content: "",
        serviceType: "",
        eventDate: "",
        location: "",
        imageUrl: "",
        category: "general"
      });
      toast({ title: "Rezension erfolgreich hinzugefügt!" });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Rezension konnte nicht erstellt werden",
        variant: "destructive",
      });
    }
  });

  // Toggle approval mutation
  const toggleApprovalMutation = useMutation({
    mutationFn: async ({ id, isApproved }: { id: number; isApproved: boolean }) => {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved })
      });
      if (!response.ok) throw new Error('Failed to update review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({ title: "Genehmigungsstatus geändert!" });
    }
  });

  // Toggle public mutation
  const togglePublicMutation = useMutation({
    mutationFn: async ({ id, isPublic }: { id: number; isPublic: boolean }) => {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublic })
      });
      if (!response.ok) throw new Error('Failed to update review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({ title: "Sichtbarkeitsstatus geändert!" });
    }
  });

  // Delete review mutation
  const deleteReviewMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({ title: "Rezension gelöscht!" });
    }
  });

  const handleSubmit = () => {
    addReviewMutation.mutate(formData);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Rezensionen Manager - Anmeldung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Passwort eingeben"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 cms-manager">
      <div className="container mx-auto px-4">
        <ManagerNavigation currentManager="rezensionen" />
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Rezensionen Manager</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Neue Rezension hinzufügen</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Neue Rezension hinzufügen</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Kunde Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-Mail (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="kunde@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rating">Bewertung</Label>
                    <Select
                      value={formData.rating.toString()}
                      onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Sterne - Ausgezeichnet</SelectItem>
                        <SelectItem value="4">4 Sterne - Sehr gut</SelectItem>
                        <SelectItem value="3">3 Sterne - Gut</SelectItem>
                        <SelectItem value="2">2 Sterne - Befriedigend</SelectItem>
                        <SelectItem value="1">1 Stern - Mangelhaft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="serviceType">Service-Typ</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Service wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="show">Show/Performance</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="videokurs">Videokurs</SelectItem>
                        <SelectItem value="teambuilding">Teambuilding</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventDate">Veranstaltungsdatum (optional)</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Ort (optional)</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Wien, Österreich"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Titel</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Kurzer Titel der Bewertung"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Bewertungstext</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Detaillierte Bewertung..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Kategorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kategorie auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Allgemeine Testimonials (Startseite)</SelectItem>
                      <SelectItem value="workshop">Workshop-Rezensionen (Workshops-Seite)</SelectItem>
                      <SelectItem value="about">Referenzen (About-Seite)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="image">Profilbild (optional)</Label>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const mockUrl = `/uploads/reviews/${file.name}`;
                          setFormData({ ...formData, imageUrl: mockUrl });
                        }
                      }}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                    <Input
                      type="url"
                      placeholder="oder Bild-URL eingeben"
                      value={formData.imageUrl || ''}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Abbrechen
                  </Button>
                  <Button onClick={handleSubmit} disabled={addReviewMutation.isPending}>
                    Hinzufügen
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Lädt...</div>
        ) : (
          <div className="grid gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{review.name}</h3>
                        <div className="flex">{renderStars(review.rating)}</div>
                        <Badge variant={review.isApproved ? "default" : "secondary"}>
                          {review.isApproved ? "Genehmigt" : "Wartend"}
                        </Badge>
                        <Badge variant={review.isPublic ? "default" : "outline"}>
                          {review.isPublic ? "Öffentlich" : "Privat"}
                        </Badge>
                      </div>
                      <h4 className="text-lg font-medium mb-2">{review.title}</h4>
                      {review.serviceType && (
                        <Badge variant="outline" className="mr-2">
                          {review.serviceType}
                        </Badge>
                      )}
                      {review.eventDate && (
                        <span className="text-sm text-gray-500 mr-4">
                          Datum: {new Date(review.eventDate).toLocaleDateString()}
                        </span>
                      )}
                      {review.location && (
                        <span className="text-sm text-gray-500">
                          Ort: {review.location}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteReviewMutation.mutate(review.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{review.content}</p>
                  
                  <div className="flex items-center gap-6 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={review.isApproved}
                        onCheckedChange={(checked) =>
                          toggleApprovalMutation.mutate({ id: review.id, isApproved: checked })
                        }
                      />
                      <Label>Genehmigt</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={review.isPublic}
                        onCheckedChange={(checked) =>
                          togglePublicMutation.mutate({ id: review.id, isPublic: checked })
                        }
                      />
                      <Label>Öffentlich sichtbar</Label>
                    </div>
                    
                    <span className="text-sm text-gray-500 ml-auto">
                      Erstellt: {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {reviews.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500">Noch keine Rezensionen vorhanden.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}