import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessCardDto } from '../../DTOs/BusinessCardDTO';
import { FileTypes } from '../../Enums/FileTypes';
import { BusinessCard } from '../../Models/BusinessCard';
import { BaseAPIService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService extends BaseAPIService {
  private readonly endpoint = 'api/BusinessCards'; // API endpoint

  constructor() { super() }

  // Fetch all business cards
  getBusinessCards(): Observable<BusinessCard[]> {
    return this.get(this.endpoint);
  }

  // Fetch a single business card by id
  getBusinessCard(id: string): Observable<BusinessCard> {
    const url = `${this.endpoint}/${id}`;
    return this.get(url);
  }

  // Create a new business card
  addBusinessCard(businessCard: BusinessCardDto): Observable<any> {
    return this.post(this.endpoint, businessCard);
  }

  // Delete a business card by id
  deleteBusinessCard(id: string): Observable<any> {
    const url = `${this.endpoint}/${id}`;
    return this.delete(url);
  }

  exportBusinessCard(id: string, fileType: FileTypes): Observable<Blob> {
    const url = `${this.endpoint}/export?id=${id}&fileType=${fileType}`;
    return this.getImageFile(url); // Set responseType to 'blob' for file download
  }

  //not used
  // importFile(file: File, fileType: FileTypes) {
  //   const url = `${this.endpoint}/import/${fileType.toString().toLowerCase()}`
  //   return this.import(url, file);
  // }

  filter(name?: string, dateOfBirth?: string, phone?: string, gender?: string, email?: string): Observable<BusinessCard[]> {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (dateOfBirth) params.append('dateOfBirth', dateOfBirth);
    if (phone) params.append('phone', phone);
    if (gender) params.append('gender', gender);
    if (email) params.append('email', email);

    const url = `${this.endpoint}/filter?${params.toString()}`;

    return this.get(url);
  }
}
