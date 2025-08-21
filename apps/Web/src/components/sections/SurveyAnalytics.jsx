import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const barData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 200 },
  { name: 'May', users: 278 },
  { name: 'Jun', users: 189 },
];

const pieData = [
  { name: 'Positive', value: 85 },
  { name: 'Neutral', value: 10 },
  { name: 'Negative', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

export const SurveyAnalytics = () => {
  const [exporting, setExporting] = useState(false);

  const exportData = (data, filename) => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportCSV = (data, filename) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="min-h-screen bg-white/95 p-4 sm:p-6 md:p-8 flex pt-16 sm:pt-20 justify-center">
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-black">Data Analytics Dashboard</h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900">User Registrations</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  onClick={() => exportData(barData, 'user-registrations.json')}
                  className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 w-full sm:w-auto"
                >
                  Export JSON
                </button>
                <button 
                  onClick={() => exportCSV(barData, 'user-registrations.csv')}
                  className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 w-full sm:w-auto"
                >
                  Export CSV
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900">Evaluation Answers</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  onClick={() => exportData(pieData, 'evaluation-answers.json')}
                  className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 w-full sm:w-auto"
                >
                  Export JSON
                </button>
                <button 
                  onClick={() => exportCSV(pieData, 'evaluation-answers.csv')}
                  className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 w-full sm:w-auto"
                >
                  Export CSV
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900">Event Feedback</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  onClick={() => exportData([
                    { name: 'Satisfied', value: 92 },
                    { name: 'Neutral', value: 5 },
                    { name: 'Dissatisfied', value: 3 }
                  ], 'event-feedback.json')}
                  className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 w-full sm:w-auto"
                >
                  Export JSON
                </button>
                <button 
                  onClick={() => exportCSV([
                    { name: 'Satisfied', value: 92 },
                    { name: 'Neutral', value: 5 },
                    { name: 'Dissatisfied', value: 3 }
                  ], 'event-feedback.csv')}
                  className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 w-full sm:w-auto"
                >
                  Export CSV
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Satisfied', value: 92 },
                    { name: 'Neutral', value: 5 },
                    { name: 'Dissatisfied', value: 3 }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#82ca9d"
                  dataKey="value"
                  label
                >
                  <Cell fill="#82ca9d" />
                  <Cell fill="#8884d8" />
                  <Cell fill="#ff6666" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
