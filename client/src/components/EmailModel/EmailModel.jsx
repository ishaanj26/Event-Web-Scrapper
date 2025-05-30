import { Mail, Ticket, X } from "lucide-react";
import { formatEventDate } from "../../utilities/utilities";

// Email Modal Component
export const EmailModal = ({
  show,
  selectedEvent,
  email,
  setEmail,
  emailOptIn,
  setEmailOptIn,
  emailError,
  setEmailError,
  onSubmit,
  onClose
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg px-6 py-4 mb-8 ">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold text-white">Get Tickets</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h4 className="font-medium text-white mb-1">{selectedEvent?.name}</h4>
            <p className="text-sm text-gray-400">{selectedEvent?.venue}</p>
            <p className="text-sm text-gray-400">
              {selectedEvent && formatEventDate(selectedEvent.date)} at {selectedEvent?.time}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="Enter your email address"
                  className="text-white w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-700"
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="emailOptIn"
                checked={emailOptIn}
                onChange={(e) => setEmailOptIn(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="emailOptIn" className="text-sm text-gray-600 cursor-pointer">
                I would like to receive updates about upcoming events and special offers in this city.
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ticket className="h-4 w-4" />
              Continue to Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};