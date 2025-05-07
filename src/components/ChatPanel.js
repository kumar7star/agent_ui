import React, { useState } from 'react';

function ChatPanel({ onClose, uploadStatus, selectedFile }) {
  const [message, setMessage] = useState('');
  
  const tools = [
    { name: 'Google Search', icon: 'G', color: 'bg-white' },
    { name: 'Research w/LinkedIn', icon: 'in', color: 'bg-blue-600' },
    { name: 'Gartner LLM', icon: 'G', color: 'bg-purple-600' },
    { name: 'Dun & Bradstreet', icon: 'D&B', color: 'bg-blue-400' },
    { name: 'Tracan LLM', icon: 'T', color: 'bg-gray-600' },
    { name: 'Website Scraper', icon: 'WS', color: 'bg-blue-300' }
  ];

  // Function to render file icon based on file type
  const getFileIcon = () => {
    if (!selectedFile) return null;
    
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    
    if (['pdf'].includes(fileExtension)) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else if (['doc', 'docx'].includes(fileExtension)) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
  };

  // Render upload status message
  const renderUploadStatus = () => {
    if (!uploadStatus || !selectedFile) return null;

    if (uploadStatus === 'uploading') {
      return (
        <div className="bg-gray-700 rounded-lg p-3 mb-4">
          <p className="text-sm mb-2">Document is uploading</p>
          <div className="flex items-center bg-gray-800 rounded-lg p-2">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              {getFileIcon()}
            </div>
            <div>
              <p className="text-sm font-medium">{selectedFile.name}</p>
            </div>
          </div>
        </div>
      );
    } else if (uploadStatus === 'uploaded') {
      return (
        <div className="bg-gray-700 rounded-lg p-3 mb-4">
          <p className="text-sm mb-2">Document is uploaded</p>
          <div className="mb-2">
            <div className="flex items-center bg-gray-800 rounded-lg p-2 mb-1">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                {getFileIcon()}
              </div>
              <div>
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-gray-400">Uploaded on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <button className="bg-transparent hover:bg-pink-900 text-pink-500 border border-pink-500 rounded-full py-2 px-4 text-sm transition-colors">
              Create a Proposal
            </button>
            <button className="bg-transparent hover:bg-pink-900 text-pink-500 border border-pink-500 rounded-full py-2 px-4 text-sm transition-colors">
              Create Data Analysis Plan
            </button>
            <button className="bg-transparent hover:bg-pink-900 text-pink-500 border border-pink-500 rounded-full py-2 px-4 text-sm transition-colors">
              Create Development Plan
            </button>
          </div>
        </div>
      );
    }
    
    return null;
  };

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
        {/* Welcome message (only show if no upload status) */}
        {!uploadStatus && (
          <div className="bg-gray-700 rounded-lg p-3 mb-4">
            <p className="text-sm">
              Hello, I'm Analyst Sam. How may I assist you today?
            </p>
          </div>
        )}
        
        {/* Upload status message */}
        {renderUploadStatus()}
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
