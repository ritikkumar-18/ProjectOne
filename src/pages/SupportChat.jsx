import React, { useState, useEffect, useRef } from 'react';
import { TbSend2 } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';

const SupportChat = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { 
      sender: 'support', 
      text: 'Hello! How can I assist you today?', 
      timestamp: new Date().toISOString()
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Simulated support responses
  const supportResponses = [
    "I am here to help you! How can I assist?",
    "Could you please provide more details?",
    "Let me check that for you. One moment, please!",
    "Thank you for reaching out! Let's solve this together.",
    "Have you tried restarting the device?",
    "I'll escalate this to our technical team for further assistance.",
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newMessage = { 
      sender: 'user', 
      text: message, 
      timestamp: new Date().toISOString() 
    };
    setChatMessages([...chatMessages, newMessage]);
    setMessage('');

    // Simulate support typing and response
    setIsTyping(true);
    setTimeout(() => {
      const randomResponse = supportResponses[Math.floor(Math.random() * supportResponses.length)];
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { 
          sender: 'support', 
          text: randomResponse, 
          timestamp: new Date().toISOString() 
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCloseChat = () => {
    navigate("/");
  };

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  useEffect(() => {
      // Ensure the scroll happens after the component mounts
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
      const timer = setTimeout(scrollToTop, 0);
      return () => clearTimeout(timer);
    }, []);

  // Format timestamp to a readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      {/* Chat Header */}
      <div className="bg-indigo-600 text-white p-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaRobot className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-semibold">Support Chat</h1>
            <p className="text-sm opacity-80">We're here to help you!</p>
          </div>
        </div>
        <button
          onClick={handleCloseChat}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <IoCloseCircleSharp size={28} />
        </button>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-6 bg-white/90 backdrop-blur-sm">
        <div className="space-y-4">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`relative max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-xs mt-1 opacity-70">
                  {formatTimestamp(msg.timestamp)}
                </span>
                {/* Message Tail */}
                <div
                  className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 ${
                    msg.sender === 'user' 
                      ? 'right-0 -mr-2 rotate-45 bg-indigo-500' 
                      : 'left-0 -ml-2 -rotate-45 bg-gray-100'
                  }`}
                />
              </div>
            </div>
          ))}
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-2 shadow-sm">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white p-4 border-t border-gray-200 shadow-inner">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-400"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white p-3 rounded-full hover:bg-indigo-600 transition-colors disabled:bg-gray-400"
            disabled={message.trim() === ''}
          >
            <TbSend2 size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportChat;