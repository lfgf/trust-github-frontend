import { Component, Input, signal, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubAuthService } from '../../services/github-auth.service';

@Component({
  selector: 'github-integration-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- The Card -->
    <div (click)="openModal()" class="group cursor-pointer relative p-6 rounded-xl bg-kojinx-panel border border-kojinx-border hover:border-white/30 transition-colors">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <p class="text-base font-semibold text-white group-hover:text-gray-300 transition-colors">GitHub</p>
            <p class="text-sm text-kojinx-text-muted mt-0.5">Log in to automatically pull profile data and projects.</p>
          </div>
        </div>
        <div class="pr-6">
          @if (isConnected) {
            <span class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold font-mono">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
              Connected
            </span>
          } @else {
            <span class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold font-mono group-hover:bg-white/10 transition-colors">
              Connect
            </span>
          }
        </div>
      </div>
    </div>

    <!-- The Modal -->
    @if (showModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" (click)="closeModal($event)">
        <div class="bg-kojinx-panel border border-kojinx-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col" (click)="$event.stopPropagation()">
          
          <div class="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 class="text-xl font-bold text-white flex items-center gap-3">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
              GitHub Integration
            </h2>
            <button (click)="showModal.set(false)" class="text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-6">
            
            <div class="bg-kojinx-blue/10 border border-kojinx-blue/30 rounded-xl p-4 text-sm text-slate-300">
              <p>Log in to automatically pull your profile data and projects.</p>
              <p class="mt-2 text-kojinx-blue font-medium">Note: Kojinx only maps the repositories internally. It does not have access to read or modify your source code.</p>
            </div>

            <div class="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl">
              <div>
                <p class="font-medium text-white flex items-center gap-2">
                  Repository Mapping
                  @if (isLoadingScope()) {
                    <svg class="w-4 h-4 animate-spin text-kojinx-blue" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                  }
                </p>
                <p class="text-xs text-kojinx-text-muted mt-1">Allow Kojinx to discover and map your repositories</p>
                @if (isConnected) {
                  <p class="text-xs text-amber-500 mt-1 mt-2">Toggling this will require you to re-authorize in your browser.</p>
                }
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" [checked]="mapRepos()" (change)="toggleMapRepos()" [disabled]="isLoadingScope()">
                <div class="w-11 h-6 bg-black/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kojinx-blue border border-white/10 peer-disabled:opacity-50"></div>
              </label>
            </div>

          </div>

          <div class="p-6 border-t border-white/5 flex items-center justify-between bg-black/20">
            @if (isConnected) {
              <button (click)="unlink(); showModal.set(false)" class="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors">
                Disconnect GitHub
              </button>
              <button (click)="showModal.set(false)" class="px-6 py-2 rounded-lg text-sm font-medium bg-white/5 text-white hover:bg-white/10 border border-white/10 transition-colors ml-auto">
                Done
              </button>
            } @else {
              <button (click)="link(); showModal.set(false)" class="px-6 py-2 rounded-lg text-sm font-medium bg-white text-black hover:bg-gray-200 transition-colors ml-auto">
                Connect GitHub
              </button>
            }
          </div>

        </div>
      </div>
    }
  `
})
export class GithubIntegrationCardComponent implements OnInit {
  @Input() isConnected: boolean = false;
  
  readonly showModal = signal(false);
  readonly mapRepos = signal(true);
  readonly isLoadingScope = signal(false);

  constructor(private githubAuth: GithubAuthService) {}

  ngOnInit() {
    // Initial fetch if already connected
    if (this.isConnected) {
      this.fetchRepoScope();
    }
  }

  async openModal() {
    this.showModal.set(true);
    if (this.isConnected) {
      await this.fetchRepoScope();
    }
  }
  
  private async fetchRepoScope() {
    this.isLoadingScope.set(true);
    try {
      const hasScope = await this.githubAuth.checkRepoScope();
      this.mapRepos.set(hasScope);
    } catch (e) {
      console.error('Failed to check GitHub repo scope', e);
    } finally {
      this.isLoadingScope.set(false);
    }
  }
  
  closeModal(event: MouseEvent) {
    this.showModal.set(false);
  }

  async toggleMapRepos() {
    const newValue = !this.mapRepos();
    this.mapRepos.set(newValue);
    
    if (this.isConnected) {
      // If connected, toggling instantly triggers re-auth to change token scopes
      this.showModal.set(false);
      await this.githubAuth.linkGithub(newValue);
    }
  }

  link() {
    this.githubAuth.linkGithub(this.mapRepos());
  }

  unlink() {
    this.githubAuth.unlinkGithub();
  }
}
