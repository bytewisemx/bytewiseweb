import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  standalone: true,
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {
  isHidden = false;

  ngOnInit() {
    const hide = () => {
      // Esperar a que termine la animación del escudo (2.8s) + breve pausa
      setTimeout(() => {
        this.isHidden = true;
      }, 3200);
    };

    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide);
    }

    // Fallback de seguridad
    setTimeout(() => {
      this.isHidden = true;
    }, 5000);
  }
}
