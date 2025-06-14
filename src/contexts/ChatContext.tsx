import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChatMessage, ChatContextType, ChatSettings } from '../types/chat';
import { chatService } from '../services/chatService';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const STORAGE_KEY = 'chat_settings';

const defaultSettings: ChatSettings = {
  provider: 'openai',
  model: 'gpt-3.5-turbo',
  apiKey: '',
  temperature: 0.7,
  maxTokens: 1000
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hi! I'm your AI assistant. I can help you modify and enhance this React template. To get started, please configure your AI provider settings by clicking the settings icon.",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY);
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
        chatService.updateSettings({ ...defaultSettings, ...parsed });
      }
    } catch (error) {
      console.error('Failed to load chat settings:', error);
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      chatService.updateSettings(settings);
    } catch (error) {
      console.error('Failed to save chat settings:', error);
    }
  }, [settings]);

  const isConfigured = Boolean(settings.apiKey || settings.provider === 'custom');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const updateSettings = (newSettings: Partial<ChatSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const sendMessage = async (content: string): Promise<void> => {
    if (!isConfigured) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Please configure your AI provider settings first by clicking the settings icon.",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(content, messages);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : "I'm sorry, I encountered an error. Please check your API configuration and try again.",
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hi! I'm your AI assistant. I can help you modify and enhance this React template. What would you like to change or add?",
        role: 'assistant',
        timestamp: new Date()
      }
    ]);
  };

  const value: ChatContextType = {
    messages,
    isOpen,
    isLoading,
    toggleChat,
    sendMessage,
    clearChat,
    settings,
    updateSettings,
    isConfigured
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};