import { ChatMessage, ChatSettings } from '../types/chat';

class ChatService {
  private settings: ChatSettings = {
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    apiKey: '',
    temperature: 0.7,
    maxTokens: 1000
  };

  async sendMessage(content: string, previousMessages: ChatMessage[]): Promise<string> {
    if (!this.settings.apiKey && this.settings.provider !== 'custom') {
      throw new Error('API key not configured. Please set your API key in the chat settings.');
    }

    const systemPrompt = `You are an AI assistant helping users modify and enhance a React authentication template. 
    The template includes:
    - React with TypeScript
    - Tailwind CSS for styling
    - React Router for navigation
    - Authentication system with login/register
    - Protected routes
    - User dashboard, profile, and settings pages
    - Responsive design with light theme
    - AI chat sidebar (current feature)
    
    When users ask for modifications, provide clear, actionable advice and code examples. 
    Focus on practical improvements and best practices. Be concise but helpful.
    If they ask for code changes, provide the exact code they need to implement.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...previousMessages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content }
    ];

    try {
      switch (this.settings.provider) {
        case 'openai':
          return await this.callOpenAI(messages);
        case 'anthropic':
          return await this.callAnthropic(messages);
        case 'custom':
          return await this.callCustomEndpoint(messages);
        default:
          throw new Error('Invalid AI provider configured');
      }
    } catch (error) {
      console.error('Chat service error:', error);
      throw error;
    }
  }

  private async callOpenAI(messages: any[]): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.settings.apiKey}`
      },
      body: JSON.stringify({
        model: this.settings.model,
        messages,
        temperature: this.settings.temperature,
        max_tokens: this.settings.maxTokens
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      throw new Error(error.error?.message || `OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response received';
  }

  private async callAnthropic(messages: any[]): Promise<string> {
    // Convert messages format for Anthropic
    const systemMessage = messages.find(m => m.role === 'system');
    const conversationMessages = messages.filter(m => m.role !== 'system');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.settings.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.settings.model,
        max_tokens: this.settings.maxTokens,
        system: systemMessage?.content,
        messages: conversationMessages
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      throw new Error(error.error?.message || `Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0]?.text || 'No response received';
  }

  private async callCustomEndpoint(messages: any[]): Promise<string> {
    if (!this.settings.customEndpoint) {
      throw new Error('Custom endpoint not configured');
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (this.settings.apiKey) {
      headers['Authorization'] = `Bearer ${this.settings.apiKey}`;
    }

    const response = await fetch(this.settings.customEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        messages,
        temperature: this.settings.temperature,
        max_tokens: this.settings.maxTokens
      })
    });

    if (!response.ok) {
      throw new Error(`Custom API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || data.content || data.message || 'No response received';
  }

  updateSettings(newSettings: Partial<ChatSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
  }

  getSettings(): ChatSettings {
    return { ...this.settings };
  }
}

export const chatService = new ChatService();