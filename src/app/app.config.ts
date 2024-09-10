import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(),
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),

    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
};
