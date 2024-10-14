import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();

  public cache$ = new BehaviorSubject<any>([]);

  async setAndOverwrite(key: string, data: any): Promise<void> {
    this.cache.set(key, data);
    this.cache$.next(this.cache.get(key) as any);
  }

  async get(key: string): Promise<any> {
    const data = this.cache.get(key);
    this.cache$.next(data as any);
    return data;
  }

  async clear(key: string): Promise<void> {
    this.cache.delete(key);
    this.cache$.next([]);
  }
}
