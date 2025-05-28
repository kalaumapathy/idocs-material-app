import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-viewer',
  standalone: false,
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent {
  constructor(private router: Router) {}

  goBackToFiles(): void {
    this.router.navigate(['/files']);
  }
}
