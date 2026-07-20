import { Component } from '@angular/core';
import { PrivacyService } from '../../services/privacy.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private privacyService: PrivacyService) {}

  openPrivacy(event: Event) {
    event.preventDefault();
    this.privacyService.open();
  }
}
