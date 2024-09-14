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
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptor/headers.interceptor';
import { cathErrorInterceptor } from './core/interceptor/cath-error.interceptor';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(),

      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),

    provideHttpClient(
      withFetch(),
      withInterceptors([
        headersInterceptor,
        cathErrorInterceptor,
        loadingInterceptor,
      ])
    ),
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
};
