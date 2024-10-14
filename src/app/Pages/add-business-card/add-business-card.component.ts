import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BusinessCardDto } from '../../DTOs/BusinessCardDTO';
import { BusinessCardService } from '../../Services/APIServices/business-card.service';

@Component({
  selector: 'app-add-business-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-business-card.component.html',
  styleUrl: './add-business-card.component.css'
})
export class AddBusinessCardComponent implements OnInit {
  addBusinessCardForm!: FormGroup;
  fromForm: boolean = true; // Default tab is "From Form"
  photoBase64String?: string = '';
  isItLargerThanOneGigabyte: boolean = false;
  isImage: boolean = true;
  isPopupVisible = false;
  filename: string = '';
  isItAValidCsvFormat? = true;
  isAcceptedFiles = true;
  businessCard?: BusinessCardDto;
  fileSelected?: File;
  isBusy: boolean = false;

  get name() {
    return this.addBusinessCardForm.get('name');
  }
  get gender() {
    return this.addBusinessCardForm.get('gender');
  }
  get email() {
    return this.addBusinessCardForm.get('email');
  }
  get phone() {
    return this.addBusinessCardForm.get('phone');
  }
  get dateOfBirth() {
    return this.addBusinessCardForm.get('dateOfBirth');
  }
  get address() {
    return this.addBusinessCardForm.get('address');
  }

  //ctor
  constructor(private fb: FormBuilder, private businessCardService: BusinessCardService, private router: Router) {
  }

  ngOnInit(): void {
    this.initializeAddBusinessCardForm();
  }

  initializeAddBusinessCardForm() {
    const phonePattern = /^\d{9,10}$/;
    this.addBusinessCardForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(255)]],
      phone: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(phonePattern)]],
      gender: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      dateOfBirth: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      photoBase64: ['']
    });
  }

  selectTab(fromForm: boolean) {
    this.fromForm = fromForm;
  }

  onImageSelected(event: any): void {
    this.isItLargerThanOneGigabyte = false;

    const file: File = event.target.files[0];
    const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB

    this.isImage = file.type.split("/")[0] == "image";
    if (!this.isImage) {
      return;
    }

    // Check file size on the client-side
    if (file.size > maxSizeInBytes) {
      this.isItLargerThanOneGigabyte = true;
      return
    }

    this.isItLargerThanOneGigabyte = false;

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.photoBase64String = e.target.result as string;
        this.businessCard!.photoBase64 = this.photoBase64String;
      };

      reader.readAsDataURL(file);
    }
  }

  showPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  onSelectedXmlOrCsv(event: any): void {
    this.isItAValidCsvFormat = true;
    this.isAcceptedFiles = true;
    const file = event.target.files?.[0];

    if (!file) return;

    this.filename = file.name;
    const fileExtension = this.getFileExtension(this.filename);

    if (!fileExtension) {
      this.isAcceptedFiles = false;
      return;
    }

    this.fileSelected = file;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const fileContent = e.target.result;
      switch (fileExtension) {
        case 'csv':
          this.handleCsvFile(fileContent);
          break;
        case 'xml':
          this.handleXmlFile(fileContent);
          break;
        default:
          this.isAcceptedFiles = false;
      }
    };

    reader.readAsText(file);
  }

  getFileExtension(filename: string): string | null {
    return filename.split('.').pop()?.toLowerCase() || null;
  }

  handleCsvFile(csvContent: string): void {
    const lines = csvContent.split('\n').map(line => line.trim());
    const header = lines[0];

    const expectedHeader = "Name,Gender,DateOfBirth,Email,Phone,Address";
    if (!header.startsWith(expectedHeader)) {
      this.isItAValidCsvFormat = false;
      return;
    }

    const data = lines[1]?.split(",").map(item => item.trim());

    if (data) {
      this.businessCard = {
        name: data[0],
        gender: data[1],
        dateOfBirth: data[2],
        email: data[3],
        phone: data[4],
        address: data[5]
      };
    }
  }

  handleXmlFile(xmlContent: string): void {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "text/xml");

    this.businessCard = {
      name: this.getXmlValue(xmlDoc, 'Name'),
      gender: this.getXmlValue(xmlDoc, 'Gender'),
      dateOfBirth: this.getXmlValue(xmlDoc, 'DateOfBirth'),
      email: this.getXmlValue(xmlDoc, 'Email'),
      phone: this.getXmlValue(xmlDoc, 'Phone'),
      address: this.getXmlValue(xmlDoc, 'Address')
    };
  }

  getXmlValue(xmlDoc: Document, tagName: string): string {
    return xmlDoc.getElementsByTagName(tagName)?.[0]?.textContent?.trim() || '';
  }

  async addBusinessCard() {
    try {
      this.isBusy = true;
      var businessCard;
      if (this.fromForm) {
        if (this.addBusinessCardForm.valid) {
          businessCard = this.addBusinessCardForm.value;
          businessCard.photoBase64 = this.photoBase64String;
        } else {
          Object.values(this.addBusinessCardForm.controls).forEach(control => { control.markAsTouched(); });
          return;
        }
      } else {
        businessCard = this.businessCard;
      }
      //from import section ...
      await lastValueFrom(this.businessCardService.addBusinessCard(businessCard)).then((res) => {

        this.router.navigate(['../']);
      }).catch((err) => {
        alert(err)
      })
    } finally {
      this.isBusy = false;
    }
  }
}
