import { Clock, Calendar, MapPin, Ticket } from 'lucide-react';
import { capitalizeFirstLetter, formatEventDate, getCategoryColor } from '../../utilities/utilities';

// City Overview Component
export const CityOverview = ({ city, country, lastUpdated }) => (
  <div className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg px-6 py-4 mb-8">
    <div className="flex justify-end mb-4">
      <span className="text-sm text-gray-400 flex items-center gap-1">
        <Clock className="h-4 w-4" />
        Last updated: {new Date(lastUpdated).toLocaleString()}
      </span>
    </div>
    <div className="flex justify-center mb-3">
      <h2 className="text-3xl font-semibold text-white flex items-center gap-2">
        <MapPin className="h-7 w-7 text-indigo-500" />
        {capitalizeFirstLetter(city)}, {capitalizeFirstLetter(country)}
      </h2>
    </div>
  </div>
);

// Events Section Component
export const EventsSection = ({ events, onGetTickets }) => (
  <div className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg px-6 py-4 mb-8 ">
    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
      <Calendar className="h-6 w-6 text-blue-600" />
      Upcoming Events ({events.length})
    </h3>
    <div className="space-y-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} onGetTickets={onGetTickets} />
      ))}
    </div>
  </div>
);

// Raw Data Component
export const RawDataSection = ({ data }) => (
  <div className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg px-6 py-4 mb-8 ">
    <h3 className="text-xl font-bold text-white mb-4">Raw Scraped Data</h3>
    <pre className="bg-gray-800 text-gray-200 p-5 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap max-h-64 shadow-inner scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
);

// Event Card Component
export const EventCard = ({ event, onGetTickets }) => (
  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-900">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      {/* Photo Section */}
      {event.photo && (
        <div className="w-full lg:w-1/4">
          <img
            src={event.photo}
            alt={event.name}
            className="rounded-lg object-cover w-full h-40"
          />
        </div>
      )}

      {/* Event Details */}
      <div className="flex-1 space-y-2">
        <h3 className="text-white font-bold text-lg">{event.name}</h3>
        <div className="space-y-1 text-sm text-white">
          <p className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {event.date}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {event.venue}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => onGetTickets(event)}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 font-medium cursor-pointer"
        >
          <Ticket className="h-4 w-4" />
          GET TICKETS
        </button>
      </div>
    </div>
  </div>
);

