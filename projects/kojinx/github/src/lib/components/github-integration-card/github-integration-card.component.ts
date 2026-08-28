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
              <p>Log in to automatically pull your profile data and discover your projects.</p>
              <p class="mt-2 text-kojinx-blue font-medium">Note: Kojinx uses fine-grained GitHub App permissions (Metadata only). It does not have access to read or modify your source code.</p>
            </div>

            <div class="flex items-start gap-3.5 p-4 bg-black/20 border border-white/5 rounded-xl">
              <div class="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 shrink-0 mt-0.5">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-white">Fine-Grained Security Model</p>
                <p class="text-xs text-kojinx-text-muted mt-1 leading-relaxed">
                  Your repositories are listed via GitHub App tokens with strictly <span class="text-slate-200 font-mono">metadata:read</span>. Source code and commit access are cryptographically blocked by the GitHub API.
                </p>
              </div>
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
export class GithubIntegrationCardComponent {
  @Input() isConnected: boolean = false;
  
  readonly showModal = signal(false);

  constructor(private githubAuth: GithubAuthService) {}

  openModal() {
    this.showModal.set(true);
  }
  
  closeModal(event: MouseEvent) {
    this.showModal.set(false);
  }

  link() {
    this.githubAuth.linkGithub();
  }

  unlink() {
    this.githubAuth.unlinkGithub();
  }
}
