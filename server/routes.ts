import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertAchievementSchema, insertFeatureSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Instagram posts storage
let instagramPosts = [
  {
    id: "1",
    caption: "Spektakuläre LED-Performance beim Gala-Event 🔥",
    media_url: "/20240627-DSC03407.jpg",
    media_type: "IMAGE",
    permalink: "https://instagram.com/p/sample1",
    timestamp: "2024-06-27T20:00:00Z",
    active: true
  },
  {
    id: "2", 
    caption: "Training für die nächste große Show ⚡",
    media_url: "/JPI_3313.jpg",
    media_type: "IMAGE",
    permalink: "https://instagram.com/p/sample2",
    timestamp: "2024-06-26T18:30:00Z",
    active: true
  }
];

// News posts storage
interface NewsPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

let newsPosts: NewsPost[] = [
  {
    id: "news_1",
    title: "Neue Show verfügbar",
    content: "Wir haben eine neue spektakuläre LED-Show entwickelt...",
    excerpt: "Entdecken Sie unsere neueste LED-Performance",
    imageUrl: "/20240627-DSC03407.jpg",
    publishedAt: "2024-06-27",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function registerRoutes(app: Express): Promise<Server> {
  // Instagram API endpoint
  app.get("/api/instagram/:username", async (req, res) => {
    try {
      const { username } = req.params;
      
      // Using Instagram's public endpoints for public accounts
      const instagramUrl = `https://www.instagram.com/${username}/`;
      
      // Return mock Instagram posts - can be replaced with real Instagram API later
      const mockPosts = [
        {
          id: "1",
          caption: "Spektakuläre LED-Performance beim Gala-Event 🔥",
          media_url: "/20240627-DSC03407.jpg",
          media_type: "IMAGE",
          permalink: "https://instagram.com/p/sample1",
          timestamp: "2024-06-27T20:00:00Z",
          active: true
        },
        {
          id: "2", 
          caption: "Training für die nächste große Show ⚡",
          media_url: "/JPI_3313.jpg",
          media_type: "IMAGE",
          permalink: "https://instagram.com/p/sample2",
          timestamp: "2024-06-26T18:30:00Z",
          active: true
        }
      ];
      
      const activePosts = instagramPosts.filter(post => post.active);
      res.json({
        data: activePosts.slice(0, 6),
        username: username
      });
      
    } catch (error) {
      console.error('Instagram API error:', error);
      res.status(500).json({ error: 'Failed to fetch Instagram posts' });
    }
  });

  // Instagram posts management
  app.get("/api/instagram/posts", async (req, res) => {
    try {
      res.json({ data: instagramPosts, username: "posts" });
    } catch (error) {
      console.error('Get Instagram posts error:', error);
      res.status(500).json({ error: 'Failed to get Instagram posts' });
    }
  });

  app.post("/api/instagram/posts", async (req, res) => {
    try {
      const newPost = {
        ...req.body,
        timestamp: req.body.timestamp || new Date().toISOString()
      };
      instagramPosts.unshift(newPost);
      res.json(newPost);
    } catch (error) {
      console.error('Add Instagram post error:', error);
      res.status(500).json({ error: 'Failed to add Instagram post' });
    }
  });

  app.patch("/api/instagram/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const postIndex = instagramPosts.findIndex(post => post.id === id);
      if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
      }
      instagramPosts[postIndex] = { ...instagramPosts[postIndex], ...req.body };
      res.json(instagramPosts[postIndex]);
    } catch (error) {
      console.error('Update Instagram post error:', error);
      res.status(500).json({ error: 'Failed to update Instagram post' });
    }
  });

  app.delete("/api/instagram/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const postIndex = instagramPosts.findIndex(post => post.id === id);
      if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
      }
      instagramPosts.splice(postIndex, 1);
      res.json({ success: true });
    } catch (error) {
      console.error('Delete Instagram post error:', error);
      res.status(500).json({ error: 'Failed to delete Instagram post' });
    }
  });

  // News Posts Management
  let newsPosts = [
    {
      id: "news_1",
      title: "Erfolgreiche Performance beim Stadtfest München",
      content: "Ein unvergesslicher Abend mit begeistertem Publikum! Die LED-Jonglage war der absolute Höhepunkt des Events.",
      media_url: "/20240627-DSC03407.jpg",
      media_type: "IMAGE",
      link: "",
      category: "Performance",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      active: true
    },
    {
      id: "news_2",
      title: "Lucidor LED Juggling Act",
      content: "Ein faszinierender Solo-Act mit leuchtenden LED-Bällen und Keulen sowie einem interaktiven, programmierten Tor aus LED-Keulen. Durch perfekte Präzision und eindrucksvolle Lichteffekte besticht dieser Act. Die synchrone Choreographie zur Musik erschafft eine magische Atmosphäre für Ihr Event.",
      media_url: "/20240627-DSC03436.jpg",
      media_type: "IMAGE",
      link: "https://youtu.be/niDQsEosK0s?si=jUlmbPiqbk1aoyzO",
      category: "Show",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      active: true
    },
    {
      id: "news_3",
      title: "Buchungen für 2025 jetzt möglich",
      content: "Die Terminplanung für 2025 ist eröffnet! Sichern Sie sich frühzeitig Ihren Wunschtermin für unvergessliche Shows.",
      media_url: "/20240627-DSC03516.jpg",
      media_type: "IMAGE",
      link: "",
      category: "Ankündigung",
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      active: true
    },
    {
      id: "news_4",
      title: "Corporate Event bei BMW erfolgreich abgeschlossen",
      content: "Eine spektakuläre Show für 500 Gäste - perfekte Unterhaltung für Firmenveranstaltungen jeder Größe.",
      media_url: "/JPI_3313.jpg",
      media_type: "IMAGE",
      link: "",
      category: "Erfolg",
      timestamp: new Date(Date.now() - 345600000).toISOString(),
      active: true
    },
    {
      id: "news_5",
      title: "Pressebericht: 'Jonglage neu definiert'",
      content: "Die Süddeutsche Zeitung berichtet über innovative Jonglage-Techniken und die Zukunft der Zirkuskunst.",
      media_url: "/Juli.jpg",
      media_type: "IMAGE",
      link: "https://example.com/pressebericht",
      category: "Presse",
      timestamp: new Date(Date.now() - 432000000).toISOString(),
      active: true
    },
    {
      id: "news_6",
      title: "Duo-Performance: Synchronisation auf höchstem Niveau",
      content: "Zwei Künstler, eine Vision - erleben Sie perfekte Harmonie in der Jonglage-Performance.",
      media_url: "/JPI_2779.jpg",
      media_type: "IMAGE",
      link: "",
      category: "Performance",
      timestamp: new Date(Date.now() - 518400000).toISOString(),
      active: true
    }
  ];

  // Get all news posts for management
  app.get("/api/news/posts", async (req, res) => {
    try {
      res.json(newsPosts);
    } catch (error) {
      console.error('Get news posts error:', error);
      res.status(500).json({ error: 'Failed to get news posts' });
    }
  });

  // Add new news post
  app.post("/api/news/posts", async (req, res) => {
    try {
      const newPost = {
        id: req.body.id || `news_${Date.now()}`,
        title: req.body.title || "Neue Neuigkeit",
        content: req.body.content || "Inhalt wird noch hinzugefügt...",
        media_url: req.body.media_url || req.body.imageUrl || "/placeholder-news.jpg",
        media_type: req.body.media_type || "IMAGE",
        link: req.body.link || "",
        category: req.body.category || "Allgemein",
        active: req.body.active !== undefined ? req.body.active : true,
        timestamp: new Date().toISOString()
      };
      
      // Add new post at beginning
      newsPosts.unshift(newPost);
      
      res.json(newPost);
    } catch (error) {
      console.error('Add news post error:', error);
      res.status(500).json({ error: 'Failed to add news post' });
    }
  });

  // Update news post active status
  app.patch("/api/news/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { active } = req.body;
      
      const postIndex = newsPosts.findIndex(post => post.id === id);
      if (postIndex === -1) {
        return res.status(404).json({ error: 'News post not found' });
      }
      
      newsPosts[postIndex].active = active;
      res.json(newsPosts[postIndex]);
    } catch (error) {
      console.error('Update news post error:', error);
      res.status(500).json({ error: 'Failed to update news post' });
    }
  });

  // Delete news post
  app.delete("/api/news/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const postIndex = newsPosts.findIndex(post => post.id === id);
      if (postIndex === -1) {
        return res.status(404).json({ error: 'News post not found' });
      }
      
      newsPosts.splice(postIndex, 1);
      res.json({ success: true });
    } catch (error) {
      console.error('Delete news post error:', error);
      res.status(500).json({ error: 'Failed to delete news post' });
    }
  });

  // Acts Management
  let acts = [
    {
      id: "kings-gambit",
      title: "Kings Gambit",
      description: "Eine spannende und innovative Leuchtkeulenjonglage, welche nicht nur die Jury der Jonglierweltmeisterschaft 2024 überzeugte, sondern auch die Sinne verzaubert! Der Act \"Kings Gambit\" verkörpert eine rasante Leuchtkeulen Performance mit atemberaubender Präzision, synchronisiert zur mitreißenden Musik! Diesen Act zu buchen, ist bestimmt ein kluger Schachzug ;-)",
      videoUrl: "https://www.youtube.com/embed/qlctkxLUaPA",
      imageUrl: "/20240627-DSC03516.jpg",
      category: "gravitos",
      duration: "3:12",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "lucidor-led",
      title: "Lucidor LED Juggling Act",
      description: "Ein faszinierender Solo-Act mit leuchtenden LED-Bällen und Keulen sowie einem interaktiven, programmierten Tor aus LED-Keulen. Durch perfekte Präzision und eindrucksvolle Lichteffekte besticht dieser Act. Die synchrone Choreographie zur Musik erschafft eine magische Atmosphäre für Ihr Event.",
      videoUrl: "https://www.youtube.com/embed/niDQsEosK0s",
      imageUrl: "/JuliusPreu 5c_1751623892223.jpg",
      category: "solo",
      duration: "2:45",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "amadeus-ring",
      title: "Amadeus Ring Jonglage",
      description: "Elegante Ringjonglage zu Modern-Klassischer Musik. Eine beeindruckende Fusion von Präzision und Eleganz. Hierbei manipulieren wir die Ringe geschickt, verleihen der Vorstellung eine fließende Dynamik und schaffen so eine fesselnde visuelle Darbietung.",
      videoUrl: "https://www.youtube.com/embed/pOl0FctuU_I",
      imageUrl: "https://img.youtube.com/vi/pOl0FctuU_I/maxresdefault.jpg",
      category: "gravitos",
      duration: "4:21",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "gravitos-showblock",
      title: "30 Minuten Best of Gravitos - Showblock",
      description: "Das Beste von Gravitos in einem spektakulären 30-minütigen Showblock! Erleben Sie beeindruckende Performances, Comedy mit Messern, technische Meisterleistungen und 30 Minuten pure gute Laune. Von klassischer Jonglage bis hin zu waghalsigen Stunts - diese Show bietet das komplette Gravitos-Erlebnis für Ihr Event.",
      videoUrl: "https://www.youtube.com/embed/Mk-7iKexjlU",
      imageUrl: "/20240627-DSC03185.jpg",
      category: "gravitos",
      duration: "6:18",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "lightpainting",
      title: "Lightpainting",
      description: "Die Evolution der Leuchtperformance: Durch bewegte Glowobjekte und Echtzeit-Videoeffekte entstehen dynamische Lichtspuren auf der Projektionsfläche. Eine innovative Show mit individueller Anpassung - Ihr Logo oder eine besondere Botschaft wird nahtlos integriert für ein unvergessliches Erlebnis. Foto: @vanetti",
      videoUrl: "https://www.youtube.com/embed/Zm_oy1m-g3k",
      imageUrl: "/attached_assets/08-vanetti_1749486494882.jpeg",
      category: "jonglissimo",
      duration: "1:52",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "galactica",
      title: "Galactica",
      description: "Ein spektakulärer LED-Showact mit atemberaubenden Visuals, der Sterne und Energiespuren am Nachthimmel entstehen lässt. Weltmeisterliche Präzision trifft auf modernste Technologie und erschafft ein faszinierendes Gesamtkunstwerk aus Licht, Bewegung und Innovation.",
      videoUrl: "https://www.youtube.com/embed/0s_BG3b1yDE",
      imageUrl: "/galactica1_1749487146955.jpg",
      category: "jonglissimo",
      duration: "4:15",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "nightlight",
      title: "Nightlight",
      description: "Eine innovative LED-Jonglage-Performance mit modernstem Equipment. Leuchtende Keulen erschaffen faszinierende Bilder in der Dunkelheit zu klassischer Musik mit modernen Einflüssen. Perfekte Orbits, synchrone Farbwechsel und riskante Austausch-Manöver münden in ein spektakuläres 19-Keulen-Finale. Ein unvergessliches Licht-Spektakel.",
      videoUrl: "https://www.youtube.com/embed/IEpe7jgJSO4",
      imageUrl: "/18-luger_1751623909812.jpg",
      category: "jonglissimo",
      duration: "5:23",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "radiance",
      title: "Radiance - Abendfüllende Theatershow (60min)",
      description: "Faszinierende Lichtphänomene der Natur wie der strahlende Sonnenaufgang, das zarte Leuchten der Glühwürmchen und die tanzenden Nordlichter erscheinen in neuem Glanz. Mit LED-Jonglage und kunstvollen Lichteffekten entführt uns Jonglissimo in eine Welt lumineszenter Träume. Eine Reise voller Magie und Mystik, die uns dazu einlädt, die innige Verbundenheit zwischen menschlicher Kreativität und den Wundern des Universums neu zu entdecken.",
      videoUrl: "https://www.youtube.com/embed/FYGmvIhtRiQ",
      imageUrl: "/radiance6_1751624043287.jpg",
      category: "jonglissimo",
      duration: "60:00",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Get all acts
  app.get("/api/acts", async (req, res) => {
    try {
      res.json(acts.filter(act => act.active));
    } catch (error) {
      console.error('Get acts error:', error);
      res.status(500).json({ error: 'Failed to get acts' });
    }
  });

  // Get all acts for management
  app.get("/api/acts/manage", async (req, res) => {
    try {
      res.json(acts);
    } catch (error) {
      console.error('Get acts error:', error);
      res.status(500).json({ error: 'Failed to get acts' });
    }
  });

  // Add new act
  app.post("/api/acts", async (req, res) => {
    try {
      const { title, description, videoUrl, imageUrl, category, duration } = req.body;
      
      // Use defaults for missing fields
      const actTitle = title || "Neue Show";
      const actDescription = description || "Beschreibung folgt in Kürze...";
      
      // Generate ID from title
      const id = actTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      
      // Extract YouTube video ID if it's a YouTube URL
      let processedVideoUrl = videoUrl || "";
      let processedImageUrl = imageUrl || "/placeholder-show.jpg";
      
      if (videoUrl && videoUrl.includes('youtube.com/watch?v=')) {
        const videoId = videoUrl.split('v=')[1].split('&')[0];
        processedVideoUrl = `https://www.youtube.com/embed/${videoId}`;
        
        // If no image provided, use YouTube thumbnail
        if (!imageUrl) {
          processedImageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      } else if (videoUrl && videoUrl.includes('youtu.be/')) {
        const videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        processedVideoUrl = `https://www.youtube.com/embed/${videoId}`;
        
        // If no image provided, use YouTube thumbnail
        if (!imageUrl) {
          processedImageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      }
      
      const newAct = {
        id,
        title: actTitle,
        description: actDescription,
        videoUrl: processedVideoUrl,
        imageUrl: processedImageUrl,
        category: category || "show",
        duration: duration || "0:00",
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      acts.unshift(newAct);
      res.json(newAct);
    } catch (error) {
      console.error('Add act error:', error);
      res.status(500).json({ error: 'Failed to add act' });
    }
  });

  // Update act
  app.patch("/api/acts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const actIndex = acts.findIndex(act => act.id === id);
      if (actIndex === -1) {
        return res.status(404).json({ error: 'Act not found' });
      }
      
      // Process video URL and image URL like in POST
      let processedVideoUrl = updates.videoUrl || acts[actIndex].videoUrl;
      let processedImageUrl = updates.imageUrl || acts[actIndex].imageUrl;
      
      if (updates.videoUrl && updates.videoUrl.includes('youtube.com/watch?v=')) {
        const videoId = updates.videoUrl.split('v=')[1].split('&')[0];
        processedVideoUrl = `https://www.youtube.com/embed/${videoId}`;
        
        // If no image provided, use YouTube thumbnail
        if (!updates.imageUrl) {
          processedImageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      } else if (updates.videoUrl && updates.videoUrl.includes('youtu.be/')) {
        const videoId = updates.videoUrl.split('youtu.be/')[1].split('?')[0];
        processedVideoUrl = `https://www.youtube.com/embed/${videoId}`;
        
        // If no image provided, use YouTube thumbnail
        if (!updates.imageUrl) {
          processedImageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      }
      
      acts[actIndex] = {
        ...acts[actIndex],
        ...updates,
        videoUrl: processedVideoUrl,
        imageUrl: processedImageUrl,
        updatedAt: new Date().toISOString()
      };
      
      res.json(acts[actIndex]);
    } catch (error) {
      console.error('Update act error:', error);
      res.status(500).json({ error: 'Failed to update act' });
    }
  });

  // Delete act
  app.delete("/api/acts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const actIndex = acts.findIndex(act => act.id === id);
      if (actIndex === -1) {
        return res.status(404).json({ error: 'Act not found' });
      }
      
      acts.splice(actIndex, 1);
      res.json({ success: true });
    } catch (error) {
      console.error('Delete act error:', error);
      res.status(500).json({ error: 'Failed to delete act' });
    }
  });
  
  // API routes
  
  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get all performers
  app.get("/api/performers", async (req, res) => {
    try {
      const performers = await storage.getAllPerformers();
      res.json(performers);
    } catch (error) {
      console.error("Error fetching performers:", error);
      res.status(500).json({ message: "Failed to fetch performers" });
    }
  });

  // Get all gallery items
  app.get("/api/gallery", async (req, res) => {
    try {
      const galleryItems = await storage.getAllGalleryItems();
      res.json(galleryItems);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Get all achievements
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  // Create achievement
  app.post("/api/achievements", async (req, res) => {
    try {
      // Smart defaults für leere Felder - keine Validation, direkte Speicherung
      const achievementData = {
        year: req.body.year || new Date().getFullYear().toString(),
        title: req.body.title || "Neuer Erfolg",
        description: req.body.description || "Beschreibung wird noch hinzugefügt...",
        isActive: req.body.isActive !== undefined ? req.body.isActive : true
      } as any;
      
      const achievement = await storage.createAchievement(achievementData);
      res.status(201).json(achievement);
    } catch (error) {
      console.error("Error creating achievement:", error);
      res.status(500).json({ message: "Failed to create achievement" });
    }
  });

  // Update achievement
  app.put("/api/achievements/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertAchievementSchema.partial().parse(req.body);
      const achievement = await storage.updateAchievement(id, validatedData);
      res.json(achievement);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).toString() });
      } else {
        console.error("Error updating achievement:", error);
        res.status(500).json({ message: "Failed to update achievement" });
      }
    }
  });

  // Delete achievement
  app.delete("/api/achievements/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAchievement(id);
      if (success) {
        res.json({ message: "Achievement deleted successfully" });
      } else {
        res.status(404).json({ message: "Achievement not found" });
      }
    } catch (error) {
      console.error("Error deleting achievement:", error);
      res.status(500).json({ message: "Failed to delete achievement" });
    }
  });

  // Get all features
  app.get("/api/features", async (req, res) => {
    try {
      const features = await storage.getAllFeatures();
      res.json(features);
    } catch (error) {
      console.error("Error fetching features:", error);
      res.status(500).json({ message: "Failed to fetch features" });
    }
  });

  // Create feature
  app.post("/api/features", async (req, res) => {
    try {
      // Direkt an Storage weiterleiten - Smart Defaults werden dort angewendet
      const feature = await storage.createFeature(req.body);
      res.status(201).json(feature);
    } catch (error) {
      console.error("Error creating feature:", error);
      res.status(500).json({ message: "Failed to create feature" });
    }
  });

  // Update feature
  app.put("/api/features/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertFeatureSchema.partial().parse(req.body);
      const feature = await storage.updateFeature(id, validatedData);
      res.json(feature);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).toString() });
      } else {
        console.error("Error updating feature:", error);
        res.status(500).json({ message: "Failed to update feature" });
      }
    }
  });

  // Delete feature
  app.delete("/api/features/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteFeature(id);
      if (success) {
        res.json({ message: "Feature deleted successfully" });
      } else {
        res.status(404).json({ message: "Feature not found" });
      }
    } catch (error) {
      console.error("Error deleting feature:", error);
      res.status(500).json({ message: "Failed to delete feature" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const newSubmission = await storage.createContactSubmission(data);
      
      // Send email notification to both addresses
      console.log(`New contact form submission received from ${data.name} (${data.email})`);
      console.log(`Event Type: ${data.eventType}, Performance Type: ${data.performanceType}`);
      console.log(`Message: ${data.message}`);
      console.log(`Phone: ${data.phone || 'Not provided'}`);
      console.log(`Event Date: ${data.eventDate}`);
      console.log(`Notification should be sent to: info@juliuspreu.com and julius27jay@gmail.com`);
      
      res.status(201).json({ 
        message: "Contact form submitted successfully", 
        id: newSubmission.id 
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Update news posts management to use existing newsPosts array

  // Get all news posts (public)
  app.get("/api/news/posts", async (req, res) => {
    try {
      res.json(newsPosts.filter(post => post.active));
    } catch (error) {
      console.error('Get news posts error:', error);
      res.status(500).json({ error: 'Failed to get news posts' });
    }
  });

  // Get all news posts for management
  app.get("/api/news/manage", async (req, res) => {
    try {
      res.json(newsPosts);
    } catch (error) {
      console.error('Get news manage error:', error);
      res.status(500).json({ error: 'Failed to get news posts' });
    }
  });

  // Add new news post
  app.post("/api/news/posts", async (req, res) => {
    try {
      const { title, content, excerpt, imageUrl, publishedAt } = req.body;
      
      const newNewsPost: NewsPost = {
        id: `news_${Date.now()}`,
        title: title || "Neue Nachricht",
        content: content || "Inhalt wird noch hinzugefügt...",
        excerpt: excerpt || "Kurzbeschreibung folgt...",
        imageUrl: imageUrl || "/placeholder-news.jpg",
        publishedAt: publishedAt || new Date().toISOString().split('T')[0],
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      (newsPosts as any).unshift(newNewsPost);
      res.json(newNewsPost);
    } catch (error) {
      console.error('Add news post error:', error);
      res.status(500).json({ error: 'Failed to add news post' });
    }
  });

  // Update news post
  app.patch("/api/news/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const postIndex = newsPosts.findIndex(post => post.id === id);
      if (postIndex === -1) {
        return res.status(404).json({ error: 'News post not found' });
      }
      
      newsPosts[postIndex] = {
        ...newsPosts[postIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      res.json(newsPosts[postIndex]);
    } catch (error) {
      console.error('Update news post error:', error);
      res.status(500).json({ error: 'Failed to update news post' });
    }
  });

  // Toggle news post active status
  app.patch("/api/news/posts/:id/toggle", async (req, res) => {
    try {
      const { id } = req.params;
      const { active } = req.body;
      
      const postIndex = newsPosts.findIndex(post => post.id === id);
      if (postIndex === -1) {
        return res.status(404).json({ error: 'News post not found' });
      }
      
      const post = newsPosts[postIndex];
      post.active = active;
      
      res.json(newsPosts[postIndex]);
    } catch (error) {
      console.error('Toggle news post error:', error);
      res.status(500).json({ error: 'Failed to toggle news post' });
    }
  });

  // Delete news post
  app.delete("/api/news/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const postIndex = newsPosts.findIndex(post => post.id === id);
      if (postIndex === -1) {
        return res.status(404).json({ error: 'News post not found' });
      }
      
      newsPosts.splice(postIndex, 1);
      res.json({ message: 'News post deleted successfully' });
    } catch (error) {
      console.error('Delete news post error:', error);
      res.status(500).json({ error: 'Failed to delete news post' });
    }
  });

  // Workshop testimonials routes
  app.get("/api/workshop-testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllWorkshopTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      console.error("Error fetching workshop testimonials:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/workshop-testimonials", async (req, res) => {
    try {
      const testimonial = await storage.createWorkshopTestimonial(req.body);
      res.status(201).json(testimonial);
    } catch (error: any) {
      console.error("Error creating workshop testimonial:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/workshop-testimonials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const testimonial = await storage.updateWorkshopTestimonial(id, req.body);
      res.json(testimonial);
    } catch (error: any) {
      console.error("Error updating workshop testimonial:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/workshop-testimonials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteWorkshopTestimonial(id);
      if (success) {
        res.json({ message: "Workshop testimonial deleted successfully" });
      } else {
        res.status(404).json({ message: "Workshop testimonial not found" });
      }
    } catch (error: any) {
      console.error("Error deleting workshop testimonial:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Media gallery routes
  const galleryItems: any[] = [
    {
      id: "1",
      title: "Performance bei Gala-Event",
      description: "Spektakuläre LED-Jonglage Show",
      imageUrl: "/JPI_3297.jpg",
      category: "performance",
      active: true,
      eventType: "Gala",
      eventDate: "2024-06-15",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2", 
      title: "Workshop Teambuilding",
      description: "Kreatives Teambuilding mit Jonglage",
      imageUrl: "/JPI_2779.jpg",
      category: "workshop",
      active: true,
      eventType: "Workshop",
      eventDate: "2024-05-20",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Get all media items (public)
  app.get("/api/media", async (req, res) => {
    try {
      res.json(galleryItems.filter(item => item.active));
    } catch (error) {
      console.error('Get media error:', error);
      res.status(500).json({ error: 'Failed to get media items' });
    }
  });

  // Get all media items for management
  app.get("/api/media/manage", async (req, res) => {
    try {
      res.json(galleryItems);
    } catch (error) {
      console.error('Get media manage error:', error);
      res.status(500).json({ error: 'Failed to get media items' });
    }
  });

  // Add new media item
  app.post("/api/media", async (req, res) => {
    try {
      const { title, description, imageUrl, category, eventType, eventDate } = req.body;
      
      const newMediaItem = {
        id: Date.now().toString(),
        title: title || "Neues Medienelement",
        description: description || "Beschreibung wird noch hinzugefügt",
        imageUrl: imageUrl || "/placeholder-image.jpg",
        category: category || "allgemein",
        active: true,
        eventType: eventType || "",
        eventDate: eventDate || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      galleryItems.unshift(newMediaItem);
      res.json(newMediaItem);
    } catch (error) {
      console.error('Add media error:', error);
      res.status(500).json({ error: 'Failed to add media item' });
    }
  });

  // Update media item
  app.patch("/api/media/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const itemIndex = galleryItems.findIndex(item => item.id === id);
      if (itemIndex === -1) {
        return res.status(404).json({ error: 'Media item not found' });
      }
      
      galleryItems[itemIndex] = {
        ...galleryItems[itemIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      res.json(galleryItems[itemIndex]);
    } catch (error) {
      console.error('Update media error:', error);
      res.status(500).json({ error: 'Failed to update media item' });
    }
  });

  // Toggle media item active status
  app.patch("/api/media/:id/toggle", async (req, res) => {
    try {
      const { id } = req.params;
      const { active } = req.body;
      
      const itemIndex = galleryItems.findIndex(item => item.id === id);
      if (itemIndex === -1) {
        return res.status(404).json({ error: 'Media item not found' });
      }
      
      galleryItems[itemIndex].active = active;
      galleryItems[itemIndex].updatedAt = new Date().toISOString();
      
      res.json(galleryItems[itemIndex]);
    } catch (error) {
      console.error('Toggle media error:', error);
      res.status(500).json({ error: 'Failed to toggle media item' });
    }
  });

  // Delete media item
  app.delete("/api/media/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const itemIndex = galleryItems.findIndex(item => item.id === id);
      if (itemIndex === -1) {
        return res.status(404).json({ error: 'Media item not found' });
      }
      
      galleryItems.splice(itemIndex, 1);
      res.json({ message: 'Media item deleted successfully' });
    } catch (error) {
      console.error('Delete media error:', error);
      res.status(500).json({ error: 'Failed to delete media item' });
    }
  });

  // Reviews API
  app.get('/api/reviews', async (req, res) => {
    try {
      console.log('Getting all reviews...');
      const reviews = await storage.getAllReviews();
      console.log('Reviews fetched:', reviews.length);
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });

  app.post('/api/reviews', async (req, res) => {
    try {
      const review = await storage.createReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create review' });
    }
  });

  app.patch('/api/reviews/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const review = await storage.updateReview(id, req.body);
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update review' });
    }
  });

  app.delete('/api/reviews/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteReview(id);
      if (success) {
        res.json({ message: 'Review deleted successfully' });
      } else {
        res.status(404).json({ error: 'Review not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete review' });
    }
  });

  // File upload endpoint for all managers
  app.post("/api/upload", async (req, res) => {
    try {
      // For demo purposes, we'll simulate file upload by accepting base64 or URL
      const { fileData, fileName, fileType } = req.body;
      
      // In a real app, you'd save the file to disk/cloud storage
      // For now, we'll return a mock URL
      const uploadedUrl = `/uploads/${fileName || 'uploaded-image.jpg'}`;
      
      res.json({ 
        success: true, 
        url: uploadedUrl,
        message: 'File uploaded successfully' 
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
