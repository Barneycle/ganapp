import React, { useState, useEffect } from 'react';
import techcon from '../../assets/techcon.png';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, AreaChart, Area
} from 'recharts';
import { Calendar, Clock, Users, Award, FileText, AlertTriangle, CheckCircle, TrendingUp, Activity } from 'lucide-react';

const latestEvent = {
  title: "Annual Tech Conference 2024",
  date: "June 15, 2024",
  description: "Join industry leaders and tech enthusiasts for a day of insightful talks, networking, and innovation showcases.",
  imageUrl: techcon
};

// Mock data for dashboard
const statsData = {
  totalEvents: 24,
  ongoingEvents: 3,
  upcomingEvents: 8,
  completedEvents: 13,
  totalAttendees: 1847,
  certificatesGenerated: 1562,
  surveysCompleted: 892
};

const recentActivity = [
  { id: 1, type: 'checkin', message: 'John Doe checked in at Tech Conference 2024', time: '2 minutes ago', icon: <CheckCircle className="w-4 h-4" /> },
  { id: 2, type: 'survey', message: 'Sarah Smith completed survey for Design Workshop', time: '5 minutes ago', icon: <FileText className="w-4 h-4" /> },
  { id: 3, type: 'event', message: 'Marketing Summit 2024 has been updated', time: '10 minutes ago', icon: <Activity className="w-4 h-4" /> },
  { id: 4, type: 'checkin', message: 'Mike Johnson checked in at Leadership Seminar', time: '15 minutes ago', icon: <CheckCircle className="w-4 h-4" /> },
  { id: 5, type: 'alert', message: 'Schedule conflict detected: 2 events at 2 PM', time: '20 minutes ago', icon: <AlertTriangle className="w-4 h-4" /> }
];

const alerts = [
  { id: 1, type: 'warning', title: 'Schedule Conflict', message: '2 events scheduled at 2 PM in Room A', time: '20 min ago', priority: 'high' },
  { id: 2, type: 'info', title: 'Low Registration', message: 'Design Workshop has only 5 registrations', time: '1 hour ago', priority: 'medium' },
  { id: 3, type: 'success', title: 'High Attendance', message: 'Tech Conference 2024 at 95% capacity', time: '2 hours ago', priority: 'low' }
];

const barData = [
  { name: 'Jan', users: 400, events: 3 },
  { name: 'Feb', users: 300, events: 2 },
  { name: 'Mar', users: 500, events: 4 },
  { name: 'Apr', users: 200, events: 2 },
  { name: 'May', users: 278, events: 3 },
  { name: 'Jun', users: 189, events: 2 },
];

const attendanceTrends = [
  { name: 'Week 1', attendance: 85 },
  { name: 'Week 2', attendance: 92 },
  { name: 'Week 3', attendance: 78 },
  { name: 'Week 4', attendance: 95 },
  { name: 'Week 5', attendance: 88 },
  { name: 'Week 6', attendance: 91 }
];

const surveyFeedback = [
  { name: 'Excellent', value: 65, color: '#10B981' },
  { name: 'Good', value: 25, color: '#3B82F6' },
  { name: 'Average', value: 8, color: '#F59E0B' },
  { name: 'Poor', value: 2, color: '#EF4444' }
];

const eventPerformance = [
  { name: 'Tech Conference', attendance: 95, satisfaction: 92 },
  { name: 'Design Workshop', attendance: 78, satisfaction: 88 },
  { name: 'Marketing Summit', attendance: 85, satisfaction: 90 },
  { name: 'Leadership Seminar', attendance: 92, satisfaction: 94 }
];

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

