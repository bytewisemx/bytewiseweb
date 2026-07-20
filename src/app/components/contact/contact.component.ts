import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { PrivacyService } from '../../services/privacy.service';

// Validador personalizado para correo corporativo B2B
export function corporateEmailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (!email) return null;

  const forbiddenDomains = [
    'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 
    'live.com', 'msn.com', 'icloud.com', 'aol.com', 'zoho.com'
  ];

  const domain = email.substring(email.lastIndexOf('@') + 1).toLowerCase();
  
  if (forbiddenDomains.includes(domain)) {
    return { corporateEmail: true };
  }

  return null;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSending = false;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private privacyService: PrivacyService
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, corporateEmailValidator]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+()\s-]{8,20}$/)]],
      companySize: ['', Validators.required]
    });
  }

  openPrivacy(event: Event) {
    event.preventDefault();
    this.privacyService.open();
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSending = true;

    // Simular el envío del formulario a producción
    setTimeout(() => {
      this.isSending = false;
      this.isSubmitted = true;
      this.contactForm.reset();
    }, 1800);
  }
}
