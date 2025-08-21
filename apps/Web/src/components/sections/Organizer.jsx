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
  programmeLink: "/path/to/programme.pdf",
  materialsLink: "/path/to/materials.pdf",
  imageUrl: techcon
};

export const Organizer = () => {
  return (
    <section className="min-h-screen bg-white/95 p-0 flex flex-col items-center">
      <div className="w-full max-w-full overflow-hidden h-[25vh] sm:h-[30vh] md:h-[35vh] lg:h-[40vh]">
        <img
          src={latestEvent.imageUrl}
          alt={latestEvent.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <h3 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-blue-900 text-center px-4">
        {latestEvent.title}
      </h3>
      
      <div className="mt-6 space-y-4 sm:space-y-6 max-w-6xl px-4 sm:px-6 md:px-8 w-full">
        {/* Programme and Materials Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border rounded-lg shadow-md p-4 sm:p-6 bg-white">
            <a 
              href={latestEvent.programmeLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline text-sm sm:text-base md:text-lg font-semibold block text-center sm:text-left"
            >
              View Event Programme
            </a>
          </div>
          <div className="border rounded-lg shadow-md p-4 sm:p-6 bg-white">
            <a 
              href={latestEvent.materialsLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline text-sm sm:text-base md:text-lg font-semibold block text-center sm:text-left"
            >
              View Event Kits
            </a>
          </div>
        </div>

        {/* Event Details */}
        <div className="border rounded-lg shadow-md p-4 sm:p-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900 mb-1 sm:mb-2">Date:</h4>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg">{latestEvent.date}</p>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900 mb-1 sm:mb-2">Time:</h4>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg">{latestEvent.time}</p>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900 mb-1 sm:mb-2">Venue:</h4>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg">{latestEvent.venue}</p>
            </div>
          </div>
        </div>

        {/* Rationale */}
        <div className="border rounded-lg shadow-md p-4 sm:p-6 bg-white">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900 mb-2 sm:mb-4">Rationale:</h4>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">{latestEvent.rationale}</p>
        </div>

        {/* Guest Speakers */}
        <div className="border rounded-lg shadow-md p-4 sm:p-6 bg-white">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900 mb-2 sm:mb-4">Guest Speaker/s:</h4>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {latestEvent.guestSpeakers.map((speaker, index) => (
              <li key={index} className="text-sm sm:text-base">{speaker}</li>
            ))}
          </ul>
        </div>

        {/* Sponsors */}
        <div className="border rounded-lg shadow-md p-4 sm:p-6 bg-white">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900 mb-2 sm:mb-4">Sponsor/s:</h4>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {latestEvent.sponsors.map((sponsor, index) => (
              <li key={index} className="text-sm sm:text-base">{sponsor}</li>
            ))}
          </ul>
        </div>

        {/* QR Code Section */}
        <div className="border rounded-lg shadow-md p-4 sm:p-6 bg-white">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900 mb-4 text-center">QR Code:</h4>
          <div className="flex flex-col items-center">
            <div className="bg-white border-2 border-gray-300 rounded p-2 sm:p-4 mb-4">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/survey" 
                alt="Event QR Code" 
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto"
              />
            </div>
            <a 
              href="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://example.com/survey" 
              download="event-qr-code.png"
              className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Download QR Code
            </a>
          </div>
        </div>

        {/* Survey Link */}
        <div className="border rounded-lg shadow-md p-4 sm:p-6 bg-white">
          <a 
            href="/path/to/answer-survey" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline text-sm sm:text-base md:text-lg font-semibold block text-center"
          >
            View Survey
          </a>
        </div>
      </div>
    </section>
  );
};
