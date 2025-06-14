import React, { useState } from 'react';
import { Save, Eye, EyeOff, ExternalLink, AlertCircle } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { AI_PROVIDERS, AIProvider } from '../../types/chat';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Card from '../UI/Card';

interface ChatSettingsProps {
  onClose: () => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({ onClose }) => {
  const { settings, updateSettings } = useChat();
  const [localSettings, setLocalSettings] = useState(settings);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const selectedProvider = AI_PROVIDERS.find(p => p.id === localSettings.provider);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      updateSettings(localSettings);
      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 500);
    } catch (error) {
      setIsSaving(false);
    }
  };

  const handleProviderChange = (providerId: string) => {
    const provider = AI_PROVIDERS.find(p => p.id === providerId);
    if (provider) {
      setLocalSettings(prev => ({
        ...prev,
        provider: provider.id,
        model: provider.models[0],
        customEndpoint: provider.endpoint || prev.customEndpoint
      }));
    }
  };

  const getProviderInstructions = (provider: AIProvider) => {
    switch (provider.id) {
      case 'openai':
        return {
          title: 'OpenAI Setup',
          steps: [
            'Visit https://platform.openai.com/api-keys',
            'Sign in to your OpenAI account',
            'Click "Create new secret key"',
            'Copy the API key and paste it below'
          ],
          link: 'https://platform.openai.com/api-keys'
        };
      case 'anthropic':
        return {
          title: 'Anthropic Setup',
          steps: [
            'Visit https://console.anthropic.com/',
            'Sign in to your Anthropic account',
            'Go to API Keys section',
            'Create a new API key and copy it'
          ],
          link: 'https://console.anthropic.com/'
        };
      case 'custom':
        return {
          title: 'Custom API Setup',
          steps: [
            'Enter your custom API endpoint URL',
            'Add your API key if required',
            'Ensure your endpoint accepts OpenAI-compatible requests'
          ],
          link: null
        };
      default:
        return null;
    }
  };

  const instructions = selectedProvider ? getProviderInstructions(selectedProvider) : null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Provider Configuration</h3>
        <p className="text-sm text-slate-600">
          Configure your preferred AI provider to enable the chat assistant.
        </p>
      </div>

      {/* Provider Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Choose AI Provider
        </label>
        <div className="grid grid-cols-1 gap-3">
          {AI_PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleProviderChange(provider.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                localSettings.provider === provider.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">{provider.name}</h4>
                  <p className="text-sm text-slate-600">
                    {provider.models.length} model{provider.models.length > 1 ? 's' : ''} available
                  </p>
                </div>
                {provider.apiKeyRequired && (
                  <div className="text-xs text-slate-500">API Key Required</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Setup Instructions */}
      {instructions && (
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-2">{instructions.title}</h4>
              <ol className="text-sm text-blue-800 space-y-1 mb-3">
                {instructions.steps.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="mr-2">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              {instructions.link && (
                <a
                  href={instructions.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  Open Provider Dashboard
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Model Selection */}
      {selectedProvider && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Model
          </label>
          <select
            value={localSettings.model}
            onChange={(e) => setLocalSettings(prev => ({ ...prev, model: e.target.value }))}
            className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {selectedProvider.models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Custom Endpoint */}
      {localSettings.provider === 'custom' && (
        <Input
          label="Custom API Endpoint"
          type="url"
          value={localSettings.customEndpoint || ''}
          onChange={(e) => setLocalSettings(prev => ({ ...prev, customEndpoint: e.target.value }))}
          placeholder="https://your-api-endpoint.com/v1/chat/completions"
          helperText="Enter the full URL to your custom API endpoint"
        />
      )}

      {/* API Key */}
      {(selectedProvider?.apiKeyRequired || localSettings.provider === 'custom') && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            API Key {selectedProvider?.apiKeyRequired && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={localSettings.apiKey}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, apiKey: e.target.value }))}
              placeholder={`Enter your ${selectedProvider?.name} API key`}
              className="block w-full px-3 py-2 pr-10 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Your API key is stored locally in your browser and never sent to our servers.
          </p>
        </div>
      )}

      {/* Advanced Settings */}
      <div className="space-y-4">
        <h4 className="font-medium text-slate-900">Advanced Settings</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Temperature
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={localSettings.temperature}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Focused</span>
              <span>{localSettings.temperature}</span>
              <span>Creative</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Max Tokens
            </label>
            <input
              type="number"
              min="100"
              max="4000"
              step="100"
              value={localSettings.maxTokens}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
              className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4 border-t border-slate-200">
        <Button
          onClick={handleSave}
          loading={isSaving}
          className="flex-1"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isSaving}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ChatSettings;