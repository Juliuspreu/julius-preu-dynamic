import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Shows from "@/pages/Shows";
import Workshops from "@/pages/Workshops";
import About from "@/pages/About";
import Media from "@/pages/Media";
import Contact from "@/pages/Contact";
import Videokurs from "@/pages/Videokurs";
import NewsManager from "@/pages/NewsManager";
import ActsManager from "@/pages/ActsManager";
import MediaManager from "@/pages/MediaManager";
import ErfolgeManager from "@/pages/ErfolgeManager";
import FeaturesManager from "@/pages/FeaturesManager";
import RezensionenManager from "@/pages/RezensionenManager";


import JuliusCMS from "@/pages/JuliusCMS";
import Privacy from "@/pages/Privacy";
import Imprint from "@/pages/Imprint";
import Admin from "@/pages/Admin";
import CardDebug from "@/components/CardDebug";
import CookieBanner from "@/components/CookieBanner";

function Router() {
  const [location] = useLocation();

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/shows" component={Shows}/>
      <Route path="/workshops" component={Workshops}/>
      <Route path="/about" component={About}/>
      <Route path="/media" component={Media}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/videokurs" component={Videokurs}/>
      <Route path="/news-manager" component={NewsManager}/>
      <Route path="/acts-manager" component={ActsManager}/>
      <Route path="/media-manager" component={MediaManager}/>
      <Route path="/erfolge-manager" component={ErfolgeManager}/>
      <Route path="/features-manager" component={FeaturesManager}/>
      <Route path="/rezensionen-manager" component={RezensionenManager}/>

      <Route path="/julius-cms" component={JuliusCMS}/>

      <Route path="/privacy" component={Privacy}/>
      <Route path="/imprint" component={Imprint}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/debug" component={CardDebug}/>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <CookieBanner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
