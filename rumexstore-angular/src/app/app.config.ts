import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment.development';

export const webAPIUrl = `${environment.webAPIUrl}`;
export const imageBaseUrl = `${environment.webAPIUrl}/Images?fileUrl=product`;

export interface AppConfig {
  title: string;
  version: number;
  webAPIUrl: string;
  imageBaseUrl: string;
}

export const appSettings: AppConfig = {
  title: 'My application',
  version: 1.0,
  webAPIUrl: `${environment.webAPIUrl}`,
  imageBaseUrl: `${environment.webAPIUrl}/Images?fileUrl=product`,
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
