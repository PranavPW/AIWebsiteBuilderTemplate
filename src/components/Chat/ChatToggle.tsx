import React from 'react';
import { MessageCircle, X, AlertCircle } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

const ChatToggle: React.FC = () => {
  const { isOpen, toggleChat, isConfigured } = useChat();

  return (
    <button
      onClick={toggleChat}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-40 flex items-center justify-center ${
        isOpen
          ? 'bg-slate-600 hover:bg-slate-700 transform rotate-180'
          : 'bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:scale-110'
      }`}
    >
      {isOpen ? (
        <X className="w-6 h-6 text-white" />
      ) : (
        <MessageCircle className="w-6 h-6 text-white" />
      )}
      
      {/* Status indicator */}
      {!isOpen && (
        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
          isConfigured ? 'bg-green-500' : 'bg-orange-500'
        }`}>
          {isConfigured ? (
            <span className="text-xs text-white font-bold">AI</span>
          ) : (
            <AlertCircle className="w-2.5 h-2.5 text-white" />
          )}
        </div>
      )}
    </button>
  );
};

export default ChatToggle;