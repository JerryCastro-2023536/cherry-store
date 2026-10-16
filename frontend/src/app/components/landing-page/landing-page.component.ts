import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-landing-page.component',
  styleUrl: './landing-page.component.css',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  hours = '08';
  minutes = '42';
  seconds = '15';

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    let remaining = 8 * 3600 + 42 * 60 + 15;
    const id = setInterval(() => {
      remaining = Math.max(0, remaining - 1);
      const h = Math.floor(remaining / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;
      this.hours = String(h).padStart(2, '0');
      this.minutes = String(m).padStart(2, '0');
      this.seconds = String(s).padStart(2, '0');
    }, 1000);

    this.destroyRef.onDestroy(() => clearInterval(id));
  }

  onNewsletterSubmit(event: Event): void {
    event.preventDefault();
  }
}
