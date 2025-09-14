import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Trash2, Plus, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import { insertFeatureSchema, type Feature, type InsertFeature } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ManagerNavigation from "@/components/ManagerNavigation";

export default function FeaturesManager() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<InsertFeature>({
    resolver: zodResolver(insertFeatureSchema),
    defaultValues: {
      title: "",
      description: "",
      iconSvg: "",
      sortOrder: 0,
      isActive: true,
    },
  });

  const { data: features, isLoading } = useQuery<Feature[]>({
    queryKey: ["/api/features"],
    enabled: isAuthenticated,
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertFeature) => apiRequest("POST", "/api/features", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/features"] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Erfolg",
        description: "Feature wurde erfolgreich erstellt",
      });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Feature konnte nicht erstellt werden",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: number; updates: Partial<InsertFeature> }) =>
      apiRequest("PUT", `/api/features/${data.id}`, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/features"] });
      setIsDialogOpen(false);
      setEditingFeature(null);
      form.reset();
      toast({
        title: "Erfolg",
        description: "Feature wurde erfolgreich aktualisiert",
      });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Feature konnte nicht aktualisiert werden",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/features/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/features"] });
      toast({
        title: "Erfolg",
        description: "Feature wurde erfolgreich gelöscht",
      });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Feature konnte nicht gelöscht werden",
        variant: "destructive",
      });
    },
  });

  const handlePasswordSubmit = () => {
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

  const handleSubmit = (data: InsertFeature) => {
    if (editingFeature) {
      updateMutation.mutate({ id: editingFeature.id, updates: data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (feature: Feature) => {
    setEditingFeature(feature);
    form.reset({
      title: feature.title,
      description: feature.description,
      iconSvg: feature.iconSvg,
      sortOrder: feature.sortOrder || 0,
      isActive: feature.isActive || true,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Sind Sie sicher, dass Sie dieses Feature löschen möchten?")) {
      deleteMutation.mutate(id);
    }
  };

  const openCreateDialog = () => {
    setEditingFeature(null);
    form.reset({
      title: "",
      description: "",
      iconSvg: "",
      sortOrder: 0,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const updateSortOrder = (id: number, direction: "up" | "down") => {
    const feature = features?.find(f => f.id === id);
    if (!feature) return;

    const currentOrder = feature.sortOrder || 0;
    const newOrder = direction === "up" ? currentOrder - 1 : currentOrder + 1;
    
    updateMutation.mutate({ 
      id, 
      updates: { sortOrder: newOrder } 
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Features Manager</CardTitle>
            <CardDescription>Passwort eingeben um fortzufahren</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handlePasswordSubmit()}
              />
              <Button onClick={handlePasswordSubmit} className="w-full">
                Anmelden
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 cms-manager">
      <div className="max-w-6xl mx-auto">
        <ManagerNavigation currentManager="features-manager" />
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Features Manager</h1>
            <p className="text-gray-300 mt-2">Verwalten Sie die Service-Features der Website</p>
          </div>
          <Button onClick={openCreateDialog} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Neues Feature
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center text-white">Lädt Features...</div>
        ) : (
          <div className="grid gap-6">
            {features?.map((feature) => (
              <Card key={feature.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div 
                          className="w-8 h-8 text-purple-400" 
                          dangerouslySetInnerHTML={{ __html: feature.iconSvg }}
                        />
                        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                        <span className="text-sm text-gray-400">
                          Reihenfolge: {feature.sortOrder || 0}
                        </span>
                        {feature.isActive ? (
                          <Eye className="w-4 h-4 text-green-400" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateSortOrder(feature.id, "up")}
                        className="text-white border-white/20 hover:bg-white/10"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateSortOrder(feature.id, "down")}
                        className="text-white border-white/20 hover:bg-white/10"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(feature)}
                        className="text-white border-white/20 hover:bg-white/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(feature.id)}
                        className="text-red-400 border-red-400/20 hover:bg-red-400/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                {editingFeature ? "Feature bearbeiten" : "Neues Feature erstellen"}
              </DialogTitle>
              <DialogDescription>
                {editingFeature ? "Bearbeiten Sie die Feature-Details" : "Erstellen Sie ein neues Service-Feature"}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titel</FormLabel>
                        <FormControl>
                          <Input placeholder="z.B. Weltmeister-Qualität" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sortOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reihenfolge</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            value={field.value || 0}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beschreibung</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Beschreibung des Features..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="iconSvg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SVG Icon Code</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>...</svg>"
                          className="min-h-[150px] font-mono text-sm"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                      {field.value && (
                        <div className="mt-2 p-3 border rounded-md bg-gray-50">
                          <p className="text-sm text-gray-600 mb-2">Vorschau:</p>
                          <div 
                            className="w-8 h-8 text-purple-600" 
                            dangerouslySetInnerHTML={{ __html: field.value }}
                          />
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Abbrechen
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {createMutation.isPending || updateMutation.isPending ? "Speichert..." : "Speichern"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}