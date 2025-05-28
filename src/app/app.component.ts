import { Component, HostListener, ViewChild, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common'; // Required for *ngIf, *ngFor in standalone components

// Angular Material Modules - ALL modules used in this component's template must be imported here
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false, // <--- THIS COMPONENT IS NOW STANDALONE
  // imports: [ // <--- ALL TEMPLATE DEPENDENCIES MUST BE IMPORTED HERE
  //   CommonModule,
  //   RouterModule, // For router-outlet and routerLink
  //   MatSidenavModule,
  //   MatToolbarModule,
  //   MatListModule,
  //   MatIconModule,
  //   MatButtonModule,
  //   MatTooltipModule
  // ]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  private destroy$ = new Subject<void>();

  isLoggedIn: boolean = false;
  isMobile: boolean = false;

  window: Window = window; // For direct access to window.innerWidth in template

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isMobile = result.matches;
        if (this.isLoggedIn && !this.isMobile && this.sidenav) {
          this.sidenav.open();
        } else if (this.isLoggedIn && this.isMobile && this.sidenav) {
          this.sidenav.close();
        }
        this.cdr.detectChanges();
      });

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: NavigationEnd) => {
      this.isLoggedIn = !event.urlAfterRedirects.includes('/login');
      if (this.isLoggedIn && !this.isMobile && this.sidenav) {
        this.sidenav.open();
      } else if (this.isLoggedIn && this.isMobile && this.sidenav) {
         this.sidenav.close();
      }
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.isLoggedIn = !this.router.url.includes('/login');
    if (this.isLoggedIn && !this.isMobile && this.sidenav) {
      this.sidenav.open();
    } else if (this.isLoggedIn && this.isMobile && this.sidenav) {
      this.sidenav.close();
    }
    this.cdr.detectChanges();
  }

  toggleSidebar(): void {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  closeSidebar(): void {
    if (this.isMobile && this.sidenav) {
      this.sidenav.close();
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.closeSidebar();
  }

  logout(): void {
    this.router.navigate(['/login']);
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
