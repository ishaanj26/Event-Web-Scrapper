// Auto-Refresh Status Component
import {  Clock, RefreshCw } from 'lucide-react';
import { formatCountdown } from '../../utilities/utilities';

export const AutoRefreshStatus = ({ scrapedData, loading, timeUntilRefresh, onManualRefresh }) => {
  if (!scrapedData || loading) return null;

  return (
  <div className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onManualRefresh}
            disabled={loading}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 font-medium transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Now
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Next auto-refresh in: <span className="font-mono">{formatCountdown(timeUntilRefresh)}</span></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            Auto-refresh active
          </div>
        </div>
      </div>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 max-w-2xl mx-auto mt-5">
        <p className="text-purple-700 text-sm font-medium flex items-center justify-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Screen automatically refreshes every 5 minutes to keep data current
        </p>
      </div>
    </div>
  );
};

