import { InjectionToken } from '@angular/core';
export const server = 'https://localhost:7092';

export const webAPIUrl = `${server}/api`;
export const imageBaseUrl = `${server}/api/Images?fileUrl=product`;

export interface AppConfig {
  title: string;
  version: number;
  webAPIUrl: string;
  imageBaseUrl: string;
}

export const appSettings: AppConfig = {
  title: 'My application',
  version: 1.0,
  webAPIUrl: `${server}/api`,
  imageBaseUrl: `${server}/api/Images?fileUrl=product`,
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
