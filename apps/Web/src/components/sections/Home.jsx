import React, { useEffect, useState } from 'react';
import techcon from '../../assets/techcon.png';
import { EventService } from '../../../shared/services/eventService';

export const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await EventService.getPublishedEvents();
        setEvents(fetchedEvents);
        setError(null);
      } catch (err) {
        setError('Failed to load events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Use the first event as the featured event, or fallback to default
  const featuredEvent = events[0] || {
    title: "Annual Tech Conference 2024",
    description: "Join industry leaders and tech enthusiasts for a day of insightful talks, networking, and innovation showcases.",
    start_date: "2024-06-15",
    end_date: "2024-06-15",
    start_time: "09:00:00",
    end_time: "17:00:00",
    venue: "Grand Convention Center, Cityville",
    sponsors: [
      { name: "TechCorp" },
      { name: "InnovateX" },
      { name: "Future Solutions" }
    ],
    speakers: [
      { name: "Dr. Jane Smith" },
      { name: "Mr. John Doe" },
      { name: "Prof. Emily Johnson" }
    ],
    rationale: "The Annual Tech Conference 2024 aims to foster collaboration and innovation among technology professionals by providing a platform for sharing knowledge, networking, and showcasing the latest advancements in the industry.",
    banner_url: techcon
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-white/95 p-0 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-white/95 p-0 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-800 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white/95 p-0 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Hero Image */}
        <div className="w-full overflow-hidden h-48 sm:h-64 md:h-80 lg:h-96">
          <img
            src={featuredEvent.banner_url || techcon}
            alt={featuredEvent.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Responsive Title */}
        <h3 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 text-center">
          {featuredEvent.title}
        </h3>
        
        {/* Responsive Event Details Grid */}
        <div className="mt-6 space-y-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg shadow-md p-4 bg-white">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Date:</h4>
              <p className="text-gray-700">{formatDate(featuredEvent.start_date)}</p>
            </div>
            <div className="border rounded-lg shadow-md p-4 bg-white">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Time:</h4>
              <p className="text-gray-700">{formatTime(featuredEvent.start_time)} - {formatTime(featuredEvent.end_time)}</p>
            </div>
            <div className="border rounded-lg shadow-md p-4 bg-white">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Venue:</h4>
              <p className="text-gray-700">{featuredEvent.venue || 'TBA'}</p>
            </div>
          </div>
          
          {featuredEvent.rationale && (
            <div className="border rounded-lg shadow-md p-4 bg-white">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Rationale:</h4>
              <p className="text-gray-700">{featuredEvent.rationale}</p>
            </div>
          )}
          
          {featuredEvent.speakers && featuredEvent.speakers.length > 0 && (
            <div className="border rounded-lg shadow-md p-4 bg-white">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Guest Speaker/s:</h4>
              <ul className="list-disc list-inside text-gray-800">
                {featuredEvent.speakers.map((speaker, index) => (
                  <li key={index}>{speaker.name}</li>
                ))}
              </ul>
            </div>
          )}
          
          {featuredEvent.sponsors && featuredEvent.sponsors.length > 0 && (
            <div className="border rounded-lg shadow-md p-4 bg-white">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Sponsor/s:</h4>
              <ul className="list-disc list-inside text-gray-800">
                {featuredEvent.sponsors.map((sponsor, index) => (
                  <li key={index}>{sponsor.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Database Status */}
          <div className="border rounded-lg shadow-md p-4 bg-blue-50">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Database Status:</h4>
            <p className="text-blue-800">
              {events.length > 0 
                ? `✅ Connected! Loaded ${events.length} event(s) from database` 
                : '⚠️ Connected but no events found. Check if the database schema has been created.'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
