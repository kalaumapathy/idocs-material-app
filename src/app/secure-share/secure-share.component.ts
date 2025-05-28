import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secure-share',
  standalone: false,
  templateUrl: './secure-share.component.html',
  styleUrls: ['./secure-share.component.scss']
})
export class SecureShareComponent {
  shareLink: string = 'https://idocs.app/share/xyz123abc';
  requirePasscode: boolean = false;
  passcode: string = '';
  recipientEmail: string = '';
  selectedPermission: string = 'view'; // 'view', 'comment', 'edit'

  constructor(private router: Router) {}

  goBackToFiles(): void {
    this.router.navigate(['/files']);
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.shareLink).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy link. Please copy manually.');
    });
  }

  addRecipient(): void {
    if (this.recipientEmail.trim()) {
      alert(`Recipient added: ${this.recipientEmail}`);
      this.recipientEmail = '';
    }
  }

  shareDocument(): void {
    alert('Document sharing initiated!');
    // Implement actual sharing logic here
  }
}
