import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../service/chat.service';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}



@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./chat.component.scss'],
  providers: [DatePipe]
})
export class ChatComponent implements OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  private datePipe = inject(DatePipe); // Inject DatePipe

  messages: Message[] = [];
  userInput = '';
  isTyping = false;
  isMinimized = true;
  isExpanded = false;
  userName = '';

  constructor(
    private service:ChatService
  ){

  }
  
  private questions = [
    "What's your name?",
    "Do you have any specific questions about my Resume?"
  ];
  
  private currentQuestionIndex = 0;

  // Add method to format time
  formatTime(date: Date): string {
    return this.datePipe.transform(date, 'shortTime') || '';
  }

  ngOnInit() {
    // Initial greeting when component loads (but minimized)
    this.addBotMessage("Hello! I'm AI assistant. Chat code was completed generated using AI and still Dev is in progress.");
  }

  toggleChat() {
    this.isMinimized = !this.isMinimized;
    if (!this.isMinimized) {
      // Auto-start conversation when opened
      setTimeout(() => {
        if (this.messages.length <= 1) { // Only has initial greeting
          this.addBotMessage(this.questions[this.currentQuestionIndex]);
        }
      }, 500);
    }
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  closeChat() {
    this.isMinimized = true;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.addUserMessage(this.userInput);
    const userMessage = this.userInput;
    this.userInput = '';
    
    this.isTyping = true;
    
    setTimeout(() => {
      this.isTyping = false;
      this.processUserResponse(userMessage);
    }, 1000);
  }

  private processUserResponse(userMessage: string) {

    // ✅ STEP 1: NAME STEP → Call GREET API
    if (this.currentQuestionIndex === 0) {
  
      this.userName = userMessage;
  
      this.service.greet(userMessage).subscribe({
        next: (response) => {
          // ✅ Show greeting first
          this.addBotMessage(response.message);
  
          // ✅ Then move to next question
          this.currentQuestionIndex = 1;
          this.addBotMessage(this.questions[this.currentQuestionIndex]);
        },
        error: () => {
          this.addBotMessage("Ehhhh, something went wrong.");
        }
      });
  
      return; // ✅ STOP EXECUTION HERE
    }
  
    // ✅ STEP 2: RESUME QUESTION STEP
    if (this.currentQuestionIndex === 1) {
  
      this.service.resumeQuestion(userMessage).subscribe({
        next: (response) => {
          this.addBotMessage(response.message);
        },
        error: () => {
          this.addBotMessage("Ehhhh, something went wrong.");
        }
      });
  
      return; // ✅ STOP EXECUTION HERE
    }
  
    // ✅ FINAL FALLBACK
    this.addBotMessage("Thank you for the conversation!");
  }
  

  private addUserMessage(text: string) {
    this.messages.push({
      text,
      isUser: true,
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  private addBotMessage(text: string) {
    this.messages.push({
      text,
      isUser: false,
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.chatContainer) {
          this.chatContainer.nativeElement.scrollTop = 
            this.chatContainer.nativeElement.scrollHeight;
        }
      }, 100);
    } catch(err) { }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  // Close chat when clicking outside (optional)
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const chatElement = document.querySelector('.chat-widget');
    if (chatElement && !chatElement.contains(event.target as Node)) {
      // Optional: Close when clicking outside
      // this.isMinimized = true;
    }
  }
}