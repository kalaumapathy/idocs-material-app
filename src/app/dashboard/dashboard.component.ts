import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  navigateTo(path: string, fragment?: string): void {
    if (fragment) {
      this.router.navigate([path], { fragment: fragment });
    } else {
      this.router.navigate([path]);
    }
  }
}
