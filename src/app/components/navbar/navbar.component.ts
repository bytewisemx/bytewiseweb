import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;
  activeLink = 'hero';

  ngOnInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
    this.checkActiveSectionOnScroll();
  }

  checkScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setLink(link: string) {
    this.activeLink = link;
    this.isMenuOpen = false;
  }

  checkActiveSectionOnScroll() {
    const sections = ['hero', 'features', 'stats', 'contact'];
    const scrollPosition = window.scrollY + 150; // offset por el navbar

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const top = element.offsetTop;
        const height = element.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeLink = section;
          break;
        }
      }
    }
  }
}
