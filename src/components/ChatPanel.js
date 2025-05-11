import React, { useState, forwardRef, useImperativeHandle } from 'react';

const ChatPanel = forwardRef(({ onClose, uploadStatus, selectedFile }, ref) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('claude-3-opus-20240229');
  const [showModelSelector, setShowModelSelector] = useState(false);
  
  // Available AI models
  const aiModels = [
    { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', provider: 'Anthropic' },
    { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
    { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', provider: 'Anthropic' },
    { id: 'llama3-70b-8192', name: 'Llama 3 70B', provider: 'Groq' },
    { id: 'llama3-8b-8192', name: 'Llama 3 8B', provider: 'Groq' },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', provider: 'Groq' }
  ];
  
  // Function to send message to API
  const sendMessage = async (customMessage = null) => {
    const messageToSend = customMessage || message;
    if (!messageToSend.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: messageToSend
    };
    
    setChatMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    try {
      // Prepare the request body
      const requestBody = {
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: messageToSend
              }
            ]
          }
        ],
        model: selectedModel
      };
      
      // Send the request to the API
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT || ''}/api/ai/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }
      
      const data = await response.json();
      
      // Add assistant response to chat
      if (data.success && data.data && data.data.content) {
        const assistantMessage = {
          role: 'assistant',
          content: data.data.content
        };
        
        setChatMessages(prevMessages => [...prevMessages, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      setChatMessages(prevMessages => [
        ...prevMessages, 
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your request. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
      setMessage(''); // Clear input field
    }
  };

  // Expose the sendMessage function to parent components
  useImperativeHandle(ref, () => ({
    sendMessage: (customMessage) => sendMessage(customMessage)
  }));
  
  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  // Toggle model selector
  const toggleModelSelector = () => {
    setShowModelSelector(!showModelSelector);
  };
  
  // Select a model
  const selectModel = (modelId) => {
    setSelectedModel(modelId);
    setShowModelSelector(false);
  };
  
  // Get current model name
  const getCurrentModelName = () => {
    const model = aiModels.find(m => m.id === selectedModel);
    return model ? model.name : 'Select Model';
  };
  
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

  // Function to render chat messages
  const renderChatMessages = () => {
    if (chatMessages.length === 0) {
      // Show welcome message if no messages and no upload status
      if (!uploadStatus) {
        return (
          <div className="bg-gray-700 rounded-lg p-3 mb-4">
            <p className="text-sm">
              Hello, I'm Analyst Sam. How may I assist you today?
            </p>
          </div>
        );
      }
      return null;
    }
    
    return chatMessages.map((msg, index) => (
      <div 
        key={index} 
        className={`mb-4 ${msg.role === 'user' ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'}`}
      >
        <div className={`rounded-lg p-3 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
          <p className="text-sm">{typeof msg.content === 'string' ? msg.content : msg.content}</p>
        </div>
      </div>
    ));
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
              <button onClick={toggleModelSelector} className="ml-1 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </h3>
            <div className="text-xs text-gray-400">{getCurrentModelName()}</div>
            
            {/* Model Selector Dropdown */}
            {showModelSelector && (
              <div className="absolute mt-1 bg-gray-700 rounded-md shadow-lg z-10 w-64">
                <div className="py-1">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 border-b border-gray-600">Select AI Model</div>
                  {aiModels.map((model) => (
                    <button
                      key={model.id}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-600 ${selectedModel === model.id ? 'bg-gray-600' : ''}`}
                      onClick={() => selectModel(model.id)}
                    >
                      <div>{model.name}</div>
                      <div className="text-xs text-gray-400">{model.provider}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
        {/* Upload status message */}
        {renderUploadStatus()}
        
        {/* Chat messages */}
        {renderChatMessages()}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center my-4">
            <div className="animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        )}
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
            onKeyPress={handleKeyPress}
          />
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300"
            onClick={sendMessage}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

export default ChatPanel;
