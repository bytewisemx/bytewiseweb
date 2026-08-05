import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrivacyService } from '../../services/privacy.service';

interface Confetti {
  id: number;
  left: string;
  color: string;
  size: string;
  delay: string;
  duration: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  currentStep = 1;
  totalSteps = 5;
  isSending = false;
  isSubmitted = false;

  confettiArray: Confetti[] = [];

  topics = [
    { id: 'ciberseguridad', name: 'Ciberseguridad & ISO 27001' },
    { id: 'outsourcing', name: 'Outsourcing de TI' },
    { id: 'ia', name: 'Consultoría en IA' },
    { id: 'pentesting', name: 'Pentesting & Vulnerabilidades' },
    { id: 'forense', name: 'Forense Informático' },
    { id: 'desarrollo', name: 'Desarrollo a la medida' }
  ];

  contactMethods = [
    { id: 'whatsapp', name: 'Mensaje de WhatsApp' },
    { id: 'llamada', name: 'Llamada telefónica' }
  ];

  constructor(
    private fb: FormBuilder,
    private privacyService: PrivacyService
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+()\s-]{8,20}$/)]],
      email: ['', [Validators.required, Validators.email]],
      topic: ['', Validators.required],
      contactMethod: ['Mensaje de WhatsApp', Validators.required]
    });
  }

  get nameValue(): string {
    const name = this.contactForm.get('name')?.value;
    return name ? name.trim().split(' ')[0] : 'amigo';
  }

  generateConfetti() {
    const colors = ['#f59e0b', '#06b6d4', '#a78bfa', '#10b981', '#fbbf24', '#38bdf8'];
    this.confettiArray = Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: `${Math.random() * 8 + 6}px`,
      delay: `${Math.random() * 0.8}s`,
      duration: `${Math.random() * 2 + 2.5}s`
    }));
  }

  nextStep() {
    if (this.currentStep === 1 && this.contactForm.get('name')?.invalid) {
      this.contactForm.get('name')?.markAsTouched();
      return;
    }
    if (this.currentStep === 2 && this.contactForm.get('phone')?.invalid) {
      this.contactForm.get('phone')?.markAsTouched();
      return;
    }
    if (this.currentStep === 3 && this.contactForm.get('email')?.invalid) {
      this.contactForm.get('email')?.markAsTouched();
      return;
    }
    if (this.currentStep === 4 && this.contactForm.get('topic')?.invalid) {
      this.contactForm.get('topic')?.markAsTouched();
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    } else {
      this.onSubmit();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  selectTopic(topicName: string) {
    this.contactForm.patchValue({ topic: topicName });
    this.nextStep();
  }

  selectContactMethod(methodName: string) {
    this.contactForm.patchValue({ contactMethod: methodName });
    this.onSubmit();
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

    setTimeout(() => {
      this.isSending = false;
      this.isSubmitted = true;
      this.generateConfetti();
      this.currentStep = 6;
    }, 1200);
  }

  resetForm() {
    this.contactForm.reset({ contactMethod: 'Mensaje de WhatsApp' });
    this.currentStep = 1;
    this.isSubmitted = false;
    this.confettiArray = [];
  }
}
