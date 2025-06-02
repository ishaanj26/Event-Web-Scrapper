// Utility functions
export const formatEventDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getCategoryColor = (category) => {
  const colors = {
    'Music': 'bg-purple-100 text-purple-700',
    'Food & Drink': 'bg-orange-100 text-orange-700',
    'Art': 'bg-pink-100 text-pink-700',
    'Technology': 'bg-blue-100 text-blue-700',
    'Sports': 'bg-green-100 text-green-700',
    'Entertainment': 'bg-yellow-100 text-yellow-700',
    'default': 'bg-gray-100 text-gray-700'
  };
  return colors[category] || colors.default;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatCountdown = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};