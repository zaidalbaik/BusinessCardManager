import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddBusinessCardAccessService {
  private canAccessAddBusinessCard: boolean = false;

  allowAccess() {
    this.canAccessAddBusinessCard = true;
  }

  isAccessAllowed(): boolean {
    const accessAllowed = this.canAccessAddBusinessCard;
    this.canAccessAddBusinessCard = false;
    return accessAllowed;
  }
}
