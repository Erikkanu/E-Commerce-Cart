import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { IMAGE_LOADER } from '@angular/common'; 
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

const imageLoader = (config: any) => {
  return config.src;
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    { provide: IMAGE_LOADER, useValue: imageLoader }
  ]
};
