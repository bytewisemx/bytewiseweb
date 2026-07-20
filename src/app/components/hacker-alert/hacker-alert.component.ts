import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hacker-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hacker-alert.component.html',
  styleUrls: ['./hacker-alert.component.css']
})
export class HackerAlertComponent implements OnInit, OnDestroy {
  // Estados de la simulación
  isAlertActive = false;
  isRelievedState = false;
  countdown = 5;

  // Estados de Popups Emergentes de Concienciación
  showPopup1 = false;
  showPopup2 = false;
  showPopup3 = false;

  // Temporizadores
  private popupTimers: any[] = [];
  private triggerTimeout: any = null;
  private countdownInterval: any = null;

  // Líneas del terminal simulado
  terminalLines: string[] = [];
  private terminalLogs = [
    'Initializing exploit payloads...',
    'Bypassing firewall gateways...',
    'Establishing SSH backdoor tunneling...',
    'Access granted. Escalating privileges to root...',
    'Harvesting database credentials...',
    'Target directory: /var/www/bytewise/secure_data',
    'Executing AES-256 encryption algorithm...',
    'Encrypting client_records.db...',
    'Encrypting financial_ledger.xlsx...',
    'Encrypting server_backups.tar.gz...',
    'Disabling system recovery logs...',
    'Injecting ransomware payload: ByteCrypt v4.2'
  ];

  ngOnInit() {
    // Popup 1: aparece a los 5s, dura 6s (esquina inferior izquierda)
    this.schedulePopup(
      () => { if (!this.isAlertActive) this.showPopup1 = true; },
      () => { this.showPopup1 = false; },
      5000, 6000
    );

    // Popup 2: aparece a los 18s, dura 7s (esquina superior derecha)
    this.schedulePopup(
      () => { if (!this.isAlertActive) this.showPopup2 = true; },
      () => { this.showPopup2 = false; },
      18000, 7000
    );

    // Popup 3: aparece a los 35s, dura 8s (esquina inferior derecha)
    this.schedulePopup(
      () => { if (!this.isAlertActive) this.showPopup3 = true; },
      () => { this.showPopup3 = false; },
      35000, 8000
    );

    // Animación Hacking / Ransomware principal: se activa automáticamente a los 60s (1 minuto)
    this.triggerTimeout = setTimeout(() => {
      this.startHackingEffect();
    }, 60000);
  }

  private schedulePopup(showFn: () => void, hideFn: () => void, delayMs: number, durationMs: number) {
    const showTimer = setTimeout(showFn, delayMs);
    const hideTimer = setTimeout(hideFn, delayMs + durationMs);
    this.popupTimers.push(showTimer, hideTimer);
  }

  ngOnDestroy() {
    this.popupTimers.forEach(t => clearTimeout(t));
    if (this.triggerTimeout) clearTimeout(this.triggerTimeout);
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  startHackingEffect() {
    // Cerrar popups al iniciar ransomware
    this.showPopup1 = false;
    this.showPopup2 = false;
    this.showPopup3 = false;

    this.isAlertActive = true;
    this.isRelievedState = false;
    this.countdown = 5;
    this.terminalLines = [];

    // Agregar logs del terminal secuencialmente
    this.terminalLogs.forEach((log, index) => {
      setTimeout(() => {
        if (!this.isRelievedState) {
          this.terminalLines.push(`[${new Date().toLocaleTimeString()}] ${log}`);
        }
      }, index * 200);
    });

    // Cuenta regresiva de 5 segundos
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 1) {
        this.countdown--;
      } else {
        clearInterval(this.countdownInterval);
        this.transitionToRelief();
      }
    }, 1000);
  }

  transitionToRelief() {
    this.isRelievedState = true;
  }

  dismissAlert() {
    // Cierra el overlay permitiendo al usuario continuar exactamente donde estaba en la página
    this.isAlertActive = false;
    this.isRelievedState = false;
  }
}
