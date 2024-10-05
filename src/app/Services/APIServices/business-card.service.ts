import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIService } from './base-api.service';
import { BusinessCard } from '../../Models/BusinessCard';

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
  addBusinessCard(businessCard: BusinessCard): Observable<any> {
    return this.post(this.endpoint, businessCard);
  }

  // Update an existing business card
  updateBusinessCard(id: string, businessCard: BusinessCard): Observable<any> {
    const url = `${this.endpoint}/${id}`;
    return this.put(url, businessCard);
  }

  // Delete a business card by id
  deleteBusinessCard(id: string): Observable<any> {
    const url = `${this.endpoint}/${id}`;
    return this.delete(url);
  }
}
