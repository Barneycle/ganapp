import React from 'react';
import techcon from '../../assets/techcon.png';

const latestEvent = {
  title: "Annual Tech Conference 2024",
  date: "June 15, 2024",
  time: "9:00 AM - 5:00 PM",
  venue: "Grand Convention Center, Cityville",
  sponsors: [
    "TechCorp",
    "InnovateX",
    "Future Solutions"
  ],
  guestSpeakers: [
    "Dr. Jane Smith",
    "Mr. John Doe",
    "Prof. Emily Johnson"
  ],
  rationale: "The Annual Tech Conference 2024 aims to foster collaboration and innovation among technology professionals by providing a platform for sharing knowledge, networking, and showcasing the latest advancements in the industry.",
  imageUrl: techcon
};

export const Home = () => {
  return (
    <section className="min-h-screen bg-white/95 p-0 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Hero Image */}
        <div className="w-full overflow-hidden h-48 sm:h-64 md:h-80 lg:h-96">
          <img
            src={latestEvent.imageUrl}
            alt={latestEvent.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Responsive Title */}
        <h3 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 text-center">
          {latestEvent.title}
        </h3>
        
        {/* Responsive Event Details Grid */}
        <div className="mt-6 space-y-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg shadow-md p-4 bg-white">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Date:</h4>
              <p className="text-gray-700">{latestEvent.date}</p>
            </div>
            <div className="border rounded-lg shadow-md p-4 bg-white">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Time:</h4>
              <p className="text-gray-700">{latestEvent.time}</p>
            </div>
            <div className="border rounded-lg shadow-md p-4 bg-white">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Venue:</h4>
              <p className="text-gray-700">{latestEvent.venue}</p>
            </div>
          </div>
          
          <div className="border rounded-lg shadow-md p-4 bg-white">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Rationale:</h4>
            <p className="text-gray-700">{latestEvent.rationale}</p>
          </div>
          
          <div className="border rounded-lg shadow-md p-4 bg-white">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Guest Speaker/s:</h4>
            <ul className="list-disc list-inside text-gray-800">
              {latestEvent.guestSpeakers.map((speaker, index) => (
                <li key={index}>{speaker}</li>
              ))}
            </ul>
          </div>
          
          <div className="border rounded-lg shadow-md p-4 bg-white">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Sponsor/s:</h4>
            <ul className="list-disc list-inside text-gray-800">
              {latestEvent.sponsors.map((sponsor, index) => (
                <li key={index}>{sponsor}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
