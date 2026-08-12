import { InjectionToken } from '@angular/core';

export const KOJINX_API_BASE_URL = new InjectionToken<() => string>('KOJINX_API_BASE_URL');
export const KOJINX_AUTH_TOKEN = new InjectionToken<() => Promise<string | null>>('KOJINX_AUTH_TOKEN');
export const KOJINX_OPEN_EXTERNAL = new InjectionToken<(url: string) => Promise<void>>('KOJINX_OPEN_EXTERNAL');
export const KOJINX_AUTH_SUCCESS_CALLBACK = new InjectionToken<(token: string) => Promise<void>>('KOJINX_AUTH_SUCCESS_CALLBACK');
export const KOJINX_UNLINK_LOCAL_CALLBACK = new InjectionToken<() => Promise<void>>('KOJINX_UNLINK_LOCAL_CALLBACK');
