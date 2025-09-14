import { 
  users, type User, type InsertUser,
  performers, type Performer, type InsertPerformer,
  services, type Service, type InsertService,
  contactSubmissions, type Contact, type InsertContact,
  galleryItems, type GalleryItem, type InsertGalleryItem,
  testimonials, type Testimonial, type InsertTestimonial,
  achievements, type Achievement, type InsertAchievement,
  features, type Feature, type InsertFeature,
  workshopTestimonials, type WorkshopTestimonial, type InsertWorkshopTestimonial,
  reviews, type Review, type InsertReview
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Performer operations
  getPerformer(id: number): Promise<Performer | undefined>;
  getAllPerformers(): Promise<Performer[]>;
  createPerformer(performer: InsertPerformer): Promise<Performer>;
  
  // Service operations
  getService(id: number): Promise<Service | undefined>;
  getAllServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  
  // Contact submission operations
  getContactSubmission(id: number): Promise<Contact | undefined>;
  getAllContactSubmissions(): Promise<Contact[]>;
  createContactSubmission(submission: InsertContact): Promise<Contact>;
  
  // Gallery item operations
  getGalleryItem(id: number): Promise<GalleryItem | undefined>;
  getAllGalleryItems(): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  
  // Testimonial operations
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Achievement operations
  getAchievement(id: number): Promise<Achievement | undefined>;
  getAllAchievements(): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  updateAchievement(id: number, achievement: Partial<InsertAchievement>): Promise<Achievement>;
  deleteAchievement(id: number): Promise<boolean>;
  
  // Feature operations
  getFeature(id: number): Promise<Feature | undefined>;
  getAllFeatures(): Promise<Feature[]>;
  createFeature(feature: InsertFeature): Promise<Feature>;
  updateFeature(id: number, feature: Partial<InsertFeature>): Promise<Feature>;
  deleteFeature(id: number): Promise<boolean>;
  
  // Workshop Testimonial operations
  getWorkshopTestimonial(id: number): Promise<WorkshopTestimonial | undefined>;
  getAllWorkshopTestimonials(): Promise<WorkshopTestimonial[]>;
  createWorkshopTestimonial(testimonial: InsertWorkshopTestimonial): Promise<WorkshopTestimonial>;
  updateWorkshopTestimonial(id: number, testimonial: Partial<InsertWorkshopTestimonial>): Promise<WorkshopTestimonial>;
  deleteWorkshopTestimonial(id: number): Promise<boolean>;
  
  // Review operations
  getReview(id: number): Promise<Review | undefined>;
  getAllReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, review: Partial<InsertReview>): Promise<Review>;
  deleteReview(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private performers: Map<number, Performer>;
  private services: Map<number, Service>;
  private contactSubmissions: Map<number, Contact>;
  private galleryItems: Map<number, GalleryItem>;
  private testimonials: Map<number, Testimonial>;
  private achievements: Map<number, Achievement>;
  private features: Map<number, Feature>;
  private workshopTestimonials: Map<number, WorkshopTestimonial>;
  private reviews: Map<number, Review>;
  
  private userIdCounter: number;
  private performerIdCounter: number;
  private serviceIdCounter: number;
  private contactIdCounter: number;
  private galleryIdCounter: number;
  private testimonialIdCounter: number;
  private achievementIdCounter: number;
  private featureIdCounter: number;
  private workshopTestimonialIdCounter: number;
  private reviewIdCounter: number;

  constructor() {
    this.users = new Map();
    this.performers = new Map();
    this.services = new Map();
    this.contactSubmissions = new Map();
    this.galleryItems = new Map();
    this.testimonials = new Map();
    this.achievements = new Map();
    this.features = new Map();
    this.workshopTestimonials = new Map();
    this.reviews = new Map();
    
    this.userIdCounter = 1;
    this.performerIdCounter = 1;
    this.serviceIdCounter = 1;
    this.contactIdCounter = 1;
    this.galleryIdCounter = 1;
    this.testimonialIdCounter = 1;
    this.achievementIdCounter = 1;
    this.featureIdCounter = 1;
    this.workshopTestimonialIdCounter = 1;
    this.reviewIdCounter = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Performer operations
  async getPerformer(id: number): Promise<Performer | undefined> {
    return this.performers.get(id);
  }
  
  async getAllPerformers(): Promise<Performer[]> {
    return Array.from(this.performers.values());
  }
  
  async createPerformer(insertPerformer: InsertPerformer): Promise<Performer> {
    const id = this.performerIdCounter++;
    const now = new Date();
    const performer: Performer = { 
      ...insertPerformer,
      description: insertPerformer.description ?? null,
      rating: insertPerformer.rating ?? null,
      reviews: insertPerformer.reviews ?? null,
      imageUrl: insertPerformer.imageUrl ?? null,
      socialLinks: insertPerformer.socialLinks ?? null,
      contactInfo: insertPerformer.contactInfo ?? null,
      isActive: insertPerformer.isActive ?? null,
      id, 
      createdAt: now
    };
    this.performers.set(id, performer);
    return performer;
  }
  
  // Service operations
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceIdCounter++;
    const now = new Date();
    const service: Service = { 
      ...insertService,
      imageUrl: insertService.imageUrl ?? null,
      isActive: insertService.isActive ?? null,
      id, 
      createdAt: now
    };
    this.services.set(id, service);
    return service;
  }
  
  // Contact submission operations
  async getContactSubmission(id: number): Promise<Contact | undefined> {
    return this.contactSubmissions.get(id);
  }
  
  async getAllContactSubmissions(): Promise<Contact[]> {
    return Array.from(this.contactSubmissions.values());
  }
  
  async createContactSubmission(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactIdCounter++;
    const now = new Date();
    const submission: Contact = { 
      ...insertContact,
      message: insertContact.message ?? null,
      phone: insertContact.phone ?? null,
      id, 
      status: "new", 
      createdAt: now
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  
  // Gallery item operations
  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }
  
  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }
  
  async createGalleryItem(insertGalleryItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = this.galleryIdCounter++;
    const now = new Date();
    const galleryItem: GalleryItem = { 
      ...insertGalleryItem, 
      id, 
      createdAt: now
    };
    this.galleryItems.set(id, galleryItem);
    return galleryItem;
  }
  
  // Testimonial operations
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(
      (testimonial) => testimonial.isApproved
    );
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const now = new Date();
    const testimonial: Testimonial = { 
      ...insertTestimonial,
      imageUrl: insertTestimonial.imageUrl ?? null,
      position: insertTestimonial.position ?? null,
      id, 
      isApproved: false, 
      createdAt: now
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Initialize sample data
  private initSampleData() {
    // Sample performers
    const performers: InsertPerformer[] = [
      {
        name: "Alex Rivera",
        profession: "Juggler & Comedian",
        description: "Award-winning juggler specializing in comedy and audience interaction. Perfect for family events and corporate gatherings.",
        rating: 45, // 4.5 stars
        reviews: 36,
        imageUrl: "https://pixabay.com/get/g0c80ba1c9d92baa60b5d5af564ed3fdc39249ad91ded8b24173cfa14cda6781f0e6cd32180460542c778a717bfea177fa3d8d192be757720f4e3c6550dbe0374_1280.jpg",
        socialLinks: JSON.stringify({
          instagram: "https://instagram.com/alexrivera",
          youtube: "https://youtube.com/alexrivera",
          website: "https://alexrivera.com"
        }),
        contactInfo: JSON.stringify({
          email: "alex@performancecompass.com",
          phone: "415-555-0101"
        }),
        isActive: true
      },
      {
        name: "Maya Chen",
        profession: "Magician & Illusionist",
        description: "Specializing in close-up magic and mind-reading illusions. Maya creates unforgettable magical moments for any event.",
        rating: 50, // 5.0 stars
        reviews: 42,
        imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
        socialLinks: JSON.stringify({
          instagram: "https://instagram.com/mayachen",
          tiktok: "https://tiktok.com/@mayachen",
          website: "https://mayachen.com"
        }),
        contactInfo: JSON.stringify({
          email: "maya@performancecompass.com",
          phone: "415-555-0102"
        }),
        isActive: true
      },
      {
        name: "Carlos Santiago",
        profession: "Fire Performer",
        description: "Carlos delivers spectacular fire performances combining danger, skill, and artistry. Perfect for outdoor events and special celebrations.",
        rating: 45, // 4.5 stars
        reviews: 28,
        imageUrl: "https://pixabay.com/get/gf923603df806bffed3d4c4ed2dd2e4e51c4a13ded102bf16a274e085057bf8f3b189f6237193adac8717c207b2dda90566dcb8b9a69432101d299da9340ea805_1280.jpg",
        socialLinks: JSON.stringify({
          instagram: "https://instagram.com/carlossantiago",
          facebook: "https://facebook.com/carlossantiago",
          website: "https://carlossantiago.com"
        }),
        contactInfo: JSON.stringify({
          email: "carlos@performancecompass.com",
          phone: "415-555-0103"
        }),
        isActive: true
      },
      {
        name: "Sophia Kim",
        profession: "Aerial Artist",
        description: "Sophia creates breathtaking aerial performances on silk, hoop, and trapeze. She brings elegance and wonder to upscale events.",
        rating: 50, // 5.0 stars
        reviews: 47,
        imageUrl: "https://pixabay.com/get/g9fe674b926221085c034d369d92c49bf641e95945b1191cb074144f40bb1e672a7b7bdfffee8402fbd383fa313ad1175b354d785ea99f47b73f7ff95e2cd4182_1280.jpg",
        socialLinks: JSON.stringify({
          instagram: "https://instagram.com/sophiakim",
          youtube: "https://youtube.com/sophiakim",
          website: "https://sophiakim.com"
        }),
        contactInfo: JSON.stringify({
          email: "sophia@performancecompass.com",
          phone: "415-555-0104"
        }),
        isActive: true
      }
    ];
    
    // Add performers to storage
    performers.forEach(performer => {
      this.createPerformer(performer);
    });
    
    // Sample services
    const services: InsertService[] = [
      {
        title: "Juggling Shows",
        description: "From balls and clubs to fire and knives, our jugglers will amaze your guests with skillful manipulation and comedy.",
        category: "juggling",
        basePrice: 35000, // $350.00
        imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        isActive: true
      },
      {
        title: "Magic & Illusion",
        description: "Close-up magic, stage illusions, and mind-reading performances that will leave your audience speechless.",
        category: "magic",
        basePrice: 40000, // $400.00
        imageUrl: "https://images.unsplash.com/photo-1615092296061-e2ccfeb2f3d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        isActive: true
      },
      {
        title: "Aerial Acts",
        description: "Breathtaking aerial silk, hoop, and trapeze performances that add elegance and drama to your event.",
        category: "aerial",
        basePrice: 65000, // $650.00
        imageUrl: "https://pixabay.com/get/gac0b9bd60f720565fef2f73e8659e218fb8984b45bbc618ed3626dfb98d47f93ad9d956caf72481057d02a5d23160d4180afff4c663d0410dc7c14d01fc82852_1280.jpg",
        isActive: true
      },
      {
        title: "Fire Performances",
        description: "Spectacular fire dancing, breathing, and manipulation that will create an unforgettable atmosphere at your event.",
        category: "fire",
        basePrice: 55000, // $550.00
        imageUrl: "https://pixabay.com/get/g7fd605d317e11b80534333d9cd37d972d48c845b9cf76ea87b7ede786d3b6267fcf316ab84dc1b5f9c7de86e6f1f37102bd5837a129db0919980a4e3f9c97d8a_1280.jpg",
        isActive: true
      }
    ];
    
    // Add services to storage
    services.forEach(service => {
      this.createService(service);
    });
    
    // Sample gallery items
    const galleryItems: InsertGalleryItem[] = [
      {
        title: "Light Juggling Show",
        description: "LED juggling performance at a corporate event",
        category: "juggling",
        imageUrl: "https://pixabay.com/get/g494ffa0549d39384804fe20f1764052d40a5b3ea2506540095f2a64e4cc4687547c48fcbfd201f04db4751f0fb69b4a6f8283db6f01c4a2bcc2e6f58642e0069_1280.jpg",
        eventType: "Private Event",
        eventDate: "March 2023"
      },
      {
        title: "Card Magic Performance",
        description: "Close-up card magic at a corporate function",
        category: "magic",
        imageUrl: "https://pixabay.com/get/g17de17037a2dfca70ebc403b848270f030bb6288a982e5a10a96c63814483c24116dcd94d42250c949d94d77428b6e855688e767f7f478fb78635acd1d59ba8f_1280.jpg",
        eventType: "Corporate Event",
        eventDate: "May 2023"
      },
      {
        title: "Fire Dance Show",
        description: "Fire performance at a summer festival",
        category: "fire",
        imageUrl: "https://pixabay.com/get/g7fd605d317e11b80534333d9cd37d972d48c845b9cf76ea87b7ede786d3b6267fcf316ab84dc1b5f9c7de86e6f1f37102bd5837a129db0919980a4e3f9c97d8a_1280.jpg",
        eventType: "Summer Festival",
        eventDate: "July 2023"
      },
      {
        title: "Aerial Silk Performance",
        description: "Aerial silk act at a charity gala",
        category: "aerial",
        imageUrl: "https://pixabay.com/get/g9836055bb8564a633312ff39b67a1401300570162b00e4b5442d9f6f633b172af23260972b77fb9b6817a575c5526c124a9f341764dc2acb68f283f8f55eddf8_1280.jpg",
        eventType: "Gala Event",
        eventDate: "February 2023"
      },
      {
        title: "Fire Juggling Act",
        description: "Combining juggling with fire performance",
        category: "fire",
        imageUrl: "https://pixabay.com/get/gf51f2e205435f08c3b3cd497e2c20657c2f18a05a68bc3345c014e5aa384160991754d29dc4d187b389d838e46485d804b257e03ef31eae1104b4ad7b4786509_1280.jpg",
        eventType: "Street Festival",
        eventDate: "June 2023"
      },
      {
        title: "Stage Illusion Show",
        description: "Large-scale illusion performed on stage",
        category: "magic",
        imageUrl: "https://pixabay.com/get/gd2f40f242d93c1b51c0c6a20615f4bd1cc13a566fa365b8e135e747831dba64100d2c3051fb90d683530fdb69761f8947f5759533c22cb2d828d810503edbb94_1280.jpg",
        eventType: "Theater Event",
        eventDate: "April 2023"
      },
      {
        title: "Club Juggling Show",
        description: "Technical club juggling performance",
        category: "juggling",
        imageUrl: "https://images.unsplash.com/photo-1581404917879-53e19259fdda?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        eventType: "Community Event",
        eventDate: "May 2023"
      },
      {
        title: "Aerial Hoop Performance",
        description: "Artistic aerial hoop routine",
        category: "aerial",
        imageUrl: "https://pixabay.com/get/g4990747cc3f78f3727f77e85b674559e7c482dbca69d706a0efc6efb05caf78a6359cea79188c2d05f1fd901448d8eb601a0af48bd622d57a7ddf464b8c45305_1280.jpg",
        eventType: "Charity Gala",
        eventDate: "March 2023"
      }
    ];
    
    // Add gallery items to storage
    galleryItems.forEach(item => {
      this.createGalleryItem(item);
    });
    
    // Sample testimonials
    const testimonials: InsertTestimonial[] = [
      {
        name: "Sarah Thompson",
        position: "Community Event Organizer",
        text: "The juggling performance was absolutely fantastic! Alex had everyone captivated from start to finish. His comedy and skill combined perfectly, and he was great with the kids at our community event.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isApproved: true
      },
      {
        name: "Michael Reynolds",
        position: "Corporate Event Manager",
        text: "We hired Maya for our corporate event, and her close-up magic left everyone speechless. She was professional, engaging, and created an atmosphere of wonder. Worth every penny!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isApproved: true
      },
      {
        name: "Jessica & David Chen",
        position: "Wedding Clients",
        text: "Sophia's aerial performance was the highlight of our wedding reception. Her grace and artistry created such a magical atmosphere. Our guests are still talking about it months later!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isApproved: true
      },
      {
        name: "Daniel Martinez",
        position: "Festival Director",
        text: "Carlos and his fire show created the perfect atmosphere for our festival. His performance was both thrilling and safe, and working with Performance Compass made booking incredibly easy.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isApproved: true
      }
    ];
    
    // Add testimonials to storage
    testimonials.forEach(testimonial => {
      const fullTestimonial = {
        ...testimonial,
        isApproved: true
      };
      this.createTestimonial(fullTestimonial);
    });

    // Sample achievements
    const achievements: InsertAchievement[] = [
      {
        year: "2024",
        title: "Jonglierweltmeister",
        description: "Gold in der Kategorie Teams beim IJA Championship mit dem Act \"Kings Gambit\"",
        isActive: true
      }
    ];
    
    // Add achievements to storage
    achievements.forEach(achievement => {
      this.createAchievement(achievement);
    });

    // Sample features
    const features: InsertFeature[] = [
      {
        title: "Weltmeister-Qualität",
        description: "Performances auf höchstem Niveau von einem mehrfachen Weltmeister im Jonglieren.",
        iconSvg: `<svg id="Layer_1" enable-background="new 0 0 68 68" height="512" viewBox="0 0 68 68" width="512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="_x32_11"><path d="m13.4 7.1c-1.4 1.7-2 4.2-1.7 6.7.9 5.5 5.8 10 9.9 12.8l.3.2c2.5 1.7 4.6 3.4 3.8 5.7-.3.8-1.1 1.4-1.8 1.3-.4 0-.7-.3-.9-.6-.1-.2-.2-.3-.2-.5.3-.1.5-.5.4-.8-.1-.4-.5-.7-.9-.6l-.4.1c-.3 0-.5.3-.6.5-.2.7-.1 1.5.4 2.1.5.7 1.2 1.2 2 1.3h.3c1.6 0 3.3-1.4 3.4-3.5 1.7 2.2 3.7 4 6.2 5.2.1 1.3.2 2.5.3 3.7 0 .1-1.1 1.1-1.3 1.3-1.2 1.9-.4 4.1 1.4 4.6.1 1.4 0 2.8-.3 4.1h-3.3c-.7 0-1.3.2-1.8.7l-3.9 3.3c-.2.1-.3.4-.3.6v7.7c0 .5.2.9.5 1.3.6 1.6 2.8 1.7 4.2 1.8 24.7.4 23.3.5 23.9.2.4-.2.6-.7.5-1.1-.3-.7-1.2-.6-2.9-.7.4-.4.7-.9.7-1.5v-7.6c0-.2-.1-.4-.3-.6l-4.4-3.5c-.5-.4-1.2-.6-1.8-.6h-4c-.2-1.4-.4-2.9-.5-4.4 2.4-1.3 2.3-3.9-.2-5.1 0-2.2.1-3.6 0-5.3 1.1-.7 2.2-1.5 3.1-2.4.1 2.2 1.7 3.5 3.6 3.5.7 0 1.4-.2 1.9-.6 2.8-1.9.9-6.5-.4-5.3-.3.3-.3.7-.1 1.1.7.8.5 2.4-.4 3-.4.3-1 .4-1.6.2-1.5-.4-1.8-1.8-1.4-3.1.2-.7.6-1.3 1.3-2.1 4.5-5.3 12.7-7.4 14.8-15.1.4-1.4.9-3.6.2-5.4-1.3-3.9-7.2-5.9-9.7-1.8-.2-.8-.5-.9-.6-.9-8.9-1.3-18.9-2.7-27.8-.1-.4.1-.5.2-.6.3-2.1-3.4-6.7-2.9-9-.1zm13.1 56.4c-.3 0-.5-.2-.5-.5v-6.3c8 .5 15.8.5 23.8 0v6.3c0 .3-.2.5-.5.5zm19.1-11.2 3.5 2.8c-7.9.5-15.5.5-22.7 0l3.2-2.7c.6-.5 1.2-.2 3.8-.3 0 .1-.1.4-.1.5-.6.2-.9.3-.9.6 0 .5 2.3 1 5 1 4.3 0 6.8-1 3.5-1.6 0-.1-.1-.4-.1-.5.1 0 4.1-.3 4.8.2zm-6.5-7.2c-.2.1-.4.3-.4.6-.1.5.7 6.3.7 6.8h-4.2c.5-2 1-6.3.8-6.9 0 0-.1-.2-.2-.2-.2-.2-1.7-.6-1.7-1.6s1.4-1.3 1.7-1.6.3-.5-.1-5.7c.9.1 1.9 0 2.8-.2v5.5c.1.3.3.4.4.5 1.8.6 2 2 .2 2.8zm14.3-31.5c-1.9-1.7-1.6-5.4.8-6.4 2-.9 4.8.8 5.5 2.8.5 1.5.1 3.3-.3 4.6-1.6 5.8-7 8-11.7 11.9 2.4-4.3 3.2-8 3.7-12.9.3.4.6.9 1 1.2.3.3.8.3 1.1 0 .2-.5.2-.9-.1-1.2zm-3.3-5.2c.1 1.3-.2 5.4-.3 6.4-.9 7.5-3.2 10.5-5.5 14.6-1.2 2.1-2.8 3.8-4.8 5-3.4 1.3-5.1.2-5.5.2-4.9-2.6-7.8-7.5-9.2-12.8-1.1-4.5-1.1-9.1-.9-13.5 8.4-2.4 17.8-1.1 26.2.1zm-28.4.9v2.1c-.2.6-.5 1.1-1 1.5-.7.6.2 1.8 1 1.1.2 4.4.9 8.7 2.6 12.8-2.1-1.6-10.1-6.3-11.2-13.3-.3-2.1.2-4.1 1.3-5.5 2.3-2.5 6.5-2.3 7.3 1.3z"/></g></svg>`,
        sortOrder: 1,
        isActive: true
      },
      {
        title: "Individuelle Anpassung",
        description: "Jede Show wird speziell auf Ihre Veranstaltung, Ihr Publikum und Ihre Wünsche zugeschnitten.",
        iconSvg: `<svg id="Layer_1" enable-background="new 0 0 73 73" height="512" viewBox="0 0 73 73" width="512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="_x31_25"><path d="m4.1126876 27.1566906c.0390625.2838135.2321167.5078125.4830322.6009521.203064.2840576.5422363.65979 1.241333 1.2160645.975647-.081543 2.2411494-.0877686 3.3057246-.0583496.3659945.8547592.696125 1.5151825 1.2015381 2.6046143-.56777.7410069-2.0964947 2.7191601-2.2576904 2.9472637-.2060037.3144264-.1717706.7518921.1372681 1.0054932 1.1517601 1.5428734 2.6669178 2.9822197 3.5306396 3.5692139.2627306.1506844.4889097.1930466.77948.0310059.3572998.1472168.727356.2735596 1.1417847.3483887 1.0831299-1.0075684 2.230957-1.9931641 3.158021-2.7875977.7407227.5166016 1.4451904.8830566 2.1272583 1.1243896.0525513 1.4786377.25177 2.9493408.6115723 4.3790283.1148911.4543419.6488094.7423477 1.1219482.4428711 1.7302856-.1601563 3.4636841-.4294434 5.1544189-.8061523.2871246-.0644455.5105438-.2730064.5917969-.6777344.2509155-1.2419434.3661499-2.5100098.3740845-3.7736816l.8561401-.315918c-.4749775 9.2574654-.4507675 18.9347267-.2459106 23.3353271.1585083 3.4021187.2110806 6.9700661 3.5805664 7.5907021.3110962.1066895.6390991.1772461.9859009.1772461h33.9980469c1.6884766 0 3.0625-1.3740234 3.0625-3.0625v-33.9980489c0-1.6884766-1.3740234-3.0625-3.0625-3.0625h-30.1940328c.1997681-.4692383.3660278-.9462891.5067749-1.4313965l3.861084-.4572754c.4282036-.0508556.7927971-.4800568.602356-.9980469-.4592247-4.6302681-.4355049-5.0800552-.5406494-5.1535645-.1266174-.2626152-.3706856-.4663067-.6779175-.4743652l-3.6959839-.0932617-2.1189575-3.2108154 3.2680664-3.3453379c.3681641-.3768396.2531853-1.0362263-.2861328-1.2268066-1.3439789-1.441473-2.920269-2.7011795-3.8740234-3.7810059-.3095131-.3511758-.8925934-.2858076-1.1523418-.0253906l-3.2420654 3.2241211c-.3153858-.0959702 1.1422482.3484745-3.0840454-.9399414-.4958496-1.2796631-.7846069-2.6590576-.8408813-4.0385742.2092533-.5066538-.1650162-1.0238471-.6748047-1.034668l-5.2353516-.109375c-.3140869-.0155029-.5842285.1755371-.7020874.447998-.2667255.3836832-.0942764.3147802-.3045654 4.4130859-1.129509.6637449-1.7912092 1.1165953-2.9400034 1.7963867l-3.3101198-2.5908202c-.4125319-.7565937-1.2564068-.1653318-1.156311-.1955566-1.177906 1.0686598-2.5370135 2.7601643-3.4853511 4.5654297-.1155396.2199707-.098938.4658203.0026855.6733398.0196533.1276855.0643921.2504883.1511841.3571777-.0146346.2381449-.112267 1.8187971-.1190796 1.9731455.6676521.5328255.8899617.6972408 2.7394404 2.3236084-.0298872.0603523-.6205101 1.2580109-.9142456 1.8560791l-3.9654536.6467285c-.6448631.1049061-.6505368.8693142-.6162112.7685547-.0395391 2.6300889-.1129262 3.512642.1220706 5.2304688z"/></g></svg>`,
        sortOrder: 2,
        isActive: true
      },
      {
        title: "Innovation & Technik",
        description: "Modernste LED-Technik und innovative Choreographien für unvergessliche Erlebnisse.",
        iconSvg: `<svg id="Layer_1" enable-background="new 0 0 72 72" height="512" viewBox="0 0 72 72" width="512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="Creative_Idea"><g><path d="m5.4293976 23.5998192c-.3086758.5104256-.0003271 1.2207851.4145508 1.4384766l6.9424438 3.6428223.0881348 5.4990234c-1.8559571 1.4279785-3.9977417 2.5600585-6.2613526 3.3046874-.7454472-.1264763-1.2758617.5697556-1.0778198 1.2194824.0384378.1266136 2.5214844 8.3057175 2.4897461 8.2011719.1134644.3745117.4368896.6174316.8009033.6643066.627574.2844925.5379705-.0399818 7.2501831-1.5803223 1.6426678 1.4728432 2.9481277 2.4913292 4.632019 3.9912109l-2.5119019 6.5058594c-.6410351.542057-.292181 1.4580879.3703003 1.7138672.1002235.0384941 8.8166447 4.1832008 10.4282227 3.416748.0075684.0114746.0127563.0249023.0205078.036377-.3372059 1.0836945.0143356 2.2603455.8012695 2.8730431 1.1038284 1.5405807 2.197979 2.9175873 2.8237305 3.5371094.8257675 1.1221695 4.9377098 1.0089645 5.2880859-.1367188 1.0054016-1.0188522 2.0030823-2.4592361 2.9609375-3.4423828.7322159-.3554382 1.3364639-1.7403526.8657227-3.0439415.0307617-.050293.0525513-.1064453.0802002-.1586914.2035904.1537781.4441071.2294273.6990967.1938477 2.7998047-.3632813 5.5341797-1.3125 7.9067383-2.7451172.2308884-.1398354 2.62146-3.3530388 2.8130493-3.6164551-.0986481-.7891846-1.0890961-5.2258873-1.2451172-6.0029297.0081139-.0067368 1.8936653-1.5747223 2.2581177-1.8803711 5.8716393 2.167141 6.1353149 2.3063965 6.3902588 2.3063965.3911133 0 .7587891-.2402344.9023438-.6279297.0009155-.0024414.0003052-.005127.0012207-.0075684 2.1975708-2.9347878 3.7097931-6.380825 3.8696289-7.0705566.0630493-.1960449.0531006-.394043-.0048218-.578125.0092773-1.208252.1361084-2.5405273.1200562-3.722168-1.8850098-1.0493164-4.170166-2.630127-6.2263794-3.5864258.2780762-1.0927734.4208374-2.109375.4188232-3.0551758 4.2128792-1.3140259 6.7263794-2.9403152 6.3756714-2.7241211.4882813-.2099609.7133789-.7763672.503418-1.2646484-4.5042496-10.4498577-3.6883507-7.9821548-5.8840332-10.8696289-2.2456055.6035156-4.8036499 1.0615234-7.1419678 1.473877l-1.3428345-1.6958008c1.0641174-2.4878464 1.6377182-5.2887821 1.6616211-6.8186035.3811455-.5137196.1690941-1.1597276-.3137817-1.4169927-2.7861328-1.4853514-5.7578125-2.6357421-8.831543-3.4199218-.4718246-.1227379-.9586449-.0557423-1.2480469.3330078-1.4264526 1.9150391-2.6306152 3.9826665-3.6080322 6.1437993-2.1964722-.6591797-4.5134277-.9899902-6.8012085-.9650879l-2.7675171-5.9570313c-.238308-.5139992-.9264488-.7776005-1.4754028-.322998-7.9704666 3.1824958-7.6430359 2.8864825-7.9633789 3.2529294-.2521973.2419434-.3718262.6062012-.2648315.963623l1.765564 5.9086919-4.2640381 5.0385742-7.2280884-3.6640625c-.6045513-.3113031-1.4036207.094924-1.3846436.8789063-1.5850387 2.7151526-2.626638 5.4107589-4.0958252 7.8359374z"/></g></g></svg>`,
        sortOrder: 3,
        isActive: true
      },
      {
        title: "Flexible Dauer",
        description: "Show-Längen von 8-20 Minuten, je nach Veranstaltungsformat und Ihren Anforderungen.",
        iconSvg: `<svg id="Layer_1" enable-background="new 0 0 68 68" height="512" viewBox="0 0 68 68" width="512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="_x34_9"><path d="m28.3 63.9c-2.5.3-4 .6-4 1 0 .8 7.4 1.5 16.4 1.5 9.1 0 16.4-.7 16.4-1.5 0-.7-4.7-1.2-11.3-1.4 7.1-3.2 13.1-9.1 16-16.4 3.4-8.4 2.8-18.3-1.8-26.1-3.4-5.8-9-10.3-15.5-12.5-3.5-1.5-7.4-2.4-11.5-2.4-16 0-29.1 13.1-29.1 29.1 0 14.5 10.6 26.5 24.4 28.7zm4.7-56.3c15.2 0 27.6 12.4 27.6 27.6s-12.4 27.6-27.6 27.6-27.6-12.4-27.6-27.6 12.4-27.6 27.6-27.6z"/><path d="m33 60.1c13.7 0 24.9-11.2 24.9-24.9s-11.2-24.9-24.9-24.9-24.9 11.2-24.9 24.9 11.2 24.9 24.9 24.9z"/><path d="m29.8 19.9 1.6-1.6.2 13.9c-1 .4-1.9 1.3-2.1 2.4-.3 1.5.6 3.1 2.1 3.7 1.7.7 3.9-.2 4.6-2.1l9.8-.4c-.4.5-.7 1-1.1 1.3-.3.3-.3.8 0 1.1s.8.3 1.1 0c.7-.8 1.7-2.2 2.4-2.9.3-.3.3-.8-.1-1.1-.9-.8-2-1.5-3.1-1.9-.4-.2-.8 0-1 .4s0 .8.4 1c.5.2.9.4 1.3.7l-9.7.4c-.3-1.4-1.4-2.1-2.8-2.2-.1-.2-.3-.3-.4-.4-.1-3.5-.2-10.5-.2-13.9.7.5 1.3 1 1.9 1.6.3.3.8.3 1.1 0s.3-.8 0-1.1c-1-1-2.2-1.9-3.4-2.7-.3-.2-.7-.2-1 .1l-2.8 2.8c-.3.3-.3.8 0 1.1.4.1.9.1 1.2-.2z"/></g></svg>`,
        sortOrder: 4,
        isActive: true
      },
      {
        title: "Alle Eventgrößen",
        description: "Von intimen Veranstaltungen mit 30 Gästen bis zu großen Events mit über 1000 Zuschauern.",
        iconSvg: `<svg id="Layer_1" enable-background="new 0 0 500 500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path clip-rule="evenodd" d="m67.645 238.59c3.944 3.437 7.146 8.802 8.574 13.814 1.152-5.246 5.095-10.336 9.233-13.642-4.165-2.908-7.247-6.782-9.623-11.24-2.001 4.279-4.633 7.927-8.184 11.068zm-6.938 12.04c-5.166-4.131-5.498-3.822-11.513-5.792-6.402-2.119-6.194-11.291.233-13.19 13.615-2.19 16.896-17.575 18.42-29.163.867-7.997 12.63-9.206 14.412 0 1.167 6.032 3.03 16.524 6.228 21.506 3.667 5.714 6.11 6.476 12.025 8.245 5.682 1.563 6.246 10.177-.101 12.121-21.397 3.534-17.493 29.936-25.358 31.352.463-.951 1.429-1.614 1.885-3.218-.748.954-.316.218-.74-.679-.36.061-.436.664-.679.725l-.223-1.779c-.872.993-.668 2.584-.243 3.659-1.428-1.173-1.295-.23-1.936-1.485-5.01-7.747-5.405-16.57-12.41-22.302z"/></svg>`,
        sortOrder: 5,
        isActive: true
      },
      {
        title: "Professionell & Zuverlässig",
        description: "Pünktlich, professionell und mit kompletter technischer Ausstattung für Ihre Veranstaltung.",
        iconSvg: `<svg id="Layer_1" enable-background="new 0 0 500 500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="m451.398 355.375-.253-.178-23.939-16.844c-2.15-1.52-4.308-3.045-6.454-4.563-5.952-4.119-11.907-8.229-17.899-12.192-5.635-3.732-11.286-7.475-16.915-11.203-4.617-3.009-9.214-6.004-13.82-9.005-2.217-1.444-4.434-2.889-6.642-4.327-.607-4.491-1.244-8.96-1.989-13.375-1.184-7.025-2.453-14.106-4.19-21.076-1.17-4.654-2.578-9.288-4.429-13.49l1.132-.738c.765-.482 1.453-1.06 2.14-1.645l.514-.44.381-.341.695-.632c.218-.198.399-.433.606-.643.813-.824 1.643-1.631 2.441-2.471.456-.479.851-1.016 1.292-1.509.443-.494.869-1.007 1.375-1.437.841-.714 1.347-1.755 2.301-2.363.563-.358.954-.913 1.424-1.378l.637-.629c.212-.21.402-.389.726-.744.567-.639 1.184-1.235 1.677-1.938.575-.775 1.154-1.548 1.617-2.397.24-.419.491-.832.706-1.262l.593-1.318c.268-.574.446-1.182.619-1.788.175-.606.357-1.206.481-1.82.558-2.073.757-4.214.77-6.345-.065-3.614-.944-7.218-2.592-10.458-.291-.614-.753-1.134-1.052-1.739-.289-.603-.669-1.149-1.049-1.697-.191-.272-.389-.541-.591-.806-.212-.256-.445-.494-.676-.733-.219-.229-.436-.456-.654-.683-.119-.139-.247-.274-.384-.402-1.484-1.391-3.035-2.81-4.957-3.589-.957-.454-1.957-.818-2.967-1.094-.244-.064-.474-.18-.717-.255-.559-.158-1.076-.466-1.671-.492-1.014.011-1.987.157-2.936-.084-.045-.014-.1-.007-.149.011-.478.183-.928.052-1.39.022-.418-.018-.829.014-1.229.218-.22.113-.468.124-.704.144-.285.038-.573.047-.86.074-.181.019-.359.045-.54.066.003-.032.008-.065.011-.097.018-.733.055-1.466.002-2.195-.071-.729-.106-1.458-.228-2.177-.096-.564-.156-1.136-.27-1.696-.291-1.028-.58-2.049-1-3.026-.384-1.071-.898-2.091-1.42-3.098-.489-.758-.901-1.57-1.503-2.242-.326-.381-.603-.798-.903-1.199-.315-.386-.675-.737-1.1-1.015-.106-.068-.204-.165-.253-.282-.199-.513-.654-.778-1.084-1.058-.259-.163-.487-.368-.721-.563-.703-.539-1.43-1.057-2.183-1.519-.786-.411-1.542-.876-2.372-1.183l-1.224-.494-1.258-.386c-.451-.139-.896-.306-1.366-.366-1.277-.228-2.575-.307-3.842-.153-.597.096-1.185.175-1.763.289-.036.009-.071.02-.107.029.114-.809.195-1.621.204-2.438.074-1.02-.038-2.04-.086-3.057-.061-.506-.138-1.011-.214-1.516-.068-.506-.162-1.007-.295-1.501-.189-.742-.44-1.463-.669-2.187-.381-1.448-.954-2.857-1.738-4.143-1.107-1.884-2.41-3.656-3.959-5.183l-.236-.235c-.242-.236-.515-.448-.818-.63l.088.072c-.226-.176-.453-.351-.686-.516-.485-.346-1.01-.644-1.512-.961-.254-.15-.51-.3-.767-.452-.269-.128-.541-.25-.816-.363-.265-.109-.494-.294-.75-.426-.573-.319-1.144-.663-1.794-.815-.274-.059-.55-.104-.824-.147-.283-.028-.565-.055-.833-.081-.551-.058-1.075-.183-1.592-.391-.05-.019-.112-.02-.168-.009-.555.112-1.051-.061-1.562-.173-.462-.099-.932-.093-1.401.057-.259.086-.539.069-.806.062-.333-.008-.648-.016-.974-.024-.5.005-.999 0-1.495.041-.496.049-.991.094-1.486.116-.568.008-1.118.167-1.659.304-.27.076-.537.155-.8.25-.065.027-.127.058-.191.086-.011-.397-.028-.792-.074-1.185-.17-1.99-.676-3.919-1.482-5.628-.715-1.57-1.64-3-2.65-4.281-.738-.901-1.56-1.735-2.575-2.243-.124-.057-.269-.166-.413.025-.02.336.367.528.195.902-.158.036-.311.07-.463.105-.083-.016-.177-.06-.256-.026-.175.076-.116.189-.091.302.012.047.005.101.008.157-.218-.198-.49-.341-.728-.504-.128-.082-.247-.178-.382-.251-.068-.036-.14-.067-.219-.087-.04-.01-.081-.017-.124-.021l-.067-.003h-.035l-.018.001h-.009-.005-.002-.001l-.289-.343.044.058.244.285v.001.002.003l-.001.007-.001.013-.003.026-.007.049c-.004.031-.009.059-.013.085-.008.052-.011.094-.004.131.086.428.18.834.248 1.232.06.496.154.942.389 1.322.285.617.569 1.201.969 1.754.072.09.107.206.145.314.155.41.2.86.316 1.276.054.176.063.362-.128.551-.24.234-.208.453-.127.663.125.276.176.569.27.857.087.29.179.583.199.885.034.256.07.519.104.776.007.26-.029.519-.107.764-.296.935-.538 1.842-.901 2.697-.438.825-.798 1.66-1.335 2.391-.205.287-.287.667-.583.884-.229.182-.405.397-.597.6l-.604.584c-.095.089-.18.134-.376.186-.751.153-1.242.628-1.681 1.191-.203.261-.431.505-.673.731-.355.331-.751.619-1.098.958l-3.905 3.849-4.235 4.027-2.241 2.152c-.618.586-1.275 1.132-1.867 1.745-.528.547-1.084 1.064-1.621 1.601-1.85 1.851-3.813 3.588-5.628 5.475-.253.263-.508.524-.774.773l-2.607 2.425c-.885.835-1.728 1.71-2.662 2.501-1.441 1.218-2.792 2.541-4.17 3.83l-1.678 1.588c-.373.265-.675.616-1.079.825-1.031.678-2.188 1.11-3.373 1.343-1.152.229-2.344.258-3.49.08-.266-.061-.541-.057-.813-.09-1.055-.204-2.046-.611-2.966-1.124-.131-.074-.272-.134-.407-.203-.126-.084-.255-.163-.387-.24l-.403-.226-.362-.29-.402-.307-.002-.001c-.297-.339-.681-.621-.883-1.033-.539-.846-1.375-1.608-1.455-2.708-.054-.623-.299-1.207-.372-1.835-.126-1.127-.047-2.277.206-3.373.287-1.237.815-2.393 1.529-3.427.213-.357.481-.676.737-1.013l.094-.128.047-.065.092-.101.372-.403.754-.794 5.282-5.317 8.943-9.019c.556-.562 1.046-1.195 1.633-1.722 1.155-1.039 2.283-2.101 3.339-3.242 2.026-2.19 4.3-4.138 6.192-6.461.787-.966 1.638-1.88 2.391-2.877.182-.24.431-.427.635-.651.467-.515 1.039-.93 1.426-1.522.307-.498.63-1.021.938-1.518.163-.249.335-.49.525-.716.095-.113.195-.223.301-.328l.163-.154c.051-.043.085-.061.13-.09.033-.02.055-.059.066-.101.115-.403.407-.676.722-.887.284-.198.499-.465.669-.822.096-.195.274-.323.437-.454.099-.08.204-.151.31-.222l.341-.168c.346-.179.675-.406 1.048-.539.362-.156.725-.326 1.119-.392.222-.05.438-.113.653-.189.221-.048.44-.104.659-.172.435-.161.883-.252 1.342-.396.326-.119.664-.134 1.004-.172.171-.012.342-.027.512-.02.168.02.335.048.5.085.693.126 1.384.217 2.063.4.183.062.412.038.627-.032.475-.171.925-.171 1.384-.132.468.022.89.191 1.31.383.337.139.663.263 1.063.161.378-.102.658 0 .93.182.131.086.249.211.382.163.489-.186.86.01 1.332.15-.178-.587-.162-.575-.085-1.448.006-.094.023-.197.002-.286-.123-.563-.348-1.063-.21-1.704.018-.086-.033-.197-.079-.283-.313-.635-.68-1.226-1.154-1.775-.345-.419-.756-.755-1.175-1.105-.418-.355-.856-.695-1.323-.986-.388-.253-.786-.517-1.2-.745-.418-.217-.836-.434-1.267-.658-.636-.357-1.327-.565-2.029-.807-.705-.218-1.438-.329-2.18-.463-.817-.083-1.65-.16-2.484-.202-.83-.003-1.682-.099-2.529-.108-.51-.021-1.044-.004-1.564.075-.943.165-1.883.407-2.808.715-.129-.364-.238-.747-.219-1.243.007-.191-.015-.361-.066-.501-.362-.986-.806-1.895-1.427-2.636-.055-.065-.101-.139-.151-.208-.401-.555-.777-1.135-1.211-1.657-.394-.473-.853-.883-1.283-1.321-.037-.038-.081-.07-.099-.125-.157-.452-.496-.729-.781-1.056-.236-.272-.5-.515-.733-.79-.145-.168-.237-.389-.383-.556-.485-.536-.967-1.068-1.45-1.602-.342-.376-.664-.772-1.032-1.121l-1.11-1.022-1.211-1.085c-.616-.524-1.19-1.098-1.848-1.568-.648-.438-1.295-.875-1.961-1.272-.688-.367-1.379-.722-2.07-1.065-.055-.02-.114-.04-.169-.061-.597-.216-1.197-.416-1.792-.613-.594-.199-1.212-.321-1.808-.495-.948-.295-1.924-.465-2.881-.709-.339-.081-.707.005-1.049-.036-.72-.069-1.432-.2-2.155-.198-.576-.011-1.155-.078-1.727.016-.488.097-.964.195-1.458.109-.157-.026-.313.025-.467.058-.516.117-1.015.331-1.523.44-.694.138-1.405.221-2.041.591-.1.058-.216.065-.325.094-.284.081-.574.137-.852.238-1.578.529-3.114 1.185-4.55 2.023l-1.286.77c-.423.265-.813.579-1.208.883-.305.247-.613.493-.892.769-.271.283-.543.568-.813.849-.213.22-.455.41-.661.636-.325.379-.533.717-.82 1.062-.296.362-.617.701-.923 1.053-.243.28-.501.546-.712.856-.235.347-.652.516-.755.992-.013.059-.049.104-.114.109-.278.021-.365.228-.452.44-.052.126-.142.216-.226.312-.243.28-.498.548-.735.834-.467.576-.936 1.156-1.404 1.734-.126.156-.28.285-.391.456-.307.469-.608.943-.806 1.515-.186.537-.393 1.057-.568 1.605-.143.447-.255.923-.375 1.391-.171.667-.377 1.305-.492 2.021-.006.038-.017.071-.023.108-1.098-.573-2.245-1.055-3.432-1.406-3.048-.948-6.396-1.206-9.661-.58-3.258.606-6.468 1.99-9.138 4.133-2.917 2.35-5.324 5.464-6.69 9.009-.746 1.75-1.155 3.61-1.453 5.473-.083.938-.222 1.879-.198 2.821v.078c-1.976-.187-3.982-.131-5.955.173-3.687.577-7.249 2.131-10.267 4.408-3.027 2.259-5.437 5.341-7.022 8.803-.348.697-.606 1.428-.864 2.16-.281.725-.461 1.476-.649 2.228-.44 1.773-.64 3.593-.638 5.416-4.101-.079-8.227.891-11.866 2.872-5.057 2.714-8.972 7.347-10.943 12.713-.159.464-.32.933-.48 1.4-.126.476-.251.95-.375 1.417-.464 1.726-.689 3.508-.717 5.299-.413-.002-.827.007-1.24.026-4.141.154-8.258 1.406-11.821 3.63-2.884 1.822-5.351 4.238-7.238 7.086-1.88 2.85-3.132 6.101-3.673 9.448-.545 3.348-.39 6.801.462 10.095.847 3.293 2.407 6.428 4.548 9.095l8.127 9.126c-.29.088-.579.175-.866.272-3.283 1.097-6.351 2.841-9.042 5.013-2.692 2.17-4.959 4.841-6.748 7.804-5.271 8.607-5.576 19.78-.997 28.71.248.55.589 1.052.886 1.577.317.514.602 1.048.954 1.537l1.072 1.457.546.721.602.672 1.218 1.331c.224.247.357.364.527.535l.489.481 1.954 1.921c1.585 1.566 3.187 3.121 4.792 4.673-.606.579-1.193 1.178-1.73 1.829-.172.209-.387.397-.591.582l-2.344 2.109c-.332.301-.654.591-1.051.657-.49.081-.909.466-1.289.879-1.015 1.1-1.997 2.225-3.028 3.31-.875.921-1.744 1.909-2.718 2.674-1.867 1.467-3.586 3.12-5.376 4.682-1.79 1.564-3.526 3.207-5.273 4.831-.687.639-1.3 1.383-2.012 1.966-1.16.95-2.219 2.006-3.314 3.025-.235.218-.519.436-.78.557-1.126.518-2.021 1.386-2.877 2.356-.397.449-.822.886-1.26 1.302-.642.61-1.323 1.175-1.956 1.793l-7.142 7-7.682 7.383-4.074 3.936c-1.121 1.075-2.279 2.11-3.373 3.211-.99.972-1.978 1.941-2.965 2.91-3.288 3.249-6.68 6.389-9.942 9.664l-.089.089c-.118.119-.232.244-.342.375-2.259 2.675-1.921 6.674.754 8.933l.346.292c.508.429 1.016.86 1.511 1.302l4.835 4.33c1.659 1.474 3.352 2.901 4.971 4.429 2.497 2.356 5.097 4.62 7.662 6.911l6.35 5.63 8.642 7.799 8.449 7.536c.664.589 1.361 1.14 2.037 1.719l7.954 6.818c1.521 1.288 3.095 2.509 4.629 3.782 1.538 1.276 3.097 2.537 4.574 3.879 2.456 2.232 5.202 4.096 7.568 6.456 1.395 1.391 2.999 2.619 4.507 3.922l8.18 7.063 4.963 4.26.066.058c.256.217.53.418.823.602 3.362 2.116 7.803 1.106 9.919-2.256l2.995-4.758c1.387-2.273 2.775-4.549 4.161-6.82l7.319-11.542 12.395-19.567c.771-1.219 1.462-2.493 2.27-3.683 1.588-2.342 3.145-4.7 4.616-7.121 1.853-3.052 3.833-6.028 5.729-9.056 1.47.059 2.938.096 4.398.076.575-.024 1.163.038 1.744.041 1.333.009 2.67.166 3.993.001 1.109-.13 2.207-.283 3.309-.434 1.101-.158 2.211-.27 3.361-.243.11.003.234-.016.339-.044 1.034-.291 2.131-.322 3.214-.394.984-.064 1.932-.183 2.841-.499.502-.169 1.092-.245 1.65-.325.677-.104 1.368-.14 2.047-.246 2.09-.317 4.183-.635 6.27-.952 2.394-.318 4.691-.921 6.979-1.564 1.615-.501 3.292-.911 4.946-1.252 1.743-.337 3.43-.811 5.131-1.272.471-.123.958-.348 1.348-.586 1.688-1.052 3.565-1.853 5.548-2.544.061-.022.119-.046.18-.068l1.63.358c2.407.497 4.83.919 7.247 1.44 1.544.272 3.146.453 4.717.659 2.628.392 5.283.521 7.921.771 2.642.219 5.293.266 7.939.427 7.224.196 14.474.152 21.621-.606 1.134-.093 2.289-.231 3.435-.339l1.393-.146.364.51 28.729 40.252 17.261 24.209 2.646 3.682.059.083c.138.19.29.373.456.549 2.14 2.274 5.719 2.383 7.993.243l13.767-12.957c2.246-2.093 4.498-4.19 6.742-6.281l12.447-11.78c4.483-4.198 8.968-8.397 13.454-12.598 3.559-3.335 7.139-6.661 10.659-10.021 3.928-3.75 8.058-7.339 11.838-11.203.467-.478 1.021-1 1.525-1.41 2.163-1.757 4.124-3.691 6.106-5.648 1.178-1.163 2.416-2.311 3.639-3.457l10.461-9.789.061-.056c.229-.217.44-.46.629-.728 1.538-2.186 1.015-5.207-1.17-6.747z"/></svg>`,
        sortOrder: 6,
        isActive: true
      }
    ];

    // Add features to storage
    features.forEach(feature => {
      this.createFeature(feature);
    });

    // Workshop testimonials - Referenzen von Schulen & Bildungseinrichtungen
    const workshopTestimonials: InsertWorkshopTestimonial[] = [
      {
        name: "Frau Schmidt",
        position: "Schulleiterin",
        company: "Grundschule Am Markt",
        text: "Herr Preu hat unseren Projekttag zu einem unvergesslichen Erlebnis gemacht. Die Kinder waren vom ersten Moment an begeistert und haben mit Freude gelernt.",
        rating: 5,
        sortOrder: 1,
        isActive: true
      },
      {
        name: "Herr Weber",
        position: "Sportlehrer",
        company: "Realschule Mitte",
        text: "Ein professionell durchgeführter Workshop! Julius vermittelt die Grundlagen des Jonglierens so verständlich, dass selbst ungeschickte Schüler schnell Erfolge erzielen.",
        rating: 5,
        sortOrder: 2,
        isActive: true
      },
      {
        name: "Frau Müller",
        position: "Pädagogische Leitung",
        company: "Gymnasium Nord",
        text: "Besonders beeindruckend war, wie Julius auf jedes Kind eingegangen ist. Der Workshop hat nicht nur Spaß gemacht, sondern auch das Selbstvertrauen der Schüler gestärkt.",
        rating: 5,
        sortOrder: 3,
        isActive: true
      }
    ];

    // Add workshop testimonials to storage
    workshopTestimonials.forEach(testimonial => {
      this.createWorkshopTestimonial(testimonial);
    });
  }

  // Achievement operations
  async getAchievement(id: number): Promise<Achievement | undefined> {
    return this.achievements.get(id);
  }

  async getAllAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(a => a.isActive);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.achievementIdCounter++;
    const now = new Date();
    const achievement: Achievement = { 
      ...insertAchievement, 
      id, 
      createdAt: now 
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  async updateAchievement(id: number, updates: Partial<InsertAchievement>): Promise<Achievement> {
    const existing = this.achievements.get(id);
    if (!existing) {
      throw new Error(`Achievement with id ${id} not found`);
    }
    const updated: Achievement = { ...existing, ...updates };
    this.achievements.set(id, updated);
    return updated;
  }

  async deleteAchievement(id: number): Promise<boolean> {
    return this.achievements.delete(id);
  }

  // Feature operations
  async getFeature(id: number): Promise<Feature | undefined> {
    return this.features.get(id);
  }

  async getAllFeatures(): Promise<Feature[]> {
    return Array.from(this.features.values())
      .filter(f => f.isActive)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async createFeature(insertFeature: InsertFeature): Promise<Feature> {
    const id = this.featureIdCounter++;
    const now = new Date();
    const feature: Feature = { 
      ...insertFeature, 
      id, 
      createdAt: now 
    };
    this.features.set(id, feature);
    return feature;
  }

  async updateFeature(id: number, updates: Partial<InsertFeature>): Promise<Feature> {
    const existing = this.features.get(id);
    if (!existing) {
      throw new Error(`Feature with id ${id} not found`);
    }
    const updated: Feature = { ...existing, ...updates };
    this.features.set(id, updated);
    return updated;
  }

  async deleteFeature(id: number): Promise<boolean> {
    return this.features.delete(id);
  }

  // Workshop Testimonial operations
  async getWorkshopTestimonial(id: number): Promise<WorkshopTestimonial | undefined> {
    return this.workshopTestimonials.get(id);
  }

  async getAllWorkshopTestimonials(): Promise<WorkshopTestimonial[]> {
    return Array.from(this.workshopTestimonials.values())
      .filter(t => t.isActive)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async createWorkshopTestimonial(insertTestimonial: InsertWorkshopTestimonial): Promise<WorkshopTestimonial> {
    const id = this.workshopTestimonialIdCounter++;
    const now = new Date();
    const testimonial: WorkshopTestimonial = { 
      ...insertTestimonial, 
      id, 
      createdAt: now 
    };
    this.workshopTestimonials.set(id, testimonial);
    return testimonial;
  }

  async updateWorkshopTestimonial(id: number, updates: Partial<InsertWorkshopTestimonial>): Promise<WorkshopTestimonial> {
    const existing = this.workshopTestimonials.get(id);
    if (!existing) {
      throw new Error(`Workshop testimonial with id ${id} not found`);
    }
    const updated: WorkshopTestimonial = { ...existing, ...updates };
    this.workshopTestimonials.set(id, updated);
    return updated;
  }

  async deleteWorkshopTestimonial(id: number): Promise<boolean> {
    return this.workshopTestimonials.delete(id);
  }

  // Review operations
  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async getAllReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    const review: Review = {
      ...insertReview,
      id,
      name: insertReview.name || "Anonymer Kunde",
      title: insertReview.title || "Zufriedener Kunde",
      content: insertReview.content || "Positive Erfahrung",
      rating: insertReview.rating || 5,
      isApproved: insertReview.isApproved ?? true,
      isActive: insertReview.isActive ?? true,
      isPublic: insertReview.isPublic ?? true,
      sortOrder: insertReview.sortOrder ?? 0,
      createdAt: new Date().toISOString()
    };
    this.reviews.set(id, review);
    return review;
  }

  async updateReview(id: number, updates: Partial<InsertReview>): Promise<Review> {
    const existing = this.reviews.get(id);
    if (!existing) {
      throw new Error(`Review with id ${id} not found`);
    }
    const updated: Review = { ...existing, ...updates };
    this.reviews.set(id, updated);
    return updated;
  }

  async deleteReview(id: number): Promise<boolean> {
    return this.reviews.delete(id);
  }
}

// Database Storage Implementation  
export class DatabaseStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return undefined; // Placeholder - database integration will be completed
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined; // Placeholder - database integration will be completed
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    throw new Error("Not implemented"); // Placeholder - database integration will be completed
  }

  // Performer operations
  async getPerformer(id: number): Promise<Performer | undefined> {
    const [performer] = await db.select().from(performers).where(eq(performers.id, id));
    return performer || undefined;
  }

  async getAllPerformers(): Promise<Performer[]> {
    return await db.select().from(performers);
  }

  async createPerformer(insertPerformer: InsertPerformer): Promise<Performer> {
    const [performer] = await db
      .insert(performers)
      .values({
        ...insertPerformer,
        createdAt: new Date()
      })
      .returning();
    return performer;
  }

  // Service operations
  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db
      .insert(services)
      .values({
        ...insertService,
        createdAt: new Date()
      })
      .returning();
    return service;
  }

  // Contact operations
  async getContactSubmission(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return contact || undefined;
  }

  async getAllContactSubmissions(): Promise<Contact[]> {
    return await db.select().from(contactSubmissions);
  }

  async createContactSubmission(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contactSubmissions)
      .values({
        ...insertContact,
        status: "new",
        createdAt: new Date()
      })
      .returning();
    return contact;
  }

  // Gallery operations
  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    const [item] = await db.select().from(galleryItems).where(eq(galleryItems.id, id));
    return item || undefined;
  }

  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems);
  }

  async createGalleryItem(insertGalleryItem: InsertGalleryItem): Promise<GalleryItem> {
    const [item] = await db
      .insert(gallery)
      .values({
        ...insertGalleryItem,
        createdAt: new Date()
      })
      .returning();
    return item;
  }

  // Testimonial operations
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || undefined;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).where(eq(testimonials.isApproved, true));
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values({
        ...insertTestimonial,
        isApproved: false,
        createdAt: new Date()
      })
      .returning();
    return testimonial;
  }

  // News operations
  async getNewsPost(id: string): Promise<NewsPost | undefined> {
    const [post] = await db.select().from(newsPosts).where(eq(newsPosts.id, id));
    return post || undefined;
  }

  async getAllNewsPosts(): Promise<NewsPost[]> {
    return await db.select().from(newsPosts);
  }

  async createNewsPost(insertNewsPost: InsertNewsPost): Promise<NewsPost> {
    const [post] = await db
      .insert(newsPosts)
      .values({
        ...insertNewsPost,
        createdAt: new Date()
      })
      .returning();
    return post;
  }

  // Achievement operations
  async getAchievement(id: number): Promise<Achievement | undefined> {
    const [achievement] = await db.select().from(achievements).where(eq(achievements.id, id));
    return achievement || undefined;
  }

  async getAllAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async createAchievement(insertAchievement: any): Promise<Achievement> {
    // Smart defaults für alle fehlenden Felder
    const achievementData = {
      year: insertAchievement.year || new Date().getFullYear().toString(),
      title: insertAchievement.title || "Neuer Erfolg",
      description: insertAchievement.description || "Beschreibung wird noch hinzugefügt...",
      isActive: insertAchievement.isActive !== undefined ? insertAchievement.isActive : true,
      createdAt: new Date()
    };
    
    const [achievement] = await db
      .insert(achievements)
      .values(achievementData)
      .returning();
    return achievement;
  }

  async updateAchievement(id: number, updates: Partial<InsertAchievement>): Promise<Achievement> {
    const [achievement] = await db
      .update(achievements)
      .set(updates)
      .where(eq(achievements.id, id))
      .returning();
    if (!achievement) {
      throw new Error(`Achievement with id ${id} not found`);
    }
    return achievement;
  }

  async deleteAchievement(id: number): Promise<boolean> {
    const result = await db
      .delete(achievements)
      .where(eq(achievements.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Feature operations
  async getFeature(id: number): Promise<Feature | undefined> {
    const [feature] = await db.select().from(features).where(eq(features.id, id));
    return feature || undefined;
  }

  async getAllFeatures(): Promise<Feature[]> {
    return await db.select().from(features);
  }

  async createFeature(insertFeature: any): Promise<Feature> {
    // Smart defaults für alle fehlenden Felder
    const featureData = {
      title: insertFeature.title || "Neues Feature",
      description: insertFeature.description || "Beschreibung wird noch hinzugefügt...",
      iconSvg: insertFeature.iconSvg || `<svg fill="currentColor" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>`,
      isActive: insertFeature.isActive !== undefined ? insertFeature.isActive : true,
      sortOrder: insertFeature.sortOrder || 1,
      createdAt: new Date()
    };
    
    const [feature] = await db
      .insert(features)
      .values(featureData)
      .returning();
    return feature;
  }

  async updateFeature(id: number, updates: Partial<InsertFeature>): Promise<Feature> {
    const [feature] = await db
      .update(features)
      .set(updates)
      .where(eq(features.id, id))
      .returning();
    if (!feature) {
      throw new Error(`Feature with id ${id} not found`);
    }
    return feature;
  }

  async deleteFeature(id: number): Promise<boolean> {
    const result = await db
      .delete(features)
      .where(eq(features.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Workshop Testimonial operations
  async getWorkshopTestimonial(id: number): Promise<WorkshopTestimonial | undefined> {
    const [testimonial] = await db.select().from(workshopTestimonials).where(eq(workshopTestimonials.id, id));
    return testimonial || undefined;
  }

  async getAllWorkshopTestimonials(): Promise<WorkshopTestimonial[]> {
    return await db.select().from(workshopTestimonials);
  }

  async createWorkshopTestimonial(insertTestimonial: InsertWorkshopTestimonial): Promise<WorkshopTestimonial> {
    const [testimonial] = await db
      .insert(workshopTestimonials)
      .values({
        ...insertTestimonial,
        createdAt: new Date()
      })
      .returning();
    return testimonial;
  }

  async updateWorkshopTestimonial(id: number, updates: Partial<InsertWorkshopTestimonial>): Promise<WorkshopTestimonial> {
    const [testimonial] = await db
      .update(workshopTestimonials)
      .set(updates)
      .where(eq(workshopTestimonials.id, id))
      .returning();
    if (!testimonial) {
      throw new Error(`Workshop testimonial with id ${id} not found`);
    }
    return testimonial;
  }

  async deleteWorkshopTestimonial(id: number): Promise<boolean> {
    const result = await db
      .delete(workshopTestimonials)
      .where(eq(workshopTestimonials.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Review operations
  async getReview(id: number): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
    return review || undefined;
  }

  async getAllReviews(): Promise<Review[]> {
    return await db.select().from(reviews);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const reviewData = {
      name: insertReview.name || "Anonymer Kunde",
      email: insertReview.email,
      rating: insertReview.rating || 5,
      title: insertReview.title || "Zufriedener Kunde",
      content: insertReview.content || "Positive Erfahrung",
      serviceType: insertReview.serviceType,
      eventDate: insertReview.eventDate,
      location: insertReview.location,
      category: (insertReview as any).category || "general",
      imageUrl: (insertReview as any).imageUrl,
      isApproved: insertReview.isApproved ?? true,
      isActive: insertReview.isActive ?? true,
      isPublic: insertReview.isPublic ?? true,
      sortOrder: insertReview.sortOrder ?? 0,
      createdAt: new Date()
    };
    
    const [review] = await db
      .insert(reviews)
      .values(reviewData)
      .returning();
    return review;
  }

  async updateReview(id: number, updates: Partial<InsertReview>): Promise<Review> {
    const [review] = await db
      .update(reviews)
      .set(updates)
      .where(eq(reviews.id, id))
      .returning();
    if (!review) {
      throw new Error(`Review with id ${id} not found`);
    }
    return review;
  }

  async deleteReview(id: number): Promise<boolean> {
    const result = await db
      .delete(reviews)
      .where(eq(reviews.id, id));
    return (result.rowCount || 0) > 0;
  }
}

export const storage = new MemStorage();
