import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { MatButton } from '@angular/material/button';

interface ChatMessage {
  text: string;
  isUser: boolean;
  source?: string;
}

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('chatMessagesContainer') private chatMessagesContainer!: ElementRef;

  messages: ChatMessage[] = [
    { text: 'Hello! How can I help you with your documents today?', isUser: false },
    { text: 'Summarize the Q3 report.', isUser: true },
    { text: 'The Q3 report (Source 1: Quarterly Report.docx) highlights a 15% increase in user engagement and successful completion of Project Phoenix. Key challenges include...', isUser: false, source: 'Quarterly Report.docx' },
    { text: 'What are the key risks in Project Alpha?', isUser: true },
    { text: 'Based on Project Alpha Proposal.pdf (Source 2), the key risks identified are potential budget overruns, resource allocation conflicts, and dependency on third-party vendor timelines.', isUser: false, source: 'Project Alpha Proposal.pdf' }
  ];
  newMessage: string = '';

  constructor() { }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, isUser: true });
      this.newMessage = '';
      // Simulate bot response after a short delay
      setTimeout(() => {
        this.messages.push({ text: 'I am processing your request...', isUser: false });
        this.scrollToBottom();
      }, 500);
    }
  }

  scrollToBottom(): void {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  previewSource(source: string): void {
    alert(`Simulating preview of: ${source}`);
    // In a real app, this would navigate to a document viewer or open a modal
  }
}
