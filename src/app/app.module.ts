import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import AppComponent as it's now standalone and will be bootstrapped directly.
import { AppComponent } from './app.component';

// Other components remain non-standalone and are declared here
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilesComponent } from './files/files.component';
import { SearchComponent } from './search/search.component';
import { ChatComponent } from './chat/chat.component';
import { SettingsComponent } from './settings/settings.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { SecureShareComponent } from './secure-share/secure-share.component';

// Angular Material Modules - these are imported here for all other non-standalone components
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'files', component: FilesComponent },
  { path: 'search', component: SearchComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'document-viewer', component: DocumentViewerComponent },
  { path: 'secure-share', component: SecureShareComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  declarations: [
    // AppComponent is now standalone, so it's NOT declared here
    LoginComponent,
    DashboardComponent,
    FilesComponent,
    SearchComponent,
    ChatComponent,
    SettingsComponent,
    DocumentViewerComponent,
    SecureShareComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    // Angular Material Modules (imported here for other non-standalone components)
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatDividerModule
  ],
  providers: [],
  // bootstrap is removed as AppComponent is standalone and bootstrapped in main.ts
  // exports: [CommonModule, RouterModule] // Optional: if other modules need these
})
export class AppModule { }
