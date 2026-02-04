"use client";

import { useState } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm your Stack Learn Assistant. Select a topic to get started.",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickOptions = [
    "Study Abroad Enquiry",
    "Training Support",
    "Visa Assistance",
    "Scholarship Details",
    "Talk to an Expert",
  ];

  const handleQuickOption = (option: string) => {
    const botResponse =
      option === "Talk to an Expert"
        ? "Great! I'll connect you with our expert counsellor. Please share your name and mobile number."
        : `Thanks for your interest in ${option}. Can you please share your name and preferred destination country?`;
    setMessages([
      ...messages,
      { text: option, sender: "user" },
      { text: botResponse, sender: "bot" },
    ]);
  };

  const handleSend = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thank you for your message. Our team will get back to you shortly!",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-brand text-white rounded-full shadow-2xl hover:shadow-brand/50 hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center animate-float"
        aria-label="Open chat"
      >
        <FiMessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-lg shadow-2xl z-50 flex flex-col md:hidden lg:flex">
          {/* Header */}
          <div className="bg-brand text-white p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Hi 👋 Welcome to Stack Learn</h3>
              <p className="text-sm opacity-90">How can we help you today?</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-brand text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick Options */}
            {messages.length === 1 && (
              <div className="space-y-2">
                {quickOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickOption(option)}
                    className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-primary-50 rounded-lg text-sm transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t bg-gray-50 p-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-sm bg-white"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2.5 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors flex-shrink-0"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
            <a
              href="https://wa.me/919606031842"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-bold shadow-md hover:shadow-lg"
            >
              <FaWhatsapp className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Mobile Full Screen Chat */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col lg:hidden">
          <div className="bg-brand text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Hi 👋 Welcome to Stack Learn</h3>
              <p className="text-sm opacity-90">How can we help you today?</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-brand text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="space-y-2">
                {quickOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickOption(option)}
                    className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-primary-50 rounded-lg text-sm"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="border-t bg-gray-50 p-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand text-sm bg-white"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2.5 bg-brand text-white rounded-lg flex-shrink-0"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
            <a
              href="https://wa.me/919606031842"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg"
            >
              <FaWhatsapp className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
