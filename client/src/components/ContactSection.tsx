import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name muss mindestens 2 Zeichen lang sein." }),
  email: z.string().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  eventType: z.string().min(1, { message: "Bitte wählen Sie einen Event-Typ." }),
  performanceType: z.string().min(1, { message: "Bitte wählen Sie eine Anfrageart." }),
  message: z.string().min(10, { message: "Nachricht muss mindestens 10 Zeichen lang sein." })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      eventType: "",
      performanceType: "",
      message: ""
    }
  });
  
  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Anfrage gesendet",
        description: "Vielen Dank für Ihre Nachricht! Ich werde mich so schnell wie möglich bei Ihnen melden.",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Fehler beim Senden",
        description: error.message || "Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.",
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await mutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-200 dark:bg-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-gray-800 dark:text-gray-800">
            Kontakt <span className="text-primary">aufnehmen</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-700 max-w-2xl mx-auto">
            Fragen Sie nach Verfügbarkeit, Preisen oder weiteren Informationen zu Shows und Workshops.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-montserrat font-bold text-2xl mb-6 text-gray-800 dark:text-gray-800">
                Lassen Sie uns <span className="text-primary">zusammenarbeiten</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-700 mb-8">
                Füllen Sie das Formular aus, um eine Anfrage für Shows, Workshops oder weitere Informationen zu senden. Ich freue mich darauf, von Ihnen zu hören und Ihre Veranstaltung zu etwas Besonderem zu machen.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center">
                    <img src="/Standort.svg" alt="Standort" className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(19%) sepia(96%) saturate(7471%) hue-rotate(354deg) brightness(103%) contrast(98%)' }} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1 text-gray-800 dark:text-gray-800">Standort</h4>
                    <p className="text-gray-700 dark:text-gray-700">Sierning, Oberösterreich<br/>Verfügbar für Aufträge weltweit</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center">
                    <img src="/E-Mail.svg" alt="E-Mail" className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(19%) sepia(96%) saturate(7471%) hue-rotate(354deg) brightness(103%) contrast(98%)' }} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1 text-gray-800 dark:text-gray-800">E-Mail</h4>
                    <p className="text-gray-700 dark:text-gray-700">
                      <a href="mailto:info@juliuspreu.com" className="hover:text-primary transition-colors">info@juliuspreu.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center">
                    <img src="/Telefon.svg" alt="Telefon" className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(19%) sepia(96%) saturate(7471%) hue-rotate(354deg) brightness(103%) contrast(98%)' }} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1 text-gray-800 dark:text-gray-800">Telefon</h4>
                    <p className="text-gray-700 dark:text-gray-700">
                      <a href="tel:+436606807965" className="hover:text-primary transition-colors">+43 660 680 79 65</a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="font-medium text-lg mb-4 text-gray-800 dark:text-gray-800">Folgen Sie mir</h4>
                <div className="flex space-x-4">
                  <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full transition-colors">
                    <i className="bx bxl-instagram text-xl"></i>
                  </a>
                  <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full transition-colors">
                    <i className="bx bxl-facebook text-xl"></i>
                  </a>
                  <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full transition-colors">
                    <i className="bx bxl-youtube text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-xl shadow-sm">
              <h3 className="font-montserrat font-semibold text-2xl mb-6 text-white">Anfrage senden</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">
                      Ihr Name *
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      className={`w-full p-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                      {...register("name")} 
                    />
                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
                      E-Mail Adresse *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className={`w-full p-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                      {...register("email")} 
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1 text-white">
                      Telefonnummer
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      {...register("phone")} 
                    />
                  </div>
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium mb-1 text-white">
                      Event-Datum (optional)
                    </label>
                    <input 
                      type="date" 
                      id="eventDate" 
                      className={`w-full p-3 rounded-lg border ${errors.eventDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                      {...register("eventDate")} 
                    />
                    {errors.eventDate && <span className="text-red-500 text-xs mt-1">{errors.eventDate.message}</span>}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="eventType" className="block text-sm font-medium mb-1 text-white">
                    Event-Typ *
                  </label>
                  <select 
                    id="eventType" 
                    className={`w-full p-3 rounded-lg border ${errors.eventType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                    {...register("eventType")}
                  >
                    <option value="" disabled>Event-Typ auswählen</option>
                    <option value="corporate">Firmenveranstaltung</option>
                    <option value="private">Privatveranstaltung</option>
                    <option value="festival">Festival</option>
                    <option value="theater">Theater/Varieté</option>
                    <option value="educational">Bildungseinrichtung</option>
                    <option value="other">Sonstiges</option>
                  </select>
                  {errors.eventType && <span className="text-red-500 text-xs mt-1">{errors.eventType.message}</span>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="performanceType" className="block text-sm font-medium mb-1 text-white">
                    Anfrageart *
                  </label>
                  <select 
                    id="performanceType" 
                    className={`w-full p-3 rounded-lg border ${errors.performanceType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                    {...register("performanceType")}
                  >
                    <option value="" disabled>Anfrageart auswählen</option>
                    <option value="solo">Solo-Show</option>
                    <option value="gravitos">Gravitos Act</option>
                    <option value="jonglissimo">Jonglissimo Act</option>
                    <option value="workshop">Workshop</option>
                    <option value="information">Informationen</option>
                    <option value="other">Sonstiges</option>
                  </select>
                  {errors.performanceType && <span className="text-red-500 text-xs mt-1">{errors.performanceType.message}</span>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-white">
                    Ihre Nachricht *
                  </label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className={`w-full p-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                    {...register("message")}
                  ></textarea>
                  {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? "Wird gesendet..." : "Anfrage senden"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}