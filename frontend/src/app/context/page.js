// This would be a Next.js page for context input.
"use client";

import { useState, useEffect } from 'react';

const ContextInputPage = () => {
  const [context, setContext] = useState('');
  const [contextHistory, setContextHistory] = useState([]);

  useEffect(() => {
    // In a real app, fetch context history from your backend on component mount.
    // For now, simulate some dummy data.
    setContextHistory([
      { id: 1, text: "Meeting with John at 2 PM regarding Q3 targets. Need to prepare sales report.", timestamp: "2025-07-04T10:00:00Z" },
      { id: 2, text: "Email from Sarah: 'Please review the new marketing campaign draft by end of day.'", timestamp: "2025-07-03T09:30:00Z" },
    ]);
  }, []);

  const handleSubmitContext = () => {
    if (context.trim()) {
      // In a real app, send 'context.trim()' to your AI/backend.
      // After successful submission, update history.
      const newEntry = { id: Date.now(), text: context.trim(), timestamp: new Date().toISOString() };
      setContextHistory(prev => [newEntry, ...prev]);
      setContext(''); // Clear input
      alert('Context submitted successfully!'); // Or display a better notification
    }
  };

  const handleClearContext = () => {
    setContext('');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Daily Context Input</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <label htmlFor="contextInput" className="block text-gray-700 text-sm font-bold mb-2">
          Paste or type your daily messages, emails, notes here:
        </label>
        <textarea
          id="contextInput"
          rows="10"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g., 'Email from boss: new project due next Friday. Meeting notes from client call...' "
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleClearContext}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Clear Input
          </button>
          <button
            onClick={handleSubmitContext}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Context
          </button>
        </div>
      </div>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Context History</h2>
      <div className="space-y-4">
        {contextHistory.length > 0 ? (
          contextHistory.map(entry => (
            <div key={entry.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Submitted on: {new Date(entry.timestamp).toLocaleString()}</p>
              <p className="text-gray-700">{entry.text}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No context history yet. Submit some context above!</p>
        )}
      </div>
    </div>
  );
};

export default ContextInputPage;