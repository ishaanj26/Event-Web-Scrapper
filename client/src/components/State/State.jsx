import {  Loader2, AlertCircle, Clock, Calendar, Globe, Ticket, X, Mail, RefreshCw } from 'lucide-react';
// Error Display Component
export const ErrorDisplay = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center gap-3">
      <AlertCircle className="h-5 w-5 text-red-500" />
      <p className="text-red-700">{error}</p>
    </div>
  );
};

// Loading State Component
export const LoadingState = ({ cityName, countryName, scrapedData }) => (
  <div className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 mb-8 text-center">
    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-purple-600" />
    <p className="text-white">Scraping data for {scrapedData?.city || cityName}, {scrapedData?.country || countryName}...</p>
    <p className="text-sm text-white mt-2">This may take a few seconds</p>
  </div>
);
