import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react';
import { Header, Instructions } from './components/Header/Header';
import { SearchForm } from './components/SearchForm/SearchForm';
import { AutoRefreshStatus } from './components/AutoRefresh/AutoRefresh';
import { ErrorDisplay, LoadingState } from './components/State/State';
import { CityOverview, EventsSection, RawDataSection } from './components/Event/Event';
import { EmailModal } from './components/EmailModel/EmailModel';

// Custom Hook for Auto-Refresh
const useAutoRefresh = (scrapeCity) => {
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(300);
  const intervalRef = useRef(null);
  const countdownRef = useRef(null);

  const startAutoRefresh = (city, country) => {
    setTimeUntilRefresh(300);

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    intervalRef.current = setInterval(() => {
      scrapeCity(city, country, true);
      setTimeUntilRefresh(300);
    }, 300000);

    countdownRef.current = setInterval(() => {
      setTimeUntilRefresh(prev => {
        if (prev <= 1) {
          return 300;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopAutoRefresh = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setTimeUntilRefresh(300);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  return { timeUntilRefresh, startAutoRefresh, stopAutoRefresh };
};

// Main App Component
const CityScraperApp = () => {
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [scrapedData, setScrapedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState('');
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Mock API call
  const scrapeCity = async (city, country, isAutoRefresh = false) => {
    try {
      setLoading(true);
      if (!isAutoRefresh) {
        setError('');
      }
      // const response = await axios.post('https://event-web-scrapper.onrender.com/api/scrape-events', {
      const response = await axios.post('https://event-web-scrapper.onrender.com/api/scrape-events', {
        city,
        country
      });

      const events = response.data.events;
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockData = {
        city: city,
        country: country,
        events,
        lastUpdated: new Date().toISOString()
      };

      setScrapedData(mockData);

      if (!isAutoRefresh) {
        const searchString = `${city}, ${country}`;
        setHistory(prev => {
          const newHistory = [searchString, ...prev.filter(item => item !== searchString)];
          return newHistory.slice(0, 5);
        });
      }

    } catch (err) {
      setError('Failed to scrape data for this city. Please try again.');
      console.error('Scraping error:', err);
    } finally {
      setLoading(false);
    }
  };

  const { timeUntilRefresh, startAutoRefresh, stopAutoRefresh } = useAutoRefresh(scrapeCity);

  const handleManualRefresh = () => {
    if (scrapedData) {
      scrapeCity(scrapedData.city, scrapedData.country);
      setTimeUntilRefresh(300);
    }
  };

  useEffect(() => {
    if (!scrapedData) {
      stopAutoRefresh();
    }
  }, [scrapedData]);

  useEffect(() => {
    if (scrapedData && !loading) {
      startAutoRefresh(scrapedData.city, scrapedData.country);
    }
  }, [scrapedData, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityName.trim() && countryName.trim()) {
      stopAutoRefresh();
      scrapeCity(cityName.trim(), countryName.trim());
    }
  };

  const handleHistoryClick = (searchString) => {
    const [city, country] = searchString.split(', ');
    setCityName(city);
    setCountryName(country);
    stopAutoRefresh();
    scrapeCity(city, country);
  };

  const handleGetTickets = (event) => {
    setSelectedEvent(event);
    setShowEmailModal(true);
    setEmail('');
    setEmailOptIn(false);
    setEmailError('');
  };

  const handleEmailSubmit = () => {
    if (!email.trim()) {
      setEmailError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    console.log('Email captured:', email, 'Opt-in:', emailOptIn);

    setShowEmailModal(false);
    window.open(selectedEvent.ticketUrl, '_blank');

    setSelectedEvent(null);
    setEmail('');
    setEmailOptIn(false);
    setEmailError('');
  };

  const closeModal = () => {
    setShowEmailModal(false);
    setSelectedEvent(null);
    setEmail('');
    setEmailOptIn(false);
    setEmailError('');
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        <SearchForm
          cityName={cityName}
          setCityName={setCityName}
          countryName={countryName}
          setCountryName={setCountryName}
          loading={loading}
          onSubmit={handleSubmit}
          history={history}
          onHistoryClick={handleHistoryClick}
        />

        <AutoRefreshStatus
          scrapedData={scrapedData}
          loading={loading}
          timeUntilRefresh={timeUntilRefresh}
          onManualRefresh={handleManualRefresh}
        />

        <ErrorDisplay error={error} />

        {loading && (
          <LoadingState
            cityName={cityName}
            countryName={countryName}
            scrapedData={scrapedData}
          />
        )}

        {scrapedData && !loading && (
          <div className="space-y-6">
            <CityOverview
              city={scrapedData.city}
              country={scrapedData.country}
              lastUpdated={scrapedData.lastUpdated}
            />

            <EventsSection
              events={scrapedData.events}
              onGetTickets={handleGetTickets}
            />

            <RawDataSection data={scrapedData} />
          </div>
        )}

        {!scrapedData && !loading && <Instructions />}

        <EmailModal
          show={showEmailModal}
          selectedEvent={selectedEvent}
          email={email}
          setEmail={setEmail}
          emailOptIn={emailOptIn}
          setEmailOptIn={setEmailOptIn}
          emailError={emailError}
          setEmailError={setEmailError}
          onSubmit={handleEmailSubmit}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default CityScraperApp;