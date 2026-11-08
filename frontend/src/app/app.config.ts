import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';

const WoodworkPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#faf6f2',
      100: '#f3e8dc',
      200: '#e7d0bc',
      300: '#d7b293',
      400: '#c18e68',
      500: '#a66e46',
      600: '#8a5a36',
      700: '#70472b',
      800: '#5d3b27',
      900: '#4c3223',
      950: '#2b1d16',
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: WoodworkPreset,
        options: { darkModeSelector: 'system' },
      },
    }),
  ]
};