export const Admin = () => {
  const [showCancelEventsModal, setShowCancelEventsModal] = useState(false);
  const [cancelEvents, setCancelEvents] = useState([
    {
      id: 1,
      title: "Summer Music Festival",
      date: "July 10, 2024",
      description: "Requested cancellation due to weather conditions."
    },
    {
      id: 2,
      title: "Art & Design Expo",
      date: "August 5, 2024",
      description: "Requested cancellation due to venue issues."
    }
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openCancelEventsModal = () => {
    setShowCancelEventsModal(true);
  };

  const closeCancelEventsModal = () => {
    setShowCancelEventsModal(false);
  };

  const handleApprove = (id) => {
    setCancelEvents(prev => prev.filter(event => event.id !== id));
  };

  const handleReject = (id) => {
    setCancelEvents(prev => prev.filter(event => event.id !== id));
  };

  const StatCard = ({ title, value, icon, color, trend }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className="text-3xl" style={{ color }}>{icon}</div>
      </div>
    </div>
  );

  const AlertItem = ({ alert }) => {
    const getAlertColor = (type) => {
      switch (type) {
        case 'warning': return 'text-yellow-600 bg-yellow-50';
        case 'info': return 'text-blue-600 bg-blue-50';
        case 'success': return 'text-green-600 bg-green-50';
        default: return 'text-gray-600 bg-gray-50';
      }
    };

    return (
      <div className={`p-4 rounded-lg mb-3 ${getAlertColor(alert.type)}`}>
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold">{alert.title}</h4>
            <p className="text-sm mt-1">{alert.message}</p>
            <p className="text-xs mt-2 opacity-75">{alert.time}</p>
          </div>
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gray-50 p-8 pt-20">
      <main className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Real-time system overview • {currentTime.toLocaleString()}</p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Events" 
            value={statsData.totalEvents} 
            icon={<Calendar className="w-8 h-8" />}
            color="#3B82F6"
            trend="+12% this month"
          />
          <StatCard 
            title="Ongoing Events" 
            value={statsData.ongoingEvents} 
            icon={<Clock className="w-8 h-8" />}
            color="#10B981"
          />
          <StatCard 
            title="Total Attendees" 
            value={statsData.totalAttendees.toLocaleString()} 
            icon={<Users className="w-8 h-8" />}
            color="#8B5CF6"
            trend="+8% this week"
          />
          <StatCard 
            title="Certificates Generated" 
            value={statsData.certificatesGenerated.toLocaleString()} 
            icon={<Award className="w-8 h-8" />}
            color="#F59E0B"
          />
          <StatCard 
            title="Surveys Completed" 
            value={statsData.surveysCompleted.toLocaleString()} 
            icon={<FileText className="w-8 h-8" />}
            color="#EF4444"
            trend="+15% this week"
          />
          <StatCard 
            title="Upcoming Events" 
            value={statsData.upcomingEvents} 
            icon={<Calendar className="w-8 h-8" />}
            color="#06B6D4"
          />
          <StatCard 
            title="Completed Events" 
            value={statsData.completedEvents} 
            icon={<CheckCircle className="w-8 h-8" />}
            color="#84CC16"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Activity Feed */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Live Activity Feed</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded">
                  <div className="text-blue-600 mt-1">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Alerts Panel */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Smart Alerts</h2>
            <div className="space-y-3">
              {alerts.map(alert => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          </div>

          {/* Event Calendar */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Event Calendar</h2>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                <h4 className="font-semibold text-green-900">Tech Conference 2024</h4>
                <p className="text-sm text-green-700">June 15, 2024 • 9:00 AM</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ongoing</span>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                <h4 className="font-semibold text-blue-900">Design Workshop</h4>
                <p className="text-sm text-blue-700">June 20, 2024 • 2:00 PM</p>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Upcoming</span>
              </div>
              <div className="p-3 bg-gray-50 border-l-4 border-gray-500 rounded">
                <h4 className="font-semibold text-gray-900">Marketing Summit</h4>
                <p className="text-sm text-gray-700">June 10, 2024 • 10:00 AM</p>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Attendance Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrends}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="attendance" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Survey Feedback Ratings</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={surveyFeedback}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {surveyFeedback.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Event Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventPerformance}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="attendance" fill="#3B82F6" name="Attendance %" />
              <Bar dataKey="satisfaction" fill="#10B981" name="Satisfaction %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Content removed: Latest Event and Data Analytics Dashboard sections were redundant */}

        {/* Cancel Events Modal */}
        {showCancelEventsModal && (
          <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-90 rounded-lg shadow-lg w-3/4 max-w-3xl p-6 relative text-gray-900">
              <h2 className="text-2xl font-semibold mb-4">Events Requested to be Cancelled</h2>
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                onClick={closeCancelEventsModal}
                aria-label="Close cancel events modal"
              >
                &times;
              </button>
              <ul className="max-h-96 overflow-y-auto space-y-4">
                {cancelEvents.map(event => (
                  <li key={event.id} className="border border-gray-300 rounded p-4">
                    <h3 className="text-xl font-bold mb-1 text-gray-900">{event.title}</h3>
                    <p className="text-gray-700 mb-1">{event.date}</p>
                    <p className="text-gray-800">{event.description}</p>
                    <div className="flex space-x-4 mt-2">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                        onClick={() => handleApprove(event.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        onClick={() => handleReject(event.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </section>
  );
};
