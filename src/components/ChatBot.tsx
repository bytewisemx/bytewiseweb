import { useState, useRef, useEffect } from 'react';
import { FaXmark, FaPaperPlane } from 'react-icons/fa6';
import botIcon from '../assets/boticon.png';
import './ChatBot.css';

const N8N_WEBHOOK_URL = 'https://n8n-n8n.bg5sbc.easypanel.host/webhook/0da8393d-57aa-4682-b391-35f212495148';
const REQUEST_TIMEOUT_MS = 45000;
const SESSION_STORAGE_KEY = 'bytewise-chatbot-session-id-v2';

type Message = {
  id: string;
  text: string;
  isBot: boolean;
};

type N8nResponse = {
  output?: unknown;
  message?: unknown;
  response?: unknown;
  text?: unknown;
};

const createSessionId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `bytewise-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const getInitialSessionId = () => {
  const storedSessionId = window.sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (storedSessionId) {
    return storedSessionId;
  }

  const nextSessionId = createSessionId();
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, nextSessionId);

  return nextSessionId;
};

const unwrapJsonString = (value: string): unknown => {
  const trimmedValue = value
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  if (!trimmedValue.startsWith('{') && !trimmedValue.startsWith('[')) {
    return value;
  }

  try {
    return JSON.parse(trimmedValue);
  } catch {
    return value;
  }
};

const extractJsonLikeResponse = (value: string): string | null => {
  const cleanedValue = value
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  const responseMatch = cleanedValue.match(/^\{\s*"response"\s*:\s*"([\s\S]*)"\s*\}$/);

  if (!responseMatch) {
    return null;
  }

  return responseMatch[1]
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .trim();
};

const getWebhookUrl = (sessionId: string) => {
  const url = new URL(N8N_WEBHOOK_URL);

  url.searchParams.set('sessionId', sessionId);
  url.searchParams.set('sessionKey', sessionId);

  return url.toString();
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '¡Hola! Soy el asistente virtual de ByteWise. ¿En qué te puedo ayudar hoy?', isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(getInitialSessionId);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const toggleChat = () => setIsOpen(prev => !prev);

  const extractBotResponse = (data: unknown): string => {
    if (typeof data === 'string') {
      const unwrappedData = unwrapJsonString(data);

      if (unwrappedData !== data) {
        return extractBotResponse(unwrappedData);
      }

      const jsonLikeResponse = extractJsonLikeResponse(data);

      if (jsonLikeResponse) {
        return extractBotResponse(jsonLikeResponse);
      }

      return data;
    }

    if (Array.isArray(data)) {
      const first = data[0] as N8nResponse | undefined;

      if (first && typeof first === 'object') {
        return (
          extractBotResponse(first.output) ||
          extractBotResponse(first.message) ||
          extractBotResponse(first.response) ||
          extractBotResponse(first.text) ||
          JSON.stringify(first)
        );
      }
    }

    if (typeof data === 'object' && data !== null) {
      const n8nData = data as N8nResponse;

      return (
        extractBotResponse(n8nData.output) ||
        extractBotResponse(n8nData.message) ||
        extractBotResponse(n8nData.response) ||
        extractBotResponse(n8nData.text) ||
        JSON.stringify(n8nData)
      );
    }

    return '';
  };

  const readN8nResponse = async (res: Response) => {
    const rawText = await res.text();

    if (!rawText.trim()) {
      throw new Error('n8n respondió vacío. Revisa que el nodo "Respond to Webhook" devuelva un JSON o texto.');
    }

    try {
      return JSON.parse(rawText);
    } catch {
      return rawText;
    }
  };

  const getFriendlyError = (error: unknown) => {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return 'n8n tardó demasiado en responder. El mensaje no se perdió, pero el navegador cortó la espera.';
    }

    if (error instanceof TypeError) {
      return 'No pude conectar con n8n desde el navegador. Revisa CORS, SSL o si el webhook está disponible públicamente.';
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'Ocurrió un error inesperado al recibir la respuesta del bot.';
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    const userMessage: Message = { id: Date.now().toString(), text: userText, isBot: false };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const payload = {
      sessionId,
      sessionKey: sessionId,
      session_id: sessionId,
      session_key: sessionId,
      action: 'sendMessage',
      chatInput: userText,
      message: userText,
      text: userText,
      metadata: {
        sessionId,
        sessionKey: sessionId
      }
    };

    console.log('[ChatBot] Enviando evento a n8n:', JSON.stringify(payload, null, 2));

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(getWebhookUrl(sessionId), {
        method: 'POST',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      console.log(`[ChatBot] Código de estado HTTP de n8n: ${res.status}`);

      if (!res.ok) {
        throw new Error(`Error de red HTTP: ${res.status} - ${res.statusText}`);
      }

      const rawData = await readN8nResponse(res);
      console.log('[ChatBot] Respuesta RAW recibida de n8n:', rawData);

      const botResponseText = extractBotResponse(rawData);

      setMessages(prev => [...prev, { id: Date.now().toString() + 'bot', text: botResponseText, isBot: true }]);
    } catch (error) {
      const friendlyError = getFriendlyError(error);

      console.error('[ChatBot] Error de comunicación con n8n:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString() + 'err',
        text: friendlyError,
        isBot: true
      }]);
    } finally {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className={`chatbot-window ${isOpen ? 'visible' : 'hidden'}`}>
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <img src={botIcon} alt="Asistente ByteWise" className="chatbot-logo" />
              </div>
            <div>
              <h3>Asistente ByteWise</h3>
              <span className="chatbot-status">En línea</span>
            </div>
          </div>
          <button className="chatbot-close-btn" onClick={toggleChat} aria-label="Cerrar chat">
            <FaXmark />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={msg.id + idx} className={`chatbot-message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
              <div className="chatbot-message">
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-message-wrapper bot">
              <div className="chatbot-message typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input-area" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={!input.trim() || isLoading} aria-label="Enviar mensaje">
            <FaPaperPlane />
          </button>
        </form>
      </div>

      <button className="chatbot-toggle-btn" onClick={toggleChat} aria-label="Abrir asistente">
        {isOpen ? <FaXmark /> : <img src={botIcon} alt="" className="chatbot-toggle-logo" />}
      </button>
    </div>
  );
}
