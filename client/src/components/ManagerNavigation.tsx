import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Image, 
  Play, 
  Newspaper, 
  Trophy, 
  Star,
  Users,
  Download,
  ChevronLeft,
  Settings
} from "lucide-react";

interface ManagerNavigationProps {
  currentManager: string;
}

const managers = [
  { 
    id: "news-manager", 
    name: "News", 
    icon: Newspaper,
    path: "/news-manager"
  },
  { 
    id: "acts-manager", 
    name: "Shows", 
    icon: Play,
    path: "/acts-manager"
  },
  { 
    id: "media-manager", 
    name: "Media", 
    icon: Image,
    path: "/media-manager"
  },
  { 
    id: "erfolge-manager", 
    name: "Erfolge", 
    icon: Trophy,
    path: "/erfolge-manager"
  },
  { 
    id: "features-manager", 
    name: "Features", 
    icon: Star,
    path: "/features-manager"
  },
  { 
    id: "rezensionen-manager", 
    name: "Rezensionen", 
    icon: Users,
    path: "/rezensionen-manager"
  },
  { 
    id: "workshop-testimonials-manager", 
    name: "Testimonials", 
    icon: Users,
    path: "/workshop-testimonials-manager"
  },
  { 
    id: "export-manager", 
    name: "Export", 
    icon: Download,
    path: "/export-manager"
  }
];

export default function ManagerNavigation({ currentManager }: ManagerNavigationProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mb-6">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Back to Home Button */}
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Zurück zur Website
            </Button>
          </Link>

          {/* Manager Navigation */}
          <div className="flex items-center gap-2 flex-wrap">
            <Settings className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500 mr-2">CMS:</span>
            
            {managers.map((manager) => {
              const Icon = manager.icon;
              const isActive = currentManager === manager.id;
              
              return (
                <Link key={manager.id} href={manager.path}>
                  <Button 
                    variant={isActive ? "default" : "outline"} 
                    size="sm"
                    className={`flex items-center gap-1 ${
                      isActive 
                        ? "bg-red-600 hover:bg-red-700 text-white" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{manager.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Current Manager Indicator */}
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">
              {managers.find(m => m.id === currentManager)?.name || "Manager"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}