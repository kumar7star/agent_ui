import React, { useState } from 'react';

function ChatPanel({ onClose }) {
  const [message, setMessage] = useState('');
  
  const tools = [
    { name: 'Google Search', icon: 'G', color: 'bg-white' },
    { name: 'Research w/LinkedIn', icon: 'in', color: 'bg-blue-600' },
    { name: 'Gartner LLM', icon: 'G', color: 'bg-purple-600' },
    { name: 'Dun & Bradstreet', icon: 'D&B', color: 'bg-blue-400' },
    { name: 'Tracan LLM', icon: 'T', color: 'bg-gray-600' },
    { name: 'Website Scraper', icon: 'WS', color: 'bg-blue-300' }
  ];

  return (
    <div className="bg-gray-800 h-full flex flex-col border-l border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
            <span className="text-white text-sm">👤</span>
          </div>
          <div>
            <h3 className="font-medium flex items-center">
              Analyst Sam
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Tools */}
      <div className="p-4 border-b border-gray-700">
        <div className="grid grid-cols-3 gap-2">
          {tools.map((tool, index) => (
            <button 
              key={index} 
              className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <div className={`w-6 h-6 rounded-md ${tool.color} flex items-center justify-center mr-2 text-xs`}>
                {tool.icon}
              </div>
              <span className="text-xs whitespace-nowrap overflow-hidden overflow-ellipsis">{tool.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-gray-700 rounded-lg p-3 mb-4">
          <p className="text-sm">
            Hello, I'm Analyst Sam. How may I assist you today?
          </p>
        </div>
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-gray-700 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type something"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPanel;
