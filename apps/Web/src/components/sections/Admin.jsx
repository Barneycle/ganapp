import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const COLORS = ['#1e40af', '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 p-6 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-2">{title}</p>
        <p className="text-3xl font-bold text-slate-800 mb-3">{value}</p>
        <div className="flex items-center">
          <span className={`text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-slate-500 ml-2">from last month</span>
        </div>
      </div>
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </div>
  </div>
);

const AlertItem = ({ type, message, time, priority }) => (
  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 mb-3 hover:bg-slate-100 transition-colors duration-200">
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-3">
        <div className={`w-3 h-3 rounded-full mt-2 ${
          priority === 'high' ? 'bg-red-500' : 
          priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
        }`}></div>
        <div>
          <p className="text-sm font-medium text-slate-800 mb-1">{message}</p>
          <p className="text-xs text-slate-500">{time}</p>
        </div>
      </div>
      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
        type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
        type === 'error' ? 'bg-red-100 text-red-800' :
        'bg-blue-100 text-blue-800'
      }`}>
        {type}
      </span>
    </div>
  </div>
);

export const Admin = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const statsData = [
    { title: 'Total Events', value: '24', change: 12, icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { title: 'Active Users', value: '1,847', change: 8, icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg> },
    { title: 'Total Surveys', value: '156', change: 23, icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { title: 'Revenue', value: '$12.4K', change: -3, icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg> }
  ];

  const userActivityData = [
    { time: '09:00', users: 45, events: 3 },
    { time: '10:00', users: 78, events: 5 },
    { time: '11:00', users: 92, events: 7 },
    { time: '12:00', users: 65, events: 4 },
    { time: '13:00', users: 88, events: 6 },
    { time: '14:00', users: 105, events: 8 },
    { time: '15:00', users: 76, events: 5 },
    { time: '16:00', users: 58, events: 3 }
  ];

  const surveyData = [
    { name: 'Very Satisfied', value: 45, color: '#10b981' },
    { name: 'Satisfied', value: 30, color: '#f59e0b' },
    { name: 'Neutral', value: 15, color: '#6366f1' },
    { name: 'Dissatisfied', value: 7, color: '#ef4444' },
    { name: 'Very Dissatisfied', value: 3, color: '#8b5cf6' }
  ];

  const eventTrendsData = [
    { month: 'Jan', events: 12, participants: 450 },
    { month: 'Feb', events: 15, participants: 520 },
    { month: 'Mar', events: 18, participants: 680 },
    { month: 'Apr', events: 22, participants: 750 },
    { month: 'May', events: 25, participants: 890 },
    { month: 'Jun', events: 28, participants: 920 }
  ];

  const alerts = [
    { type: 'warning', message: 'High memory usage detected on server', time: '2 minutes ago', priority: 'high' },
    { type: 'error', message: 'Database connection timeout', time: '5 minutes ago', priority: 'high' },
    { type: 'info', message: 'New user registration spike detected', time: '10 minutes ago', priority: 'low' },
    { type: 'warning', message: 'Survey response rate below threshold', time: '15 minutes ago', priority: 'medium' }
  ];

  const upcomingEvents = [
    { name: 'Tech Conference 2024', date: 'Dec 15', participants: 150, status: 'confirmed' },
    { name: 'Workshop Series', date: 'Dec 18', participants: 45, status: 'pending' },
    { name: 'Annual Meeting', date: 'Dec 22', participants: 200, status: 'confirmed' },
    { name: 'Training Session', date: 'Dec 25', participants: 30, status: 'cancelled' }
  ];

  const handleCancelEvent = (event) => {
    setSelectedEvent(event);
    setShowCancelModal(true);
  };

  const confirmCancelEvent = () => {
    // Handle event cancellation logic here
    console.log('Cancelling event:', selectedEvent);
    setShowCancelModal(false);
    setSelectedEvent(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Monitor system performance, manage events, and track user engagement across the platform
          </p>
        </div>
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Activity Feed */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Live Activity Feed</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="users" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="events" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Event Trends */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Event Trends</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={eventTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line type="monotone" dataKey="events" stroke="#8884d8" strokeWidth={3} dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }} />
                  <Line type="monotone" dataKey="participants" stroke="#82ca9d" strokeWidth={3} dot={{ fill: '#82ca9d', strokeWidth: 2, r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Survey Analytics */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Survey Satisfaction Distribution</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={surveyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {surveyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Smart Alerts */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center mr-3 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Smart Alerts</h3>
              </div>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <AlertItem key={index} {...alert} />
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center mr-3 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Upcoming Events</h3>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800 text-sm">{event.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{event.date}</span>
                      <span>{event.participants} participants</span>
                    </div>
                    {event.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelEvent(event)}
                        className="mt-3 w-full text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Cancel Event
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Events Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-xl -m-6 mb-6">
              <h3 className="text-lg font-semibold">Cancel Event</h3>
              <p className="text-blue-100 text-sm mt-1">Are you sure you want to cancel this event?</p>
            </div>
            <div className="mb-6">
              <p className="text-slate-700">
                <strong>Event:</strong> {selectedEvent?.name}<br />
                <strong>Date:</strong> {selectedEvent?.date}<br />
                <strong>Participants:</strong> {selectedEvent?.participants}
              </p>
              <p className="text-sm text-slate-600 mt-3">
                This action will notify all registered participants and cannot be undone.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors duration-200"
              >
                Keep Event
              </button>
              <button
                onClick={confirmCancelEvent}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-semibold"
              >
                Cancel Event
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
