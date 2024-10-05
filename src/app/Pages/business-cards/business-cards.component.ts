import { Component, OnInit } from '@angular/core';
import { BusinessCard } from '../../Models/BusinessCard';
import { BusinessCardService } from '../../Services/APIServices/business-card.service';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PathsNames } from '../../PathsNames';
import { AddBusinessCardAccessService } from '../../Services/add-business-card-access.service';

@Component({
  selector: 'app-business-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-cards.component.html',
  styleUrl: './business-cards.component.css'
})
export class BusinessCardsComponent implements OnInit {
  businessCards: BusinessCard[] = [];

  constructor(private businessCardService: BusinessCardService,
    private router: Router,
    private addBusinessCardAccessService: AddBusinessCardAccessService
  ) { }

  async ngOnInit() {
    await this.loadBusinessCards();
  }

  async loadBusinessCards() {
    await lastValueFrom(this.businessCardService.getBusinessCards()).then((response: any) => {
      this.businessCards = response.businessCards as BusinessCard[];
    }).catch((err: any) => {
      // handle errors
    })
  }

  async deleteBusinessCard(id: string) {
    this.businessCardService.deleteBusinessCard(id).subscribe(
      async () => {
        await this.loadBusinessCards(); // Refresh list after deletion
      }
    );
  }

  navTo(pageName: string) {
    this.addBusinessCardAccessService.allowAccess();
    this.router.navigate([`${PathsNames.home}/${pageName}`]);
  }
}
