import { MapPin } from "lucide-react";

// Header Component
export const Header = () => (
  <div className="text-center mb-10 px-4">
    <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-4 tracking-wide drop-shadow-lg">
      EVENTS DATA SCRAPER
    </h1>
    <p className="text-gray-300 text-xl sm:text-md max-w-xl mx-auto">
      Enter city and country to scrape comprehensive data including events
    </p>
  </div>
);


// Instructions Component
export const Instructions = () => (
  <div className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 text-center">
    <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
   <h3 className="text-2xl font-extrabold text-yellow-400 mb-3">
      Ready to Scrape Events Data
    </h3>
     <p className="text-gray-300 text-lg mb-5">
      Enter both city and country names above to start scraping upcoming events in your chosen location.
    </p>
    <div className="text-sm text-gray-400 space-y-1 mb-6">
      <p className="font-semibold text-yellow-300">Examples:</p>
      <p>City: "Sydney" | Country: "Australia"</p>
      <p>City: "New York" | Country: "United States"</p>
      <p>City: "London" | Country: "United Kingdom"</p>
    </div>
  </div>
);