import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export const webAPIUrl = `${environment.webAPIUrl}`;
export const blobBaseUrl = `${environment.blobUrl}/Images?fileUrl=product`;

export interface AppConfig {
  title: string;
  version: number;
  webAPIUrl: string;
  blobBaseUrl: string;
}

export const appSettings: AppConfig = {
  title: 'My application',
  version: 1.0,
  webAPIUrl: `${environment.webAPIUrl}`,
  blobBaseUrl: `${environment.blobUrl}/images/product`,
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
