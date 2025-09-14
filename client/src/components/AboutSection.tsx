import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Achievement } from "@shared/schema";

// Use direct paths to SVG icons
const JahreErfahrungIcon = "/Jahre Erfahrung.svg";
const LaenderBereistIcon = "/laender bereist.svg";
const ShowsWorkshopsIcon = "/Shows u Workshops.svg";
const BiographieIcon = "/Biographie.svg";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<string>("bio");

  const { data: achievements = [], isLoading: achievementsLoading } = useQuery<
    Achievement[]
  >({
    queryKey: ["/api/achievements"],
  });

  const tabs = [
    { id: "bio", name: "Über Mich" },
    { id: "achievements", name: "Erfolge" },
    { id: "testimonials", name: "Referenzen" },
  ];

  const testimonials = [
    {
      quote:
        "Absolute Profis! Das Gravitos Duo hat so viel Spaß bei ihren Auftritten, dass die Freude fast ansteckend auf das Publikum wirkt. Im Rahmen des LIFE BALL 2019, durften wir Sie für einen Markenauftritt eines Kunden empfehlen und das Feedback war überwältigend. Bleibt so authentisch. Vielen Dank!",
      author: "Walter Heinreichsberger",
      position: "Geschäftsführer Eventmanagement Heinreichsberger",
    },
    {
      quote:
        "Daniel and Julius presented a strikingly innovative LED juggling act at the 2024 IJA Juggling Championships. They managed to create a symbiosis of their precise routine, technical prowess, and beautiful programming of the clubs. As the director of the IJA Juggling Championships, I have seen hundreds of world-class acts from the best jugglers in the world. Daniel and Julius's routine exceeded my expectations.",
      author: "Viveca Gardiner",
      position: "Direktorin der Jonglierweltmeisterschaften",
    },
    {
      quote:
        "Julius und Daniel von Gravitos haben sich ihren Weltrekord verdient. Ihre hervorragende Qualität und Professionalität machen die Zusammenarbeit immer äußerst angenehm und beeindrucken unsere Gäste nachhaltig. Es ist eine Freude, mit ihnen zusammenzuarbeiten, und ihre außergewöhnlichen Fähigkeiten hinterlassen stets einen bleibenden Eindruck.",
      author: "Felix Müller",
      position: "Event Manager von Jochen Schweizer Showacts",
    },
    {
      quote:
        "Ich wollte für meinen 30.Geburtstag für mich und meine Gäste etwas Besonderes haben und bin dabei auf Julius und Daniel gestoßen und ich muss sagen, meine Gäste und ich waren hellauf begeistert, die Show war einfach gut durchdacht und ich würde diese jederzeit wieder buchen.",
      author: "Private Kundin",
      position: "30. Geburtstag",
    },
  ];

  return (
    <section
      id="about"
      className="pt-24 pb-20"
      style={{ backgroundColor: "#f9fafb" }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title" style={{ color: "#1f2937" }}>
            Über <span className="text-primary">mich</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#374151" }}>
            Lernen Sie mich kennen - als Performer, Trainer und Weltmeister in
            der Jonglierkunst.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center mb-16">
          <div className="lg:w-2/5">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-primary/10 rounded-full"></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-secondary/10 rounded-full"></div>
              <img
                src="/attached_assets/IMG_1044_1749494025590.jpg"
                alt="Julius Preu - Jongleur"
                className="rounded-lg shadow-lg relative z-10 w-full h-auto"
              />
            </div>
          </div>

          <div className="lg:w-3/5">
            <div
              className="flex border-b mb-6"
              style={{ borderColor: "#e5e7eb" }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`py-3 px-4 font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent hover:text-gray-900"
                  }`}
                  style={{
                    color: activeTab === tab.id ? undefined : "#6b7280",
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === "bio" && (
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <img
                        src={BiographieIcon}
                        alt="Biographie"
                        className="w-6 h-6"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(19%) sepia(96%) saturate(7471%) hue-rotate(354deg) brightness(103%) contrast(98%)",
                        }}
                      />
                    </div>
                    <h3
                      className="font-montserrat font-bold text-2xl"
                      style={{ color: "#1f2937" }}
                    >
                      Julius Preu - Jongleur & Performer
                    </h3>
                  </div>
                  <p className="mb-4" style={{ color: "#374151" }}>
                    Als professioneller Jongleur und mehrfacher Weltmeister
                    bringe ich über 15 Jahre Erfahrung in der Welt der Jonglage
                    mit. Meine Leidenschaft für präzise Technik und innovative
                    Lichteffekte hat mich auf Bühnen in ganz Europa und darüber
                    hinaus geführt.
                  </p>
                  <p className="mb-4" style={{ color: "#374151" }}>
                    Ich bin Gründungsmitglied der Jongliergruppe Gravitos, und
                    trete regelmäßig bei internationalen Festivals, Galas und
                    Firmenevents auf. Meine Spezialität sind technisch
                    anspruchsvolle LED- Keulen-Choreographien, die mit modernen
                    LED-Elementen und perfekter Musiksynchronisation ein
                    unvergessliches visuelles Erlebnis schaffen.
                  </p>
                  <p className="mb-4" style={{ color: "#374151" }}>
                    Neben meiner Tätigkeit als Performer gebe ich mein Wissen in
                    Workshops weiter und habe bereits hunderte Menschen jeden
                    Alters für die Kunst des Jonglierens begeistert - von
                    Schulklassen über Firmenmitarbeiter bis hin zu angehenden
                    Profis.
                  </p>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <a
                      href="https://instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-700 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <i className="bx bxl-instagram text-xl"></i> @julius_preu
                    </a>
                    <a
                      href="https://youtube.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-700 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <i className="bx bxl-youtube text-xl"></i> Julius Preu
                    </a>
                    <a
                      href="https://facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-700 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <i className="bx bxl-facebook text-xl"></i> Julius Preu
                    </a>
                  </div>
                </div>
              )}

              {activeTab === "achievements" && (
                <div>
                  <h3
                    className="font-montserrat font-bold text-2xl mb-6"
                    style={{ color: "#1f2937" }}
                  >
                    Auszeichnungen & Erfolge
                  </h3>
                  {achievementsLoading ? (
                    <div
                      className="text-center py-8"
                      style={{ color: "#6b7280" }}
                    >
                      Lade Erfolge...
                    </div>
                  ) : (achievements as Achievement[]).length === 0 ? (
                    <div
                      className="text-center py-8"
                      style={{ color: "#6b7280" }}
                    >
                      Keine Erfolge verfügbar.
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {(achievements as Achievement[]).map(
                        (achievement, index) => (
                          <div key={achievement.id || index} className="flex">
                            <div className="mr-4 mt-1">
                              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="font-montserrat font-bold text-primary">
                                  {achievement.year}
                                </span>
                              </div>
                            </div>
                            <div>
                              <h4
                                className="font-montserrat font-semibold text-xl mb-2"
                                style={{ color: "#1f2937" }}
                              >
                                {achievement.title}
                              </h4>
                              <p style={{ color: "#374151" }}>
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "testimonials" && (
                <div>
                  <h3
                    className="font-montserrat font-bold text-2xl mb-6"
                    style={{ color: "#1f2937" }}
                  >
                    Das sagen Kunden über mich
                  </h3>
                  <div className="space-y-6">
                    {testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-lg"
                        style={{ backgroundColor: "#f9fafb" }}
                      >
                        <div className="flex text-yellow-400 mb-2 text-xl">
                          ★★★★★
                        </div>
                        <p className="italic mb-4" style={{ color: "#374151" }}>
                          "{testimonial.quote}"
                        </p>
                        <div>
                          <p
                            className="font-medium"
                            style={{ color: "#1f2937" }}
                          >
                            {testimonial.author}
                          </p>
                          <p className="text-sm" style={{ color: "#6b7280" }}>
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div
            className="p-6 rounded-lg shadow-sm text-center"
            style={{ backgroundColor: "white" }}
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <img
                src={JahreErfahrungIcon}
                alt="Jahre Erfahrung"
                className="w-8 h-8"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(19%) sepia(96%) saturate(7471%) hue-rotate(354deg) brightness(103%) contrast(98%)",
                }}
              />
            </div>
            <h3
              className="font-montserrat font-semibold text-xl mb-2"
              style={{ color: "#1f2937" }}
            >
              15+
            </h3>
            <p style={{ color: "#374151" }}>Jahre Erfahrung</p>
          </div>

          <div
            className="p-6 rounded-lg shadow-sm text-center"
            style={{ backgroundColor: "white" }}
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <img
                src={LaenderBereistIcon}
                alt="Länder bereist"
                className="w-8 h-8"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(19%) sepia(96%) saturate(7471%) hue-rotate(354deg) brightness(103%) contrast(98%)",
                }}
              />
            </div>
            <h3
              className="font-montserrat font-semibold text-xl mb-2"
              style={{ color: "#1f2937" }}
            >
              12
            </h3>
            <p style={{ color: "#374151" }}>Länder bereist</p>
          </div>

          <div
            className="p-6 rounded-lg shadow-sm text-center"
            style={{ backgroundColor: "white" }}
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <img
                src={ShowsWorkshopsIcon}
                alt="Shows & Workshops"
                className="w-8 h-8"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(19%) sepia(96%) saturate(7471%) hue-rotate(354deg) brightness(103%) contrast(98%)",
                }}
              />
            </div>
            <h3
              className="font-montserrat font-semibold text-xl mb-2"
              style={{ color: "#1f2937" }}
            >
              500+
            </h3>
            <p style={{ color: "#374151" }}>Shows & Workshops</p>
          </div>
        </div>
      </div>
    </section>
  );
}
