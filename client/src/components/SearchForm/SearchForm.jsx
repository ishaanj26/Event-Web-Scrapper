import { Search, MapPin, Loader2, Globe } from 'lucide-react';

// Search Form Component
export const SearchForm = ({
  cityName,
  setCityName,
  countryName,
  setCountryName,
  loading,
  onSubmit,
  history,
  onHistoryClick
}) => (
  <div className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 mb-8">
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-white" />
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name (e.g., Sydney)"
            className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-purple-800 bg-gray-800 text-white"
            disabled={loading}
            onKeyPress={(e) => e.key === 'Enter' && onSubmit(e)}
          />
        </div>
        <div className="relative">
          <Globe className="absolute left-3 top-3 h-5 w-5 text-white" />
          <input
            type="text"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            placeholder="Enter country name (e.g., Australia)"
            className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-purple-800  bg-gray-800 text-white"
            disabled={loading}
            onKeyPress={(e) => e.key === 'Enter' && onSubmit(e)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onSubmit}
          disabled={loading || !cityName.trim() || !countryName.trim()}
          className="px-8 py-3 bg-indigo-700 text-black rounded-lg hover:bg-indigo-800 disabled:bg-gray-600 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 text-lg text-white"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
          {loading ? 'Scraping...' : 'Scrape Data'}
        </button>
      </div>
    </div>

    {/* Search History */}
    {history.length > 0 && (
      <div className="mt-6">
        <p className="text-sm text-white mb-2">Recent searches:</p>
        <div className="flex flex-wrap gap-2">
          {history.map((searchString, index) => (
            <button
              key={index}
              onClick={() => onHistoryClick(searchString)}
              className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm hover:bg-gray-600 transition-colors cursor-pointer"
            >
              {searchString}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);
