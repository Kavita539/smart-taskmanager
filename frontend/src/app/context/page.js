// app/context/page.js
'use client'; // This directive is necessary for client-side functionality

import { useState, useEffect } from 'react';

export default function ContextPage() {
  const [currentContextInput, setCurrentContextInput] = useState(''); // Renamed for clarity: this is the text in the textarea
  const [selectedSourceType, setSelectedSourceType] = useState('manual'); // New state for source type, with a default
  const [contextHistory, setContextHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Define your available source types
  const sourceTypes = [
    { value: 'manual', label: 'Manual Input' },
    { value: 'whatsapp', label: 'WhatsApp Message' },
    { value: 'email', label: 'Email' },
    { value: 'note', label: 'Personal Note' },
    { value: 'meeting_transcript', label: 'Meeting Transcript' },
    { value: 'web_clip', label: 'Web Clip' },
  ];

  // Function to fetch context history from the backend
  async function fetchContexts() {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await fetch(
        `http://localhost:8000/api/contexts/`, // Ensure trailing slash if your Django/DRF backend expects it
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add authorization headers if your API requires them (e.g., "Authorization": "Bearer YOUR_TOKEN")
          },
          cache: "no-store", // Ensure fresh data on each fetch
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch contexts: ${response.status} - ${errorData.detail || response.statusText}`);
      }

      const data = await response.json();
      if (data && Array.isArray(data)) {
        // Map the backend data structure to what the frontend expects
        // Assuming backend provides { id, content, timestamp, source_type ... }
        const mappedHistory = data.map(item => ({
          id: item.id,
          text: item.content, // Map 'content' from API to 'text' for UI display
          timestamp: item.timestamp,
          source_type: item.source_type || 'unknown', // Include source_type in history, default to 'unknown' if not provided
        })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by newest first
        setContextHistory(mappedHistory);
      } else {
        setContextHistory([]); // Handle empty or unexpected response
      }
    } catch (err) {
      console.error("Error fetching contexts:", err);
      setError(`Failed to load context history: ${err.message}. Please ensure your backend is running on port 8000 and CORS is configured.`);
      setContextHistory([]);
    } finally {
      setLoading(false);
    }
  }

  // Initial fetch on component mount
  useEffect(() => {
    fetchContexts();
  }, []); // Empty dependency array means this runs once on mount

  const handleSubmitContext = async () => {
    if (!currentContextInput.trim()) {
      alert('Please enter some context before submitting.');
      return;
    }

    setSubmitting(true);
    setError(null); // Clear previous errors
    try {
      const response = await fetch(
        `http://localhost:8000/api/contexts/`, // POST to the contexts endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add authorization headers if your API requires them
          },
          body: JSON.stringify({
            content: currentContextInput.trim(),
            source_type: selectedSourceType, // Use the selected source type from the dropdown
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to submit context: ${response.status} - ${errorData.detail || response.statusText}`);
      }
      await fetchContexts();
      setCurrentContextInput(''); // Clear input field
      setSelectedSourceType('manual'); // Reset source type to default
      alert('Context submitted successfully!'); // Provide user feedback
    } catch (err) {
      console.error("Error submitting context:", err);
      setError(`Failed to submit context: ${err.message}.`);
    } finally {
      setSubmitting(false); // Stop submission loading indicator
    }
  };

  const handleClearContextInput = () => { // Clears the input and resets the source type
    setCurrentContextInput('');
    setSelectedSourceType('manual');
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Daily Context Input</h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <label htmlFor="contextInput" className="block text-gray-700 text-sm font-bold mb-2">
            Paste or type your daily messages, emails, notes here:
          </label>
          <textarea
            id="contextInput"
            rows="10"
            value={currentContextInput}
            onChange={(e) => setCurrentContextInput(e.target.value)}
            placeholder="e.g., 'Email from boss: new project due next Friday. Meeting notes from client call...' "
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            disabled={submitting} // Disable textarea during submission
          ></textarea>

          <div className="mt-4">
            <label htmlFor="sourceType" className="block text-gray-700 text-sm font-bold mb-2">
              Source Type:
            </label>
            <select
              id="sourceType"
              name="sourceType"
              value={selectedSourceType}
              onChange={(e) => setSelectedSourceType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
              disabled={submitting} // Disable dropdown during submission
            >
              {sourceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={handleClearContextInput}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
              disabled={submitting}
            >
              Clear Input
            </button>
            <button
              onClick={handleSubmitContext}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Context'}
            </button>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Context History</h2>

        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error! </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600 py-8">Loading context history...</p>
        ) : (
          <div className="space-y-4">
            {contextHistory.length > 0 ? (
              contextHistory.map(entry => (
                <div key={entry.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">
                    Submitted on: {new Date(entry.timestamp).toLocaleString('en-IN', {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit', hour12: true,
                      timeZone: 'Asia/Kolkata' // Explicitly set for your location
                    })}
                    {entry.source_type && (
                      <span className="ml-3 px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full capitalize">
                        {entry.source_type.replace(/_/g, ' ')} {/* Formats source_type for display */}
                      </span>
                    )}
                  </p>
                  <p className="text-gray-700">{entry.text}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No context history yet. Submit some context above!</p>
            )}
          </div>
        )}
      </main>
    </>
  );
}