import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routingComponents } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, routingComponents],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showScrollButton: boolean = false;

  constructor() {

  }

  //Scroll btn
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show the button when the user scrolls down, hide it when at the top
    this.showScrollButton = window.scrollY > 600;
  }

  scrollToTop() {
    // Scroll back to the top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
