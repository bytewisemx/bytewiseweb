import { Component, OnInit, HostListener, ViewChildren, QueryList, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  isScrolled = false;
  isMenuOpen = false;
  activeLink = 'hero';

  indicatorStyle: Record<string, string> = {
    left: '0px',
    top: '0px',
    width: '0px',
    height: '0px',
    opacity: '0'
  };

  @ViewChildren('linkHero, linkFeatures, linkStats, linkContact') linkRefs!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.checkScroll();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.updateIndicatorToActive(), 150);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
    this.checkActiveSectionOnScroll();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.updateIndicatorToActive();
  }

  checkScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setLink(link: string, event?: Event) {
    this.activeLink = link;
    this.isMenuOpen = false;
    if (event && event.currentTarget) {
      this.moveIndicatorToElement(event.currentTarget as HTMLElement);
    } else {
      this.updateIndicatorToActive();
    }
  }

  onLinkHover(event: Event) {
    if (event.currentTarget) {
      this.moveIndicatorToElement(event.currentTarget as HTMLElement);
    }
  }

  onNavMouseLeave() {
    this.updateIndicatorToActive();
  }

  private moveIndicatorToElement(el: HTMLElement) {
    if (!el || !isPlatformBrowser(this.platformId)) return;

    this.indicatorStyle = {
      left: `${el.offsetLeft}px`,
      top: `${el.offsetTop}px`,
      width: `${el.offsetWidth}px`,
      height: `${el.offsetHeight}px`,
      opacity: '1'
    };
  }

  private updateIndicatorToActive() {
    if (!isPlatformBrowser(this.platformId) || !this.linkRefs) return;
    const linkMap: Record<string, string> = {
      hero: '#hero',
      features: '#features',
      stats: '#stats',
      contact: '#contact'
    };

    const targetHref = linkMap[this.activeLink] || '#hero';
    const linkArray = this.linkRefs.toArray();
    const activeRef = linkArray.find(ref => ref.nativeElement.getAttribute('href') === targetHref);

    if (activeRef) {
      this.moveIndicatorToElement(activeRef.nativeElement);
    }
  }

  checkActiveSectionOnScroll() {
    const sections = ['hero', 'features', 'stats', 'contact'];
    const scrollPosition = window.scrollY + 150;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const top = element.offsetTop;
        const height = element.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          if (this.activeLink !== section) {
            this.activeLink = section;
            this.updateIndicatorToActive();
          }
          break;
        }
      }
    }
  }
}
