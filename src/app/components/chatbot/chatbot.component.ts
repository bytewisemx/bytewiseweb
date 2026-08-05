import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  isOpen = false;
  isLoading = false;
  userInput = '';
  sessionId = '';
  
  webhookUrl = 'https://n8n-n8n.bg5sbc.easypanel.host/webhook/0da8393d-57aa-4682-b391-35f212495148';

  messages: ChatMessage[] = [];

  quickPrompts = [
    '¿Qué soluciones de ciberseguridad ofrecen?',
    '¿Cómo me apoya la Norma ISO 27001?',
    'Quiero solicitar una auditoría gratuita'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Generar ID de sesión único
    this.sessionId = 'session_' + Math.random().toString(36).substring(2, 11);
    
    // Mensaje de bienvenida inicial
    this.messages.push({
      id: 'msg_welcome',
      sender: 'bot',
      text: '¡Hola! Soy el asistente inteligente de **ByteWise**. ¿En qué puedo ayudarte a blindar tu infraestructura o impulsar tu TI hoy?',
      timestamp: new Date()
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
  }

  closeChatbot() {
    this.isOpen = false;
  }

  sendQuickPrompt(promptText: string) {
    this.userInput = promptText;
    this.sendMessage();
  }

  sendMessage() {
    const trimmed = this.userInput.trim();
    if (!trimmed || this.isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date()
    };

    this.messages.push(userMsg);
    this.userInput = '';
    this.isLoading = true;

    // Enviar al webhook n8n con compatibilidad para sessionId y sessionKey
    const payload = {
      chatInput: trimmed,
      message: trimmed,
      sessionId: this.sessionId,
      sessionKey: this.sessionId,
      session_id: this.sessionId,
      action: 'sendMessage'
    };

    this.http.post(this.webhookUrl, payload, { responseType: 'text' }).subscribe({
      next: (rawResponse: string) => {
        this.isLoading = false;
        let replyText = 'Gracias por escribirnos. Tu mensaje ha sido recibido por nuestro motor de IA.';

        if (rawResponse) {
          try {
            const parsed = JSON.parse(rawResponse);
            if (typeof parsed === 'string') {
              replyText = parsed;
            } else if (Array.isArray(parsed) && parsed[0]) {
              const item = parsed[0];
              if (typeof item === 'string') replyText = item;
              else if (item.producción) replyText = item.producción;
              else if (item.production) replyText = item.production;
              else if (item.output) replyText = typeof item.output === 'string' ? item.output : JSON.stringify(item.output);
              else if (item.text) replyText = typeof item.text === 'string' ? item.text : JSON.stringify(item.text);
              else if (item.json?.output) replyText = item.json.output;
              else if (typeof item === 'object') {
                const vals = Object.values(item);
                if (vals.length > 0 && typeof vals[0] === 'string') replyText = vals[0] as string;
                else replyText = JSON.stringify(item);
              }
            } else if (typeof parsed === 'object') {
              if (parsed.producción) replyText = parsed.producción;
              else if (parsed.production) replyText = parsed.production;
              else if (parsed.output) replyText = typeof parsed.output === 'string' ? parsed.output : JSON.stringify(parsed.output);
              else if (parsed.response) replyText = typeof parsed.response === 'string' ? parsed.response : JSON.stringify(parsed.response);
              else if (parsed.text) replyText = typeof parsed.text === 'string' ? parsed.text : JSON.stringify(parsed.text);
              else {
                const vals = Object.values(parsed);
                if (vals.length > 0 && typeof vals[0] === 'string') replyText = vals[0] as string;
                else replyText = JSON.stringify(parsed);
              }
            }
          } catch (e) {
            // Si es respuesta de texto plano puro
            replyText = rawResponse;
          }
        }

        this.messages.push({
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: replyText,
          timestamp: new Date()
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al conectar con el asistente n8n:', error);
        this.messages.push({
          id: 'bot_err_' + Date.now(),
          sender: 'bot',
          text: 'Hemos recibido tu consulta. Para una atención directa, también puedes completar el formulario de contacto o enviarnos un WhatsApp.',
          timestamp: new Date()
        });
      }
    });
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }
}
