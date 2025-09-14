import { useState } from "react";

export default function PricingSection() {
  const [activeService, setActiveService] = useState("juggling");
  
  const serviceTypes = [
    { id: "juggling", name: "Juggling Shows" },
    { id: "magic", name: "Magic Acts" },
    { id: "fire", name: "Fire Shows" },
    { id: "aerial", name: "Aerial Acts" }
  ];

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 dark:text-white">
            Compare <span className="text-primary">Packages & Pricing</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find the perfect entertainment package for your budget and event requirements.
          </p>
        </div>
        
        {/* Service Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {serviceTypes.map(service => (
            <button
              key={service.id}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeService === service.id 
                  ? "bg-primary text-white" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveService(service.id)}
            >
              {service.name}
            </button>
          ))}
        </div>
        
        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 bg-neutral dark:bg-gray-800 text-left"></th>
                <th className="p-4 bg-neutral dark:bg-gray-800 text-center">
                  <div className="font-montserrat font-semibold text-lg">Basic</div>
                  <div className="text-primary font-bold text-2xl mt-2">$350</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Per performance</div>
                </th>
                <th className="p-4 bg-neutral dark:bg-gray-800 text-center relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-white text-xs px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                  <div className="font-montserrat font-semibold text-lg">Standard</div>
                  <div className="text-primary font-bold text-2xl mt-2">$550</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Per performance</div>
                </th>
                <th className="p-4 bg-neutral dark:bg-gray-800 text-center">
                  <div className="font-montserrat font-semibold text-lg">Premium</div>
                  <div className="text-primary font-bold text-2xl mt-2">$850</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Per performance</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 font-medium">Performance Duration</td>
                <td className="p-4 text-center">30 minutes</td>
                <td className="p-4 text-center bg-neutral/50 dark:bg-gray-800/50">45 minutes</td>
                <td className="p-4 text-center">60 minutes</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 font-medium">Number of Performers</td>
                <td className="p-4 text-center">1</td>
                <td className="p-4 text-center bg-neutral/50 dark:bg-gray-800/50">1-2</td>
                <td className="p-4 text-center">2-3</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 font-medium">Customization</td>
                <td className="p-4 text-center"><i className="bx bx-x text-red-500 text-xl"></i></td>
                <td className="p-4 text-center bg-neutral/50 dark:bg-gray-800/50"><i className="bx bx-check text-green-500 text-xl"></i></td>
                <td className="p-4 text-center"><i className="bx bx-check text-green-500 text-xl"></i></td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 font-medium">Audience Interaction</td>
                <td className="p-4 text-center">Limited</td>
                <td className="p-4 text-center bg-neutral/50 dark:bg-gray-800/50">Moderate</td>
                <td className="p-4 text-center">High</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 font-medium">Props & Equipment</td>
                <td className="p-4 text-center">Basic</td>
                <td className="p-4 text-center bg-neutral/50 dark:bg-gray-800/50">Advanced</td>
                <td className="p-4 text-center">Premium</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 font-medium">Rehearsal Included</td>
                <td className="p-4 text-center"><i className="bx bx-x text-red-500 text-xl"></i></td>
                <td className="p-4 text-center bg-neutral/50 dark:bg-gray-800/50"><i className="bx bx-x text-red-500 text-xl"></i></td>
                <td className="p-4 text-center"><i className="bx bx-check text-green-500 text-xl"></i></td>
              </tr>
              <tr>
                <td className="p-4"></td>
                <td className="p-4 text-center">
                  <a href="#contact" className="inline-block px-6 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-medium transition-colors">
                    Book Now
                  </a>
                </td>
                <td className="p-4 text-center bg-neutral/50 dark:bg-gray-800/50">
                  <a href="#contact" className="inline-block px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-colors">
                    Book Now
                  </a>
                </td>
                <td className="p-4 text-center">
                  <a href="#contact" className="inline-block px-6 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-medium transition-colors">
                    Book Now
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-10 p-6 bg-neutral dark:bg-gray-800 rounded-xl">
          <h3 className="font-montserrat font-semibold text-xl mb-3">Need a custom package?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We can create tailored entertainment solutions for corporate events, weddings, festivals, and more.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            Contact us for a custom quote
            <i className="bx bx-right-arrow-alt"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
