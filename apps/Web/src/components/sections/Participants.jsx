import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Participants = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock data for demonstration
  const events = [
    {
      id: 1,
      title: "Annual Tech Conference 2024",
      description: "Join industry leaders and tech enthusiasts for a day of insightful talks, networking, and innovation showcases.",
      start_date: "2024-06-15",
      end_date: "2024-06-15",
      start_time: "09:00:00",
      end_time: "17:00:00",
      venue: "Grand Convention Center, Cityville",
      status: "upcoming",
      max_participants: 500,
      current_participants: 342,
      banner_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      event_kits: [
        { name: "Conference Badge", type: "PDF", url: "#" },
        { name: "Event Schedule", type: "PDF", url: "#" },
        { name: "Speaker Bios", type: "PDF", url: "#" }
      ],
      programme: [
        { name: "Full Conference Programme", type: "PDF", url: "#" },
        { name: "Workshop Details", type: "PDF", url: "#" }
      ],
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
      rationale: "The Annual Tech Conference 2024 aims to foster collaboration and innovation among technology professionals by providing a platform for sharing knowledge, networking, and showcasing the latest advancements in the industry."
    },
    {
      id: 2,
      title: "Innovation Workshop Series",
      description: "Hands-on workshops focusing on emerging technologies and creative problem-solving methodologies.",
      start_date: "2024-07-20",
      end_date: "2024-07-22",
      start_time: "10:00:00",
      end_time: "16:00:00",
      venue: "Innovation Hub, Tech District",
      status: "upcoming",
      max_participants: 100,
      current_participants: 78,
      banner_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      event_kits: [
        { name: "Workshop Materials", type: "PDF", url: "#" },
        { name: "Pre-workshop Reading", type: "PDF", url: "#" }
      ],
      programme: [
        { name: "Workshop Schedule", type: "PDF", url: "#" },
        { name: "Session Outlines", type: "PDF", url: "#" }
      ],
      sponsors: [
        { name: "Innovation Labs" },
        { name: "Tech Forward" }
      ],
      speakers: [
        { name: "Dr. Sarah Chen" },
        { name: "Mr. Alex Rodriguez" }
      ],
      rationale: "The Innovation Workshop Series provides hands-on experience with cutting-edge technologies and methodologies, empowering participants to think creatively and solve complex problems."
    }
  ];

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming';
      case 'ongoing':
        return 'Ongoing';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">


        {/* Featured Event Banner */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden mb-12">
          {/* Banner Image */}
          <div className="w-full overflow-hidden h-48 sm:h-64 md:h-80 lg:h-96">
            <img
              src={events[0]?.banner_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"}
              alt={events[0]?.title || "Featured Event"}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Event Title Section */}
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-6 py-6 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              {events[0]?.title || "Annual Tech Conference 2024"}
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl">
              {events[0]?.description || "Join industry leaders and tech enthusiasts for a day of insightful talks, networking, and innovation showcases."}
            </p>
          </div>
          

        </div>

        {/* Event Details Card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 p-6 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">Event Details</h3>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* First Row (2 boxes) */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-1">Event Kits</h4>
                    <p className="text-slate-600 text-sm">{events[0]?.event_kits?.length || 0} materials available</p>
                  </div>
                  <div className="space-y-3">
                    {events[0]?.event_kits?.map((kit, index) => (
                      <div key={index} className="group/item flex items-center justify-between p-4 bg-slate-50/80 rounded-xl border border-slate-200/60 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-sm">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 group-hover/item:text-blue-700 transition-colors">{kit.name}</p>
                            <p className="text-xs text-slate-500">{kit.type}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <a 
                            href={kit.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            View
                          </a>
                          <a 
                            href={kit.url} 
                            download
                            className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                    {(!events[0]?.event_kits || events[0].event_kits.length === 0) && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <p className="text-sm text-slate-500">No event kits available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-1">Programme</h4>
                    <p className="text-slate-600 text-sm">{events[0]?.programme?.length || 0} files available</p>
                  </div>
                  <div className="space-y-3">
                    {events[0]?.programme?.map((prog, index) => (
                      <div key={index} className="group/item flex items-center justify-between p-4 bg-slate-50/80 rounded-xl border border-slate-200/60 hover:bg-white hover:border-emerald-200 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center shadow-sm">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 group-hover/item:text-emerald-700 transition-colors">{prog.name}</p>
                            <p className="text-xs text-slate-500">{prog.type}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <a 
                            href={prog.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            View
                          </a>
                          <a 
                            href={prog.url} 
                            download
                            className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                    {(!events[0]?.programme || events[0].programme.length === 0) && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <p className="text-sm text-slate-500">No programme files available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row (3 boxes) */}
            <div className="grid grid-cols-3 gap-6">
              <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Date</h4>
                  <p className="text-base text-slate-600 font-medium">{formatDate(events[0]?.start_date || "2024-06-15")}</p>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Time</h4>
                  <p className="text-base text-slate-600 font-medium">{formatTime(events[0]?.start_time || "09:00:00")} - {formatTime(events[0]?.end_time || "17:00:00")}</p>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Venue</h4>
                  <p className="text-base text-slate-600 font-medium">{events[0]?.venue || 'TBA'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Event Information */}
        <div className="space-y-6">
          {events[0]?.rationale && (
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-800">Event Rationale</h4>
                  <p className="text-slate-600">{events[0].rationale}</p>
                </div>
              </div>
            </div>
          )}
          
          {events[0]?.speakers && events[0].speakers.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-800">Guest Speakers</h4>
                  <ul className="mt-3 space-y-2">
                    {events[0].speakers.map((speaker, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-slate-600">{speaker.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {events[0]?.sponsors && events[0].sponsors.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-800">Sponsors</h4>
                  <ul className="mt-3 space-y-2">
                    {events[0].sponsors.map((sponsor, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-slate-600">{sponsor.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Event Kits & Programme Section */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-slate-800">Event Materials</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {/* Event Kits */}
                  <div>
                    <h5 className="text-lg font-medium text-slate-700 mb-3">Event Kits</h5>
                    <div className="space-y-2">
                      {events[0]?.event_kits?.map((kit, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-600">{kit.name}</span>
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                            View {kit.type}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Programme */}
                  <div>
                    <h5 className="text-lg font-medium text-slate-700 mb-3">Programme</h5>
                    <div className="space-y-2">
                      {events[0]?.programme?.map((prog, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-600">{prog.name}</span>
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                            View {prog.type}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Database Status */}
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl shadow-lg border border-blue-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-800">Events Status</h4>
                <p className="text-blue-700">
                  {events.length > 0 
                    ? `✅ Loaded ${events.length} event(s) for participants` 
                    : '⚠️ No events available at the moment.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
