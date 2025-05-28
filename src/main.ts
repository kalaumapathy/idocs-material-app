import { platformBrowserDynamic,  } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component'; // Import standalone AppComponent
import { AppModule } from './app/app.module'; // Assuming routes are exported from app.module.ts

platformBrowserDynamic().bootstrapModule(AppModule)