import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { PrivacyService } from '../../services/privacy.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
  isOpen = false;
  private sub: Subscription | null = null;

  constructor(public privacyService: PrivacyService) {}

  ngOnInit() {
    this.sub = this.privacyService.isOpen$.subscribe(open => {
      this.isOpen = open;
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    document.body.style.overflow = '';
  }

  closeModal() {
    this.privacyService.close();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress() {
    if (this.isOpen) {
      this.closeModal();
    }
  }
}
