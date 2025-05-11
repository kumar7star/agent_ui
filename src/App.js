import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ChatPanel from './components/ChatPanel';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [uploadStatus, setUploadStatus] = useState(null); // null, 'uploading', or 'uploaded'
  const [selectedFile, setSelectedFile] = useState(null);
  const chatPanelRef = useRef(null);

  // Function to handle file upload status changes
  const handleFileUpload = (status, file = null) => {
    setUploadStatus(status);
    if (file) {
      setSelectedFile(file);
    }
    // Ensure chat panel is open when uploading
    if (status && !isChatOpen) {
      setIsChatOpen(true);
    }
  };

  // Function to handle sending a specific message
  const handleSendMessage = (messageText) => {
    if (chatPanelRef.current && chatPanelRef.current.sendMessage) {
      chatPanelRef.current.sendMessage(messageText);
      // Ensure chat panel is open when sending a message
      if (!isChatOpen) {
        setIsChatOpen(true);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-gray-800 flex items-center px-4 border-b border-gray-700">
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">Norgren</span>
            <div className="bg-white text-black px-3 py-1 rounded-md flex items-center mr-2">
              <span>New Task</span>
              <span className="ml-2 text-gray-500">×</span>
            </div>
            <button className="text-gray-400 ml-2">+</button>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <button className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-sm">👤</span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto relative">
          <MainContent 
            onFileUpload={handleFileUpload} 
            onSendMessage={handleSendMessage}
          />
          {isChatOpen && (
            <div className="absolute top-0 right-0 w-80 h-full">
              <ChatPanel 
                ref={chatPanelRef}
                onClose={() => setIsChatOpen(false)} 
                uploadStatus={uploadStatus}
                selectedFile={selectedFile}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
