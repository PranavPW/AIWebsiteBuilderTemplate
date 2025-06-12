export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  isLoading?: boolean;
}

export interface ChatContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  toggleChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  settings: ChatSettings;
  updateSettings: (settings: Partial<ChatSettings>) => void;
  isConfigured: boolean;
}

export interface AIProvider {
  id: 'openai' | 'anthropic' | 'custom';
  name: string;
  models: string[];
  apiKeyRequired: boolean;
  endpoint?: string;
}

export interface ChatSettings {
  provider: 'openai' | 'anthropic' | 'custom';
  model: string;
  apiKey: string;
  customEndpoint?: string;
  temperature: number;
  maxTokens: number;
}

export const AI_PROVIDERS: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    apiKeyRequired: true,
    endpoint: 'https://api.openai.com/v1/chat/completions'
  },
  {
    id: 'anthropic',
    name: 'Anthropic (Claude)',
    models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
    apiKeyRequired: true,
    endpoint: 'https://api.anthropic.com/v1/messages'
  },
  {
    id: 'custom',
    name: 'Custom API',
    models: ['custom-model'],
    apiKeyRequired: false
  }
];