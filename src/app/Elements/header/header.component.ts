import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BusinessCardService } from '../../Services/APIServices/business-card.service';
import { PathsNames } from '../../PathsNames';
import { AddBusinessCardAccessService } from '../../Services/add-business-card-access.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {
  isScrolled = false;
  isToggled = false;
  constructor(private router: Router,
    private scroller: ViewportScroller,
    private addBusinessCardAccessService: AddBusinessCardAccessService) { }

  ngOnInit(): void { }

  navToElement(id: any) {
    this.scroller.scrollToAnchor(`${id}`);
    this.toggleMenu();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  navTo(pageName: string) {
    this.addBusinessCardAccessService.allowAccess();
    this.router.navigate([`${PathsNames.home}/${pageName}`]);
  }

  toggleMenu() {
    this.isToggled = !this.isToggled;
  }
}
