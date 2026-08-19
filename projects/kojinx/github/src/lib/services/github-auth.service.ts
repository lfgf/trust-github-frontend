import { Injectable, Inject, NgZone } from '@angular/core';
import { KOJINX_API_BASE_URL, KOJINX_AUTH_TOKEN, KOJINX_OPEN_EXTERNAL, KOJINX_AUTH_SUCCESS_CALLBACK, KOJINX_UNLINK_LOCAL_CALLBACK } from '../tokens';

@Injectable({ providedIn: 'root' })
export class GithubAuthService {
  constructor(
    private zone: NgZone,
    @Inject(KOJINX_API_BASE_URL) private getApiUrl: () => string,
    @Inject(KOJINX_AUTH_TOKEN) private getToken: () => Promise<string | null>,
    @Inject(KOJINX_OPEN_EXTERNAL) private openExternal: (url: string) => Promise<void>,
    @Inject(KOJINX_AUTH_SUCCESS_CALLBACK) private authSuccess: (token: string) => Promise<void>,
    @Inject(KOJINX_UNLINK_LOCAL_CALLBACK) private unlinkLocal: () => Promise<void>
  ) {
    this.setupTauriListener();
  }

  async linkGithub(mapRepos: boolean = true): Promise<void> {
    const url = `${this.getApiUrl()}/api/auth/link-github?mapRepos=${mapRepos}`;
    const token = await this.getToken();
    const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
    if (res.ok) {
      const data = await res.json();
      if (data.url) await this.openExternal(data.url);
    }
  }

  async checkRepoScope(): Promise<boolean> {
    const url = `${this.getApiUrl()}/api/github/debug-token`;
    const token = await this.getToken();
    const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
    if (res.ok) {
      const data = await res.json();
      return data.hasRepoScope === true;
    }
    return false;
  }

  async unlinkGithub(): Promise<void> {
    const url = `${this.getApiUrl()}/api/auth/unlink-github`;
    const token = await this.getToken();
    const res = await fetch(url, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
    if (res.ok) {
       await this.unlinkLocal();
    }
  }

  initiateOAuth(): void {
    const url = `${this.getApiUrl()}/api/auth/github`;
    this.openExternal(url);
  }

  private async setupTauriListener(): Promise<void> {
    try {
      const { listen } = await import('@tauri-apps/api/event');
      await listen<{token: string}>('oauth-success', (event) => {
        this.zone.run(() => {
          this.authSuccess(event.payload.token);
        });
      });
    } catch(e) {}
  }
}
