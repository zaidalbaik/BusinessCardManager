import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import saveAs from 'file-saver';
import { lastValueFrom } from 'rxjs';
import { FileTypes } from '../../Enums/FileTypes';
import { BusinessCard } from '../../Models/BusinessCard';
import { PathsNames } from '../../PathsNames';
import { AddBusinessCardAccessService } from '../../Services/add-business-card-access.service';
import { BusinessCardService } from '../../Services/APIServices/business-card.service';
import { CacheService } from '../../Utils/cache.service';

@Component({
  selector: 'app-business-cards',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './business-cards.component.html',
  styleUrl: './business-cards.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BusinessCardsComponent implements OnInit {
  businessCards: BusinessCard[] = [];
  fileTypes = FileTypes;
  isPopupVisible = false;
  isfiltersPopupVisible = false;
  isBusy: boolean = false;
  filterForm!: FormGroup;
  isFilter = false;

  constructor(private businessCardService: BusinessCardService,
    private router: Router,
    private addBusinessCardAccessService: AddBusinessCardAccessService,
    private cacheService: CacheService,
    private fb: FormBuilder) { }

  async ngOnInit() {
    this.loadFilterForm();
    await this.loadBusinessCards();
  }

  loadFilterForm() {
    this.filterForm = this.fb.group({
      name: [''],
      dateOfBirth: [''],
      phone: [''],
      gender: [''],
      email: [''],
    });
  }

  async loadBusinessCards() {
    this.isBusy = true;
    await lastValueFrom(this.businessCardService.getBusinessCards()).then((res) => {
      this.isFilter = false;
      this.businessCards = res;
    }).catch((err) => {
      console.log(err);
    })
    this.isBusy = false;
  }

  deleteCard(id: string) {
    this.businessCardService.deleteBusinessCard(id).subscribe((res) => {
      this.businessCards = this.businessCards.filter(card => card.id !== id);
    });
  }

  navTo(pageName: string) {
    this.addBusinessCardAccessService.allowAccess();
    this.router.navigate([`${PathsNames.home}/${pageName}`]);
  }

  async exportCard(fileType: FileTypes) {
    var id = await this.cacheService.get("CardId");
    if (id == null || fileType == null)
      return;

    await lastValueFrom(this.businessCardService.exportBusinessCard(id, fileType)).then((res) => {
      const fileExtension = fileType.toLowerCase();
      const fileName = `BusinessCard_${id}.${fileExtension}`;
      saveAs(res, fileName);
    }).catch((err) => {
      console.log(err);
    })
  }

  async showPopup(id: string) {
    this.isPopupVisible = true;
    await this.cacheService.setAndOverwrite("CardId", id);
  }

  showFiltersPopup() {
    this.isfiltersPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
    this.isfiltersPopupVisible = false;
  }

  async filter() {
    try {
      this.isBusy = true;
      this.isfiltersPopupVisible = false;

      const filterInputs = this.filterForm.value;
      await lastValueFrom(this.businessCardService.filter(
        filterInputs.name,
        filterInputs.dateOfBirth,
        filterInputs.phone,
        filterInputs.gender,
        filterInputs.email
      )).then((res) => {
        this.isFilter = true;
        this.businessCards = res;
      }).catch((err) => {
        console.log(err);
      });

    } finally {
      this.isBusy = false;
    }
  }
}

