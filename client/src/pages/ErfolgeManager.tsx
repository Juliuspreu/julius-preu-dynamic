import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Achievement } from "@shared/schema";
import ManagerNavigation from "@/components/ManagerNavigation";

const achievementSchema = z.object({
  year: z.string().min(1, "Jahr ist erforderlich"),
  title: z.string().min(1, "Titel ist erforderlich"),
  description: z.string().min(1, "Beschreibung ist erforderlich"),
  isActive: z.boolean().default(true),
});

type AchievementForm = z.infer<typeof achievementSchema>;

export default function ErfolgeManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: achievements = [], isLoading } = useQuery({
    queryKey: ["/api/achievements"],
    enabled: isAuthenticated,
  });

  const form = useForm<AchievementForm>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      year: "",
      title: "",
      description: "",
      isActive: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: AchievementForm) => {
      console.log("Creating achievement with data:", data);
      return apiRequest("POST", "/api/achievements", data);
    },
    onSuccess: (response) => {
      console.log("Achievement created successfully:", response);
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      toast({ title: "Erfolg erfolgreich erstellt!" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      console.error("Error creating achievement:", error);
      toast({
        title: "Fehler beim Erstellen",
        description: error?.message || "Unbekannter Fehler aufgetreten",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: AchievementForm }) =>
      apiRequest("PUT", `/api/achievements/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      toast({ title: "Erfolg aktualisiert!" });
      setIsDialogOpen(false);
      setEditingAchievement(null);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/achievements/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      toast({ title: "Erfolg gelöscht!" });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleLogin = () => {
    if (password === "jonglissimo2024") {
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Falsches Passwort",
        description: "Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    form.setValue("year", achievement.year);
    form.setValue("title", achievement.title);
    form.setValue("description", achievement.description);
    form.setValue("isActive", achievement.isActive || true);
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: AchievementForm) => {
    if (editingAchievement) {
      updateMutation.mutate({ id: editingAchievement.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const resetForm = () => {
    setEditingAchievement(null);
    form.reset();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Erfolge Manager - Anmeldung</CardTitle>
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
        <ManagerNavigation currentManager="erfolge-manager" />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Erfolge Manager</h1>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Neuer Erfolg
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingAchievement ? "Erfolg bearbeiten" : "Neuer Erfolg"}
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jahr</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="z.B. 2024" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titel</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="z.B. Jonglierweltmeister" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Beschreibung</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Detaillierte Beschreibung des Erfolgs..."
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Abbrechen
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createMutation.isPending || updateMutation.isPending}
                    >
                      {editingAchievement ? "Aktualisieren" : "Erstellen"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Lade Erfolge...</div>
        ) : (
          <div className="grid gap-6">
            {achievements.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-gray-500">
                  Keine Erfolge vorhanden. Erstellen Sie den ersten Erfolg!
                </CardContent>
              </Card>
            ) : (
              achievements.map((achievement: Achievement) => (
                <Card key={achievement.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-semibold text-primary">
                            {achievement.year}
                          </span>
                          {achievement.isActive ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                        <p className="text-gray-600">{achievement.description}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(achievement)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (confirm("Möchten Sie diesen Erfolg wirklich löschen?")) {
                              deleteMutation.mutate(achievement.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}