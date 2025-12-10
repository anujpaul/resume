import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: any = {};
  
  constructor(private http: HttpClient) { }

  async loadConfig(): Promise<void> {
    try{
      const config = await firstValueFrom(
        this.http.get('/assets/config/config.json')
      );
      this.config = config;
    }
    catch (error) {
      console.error('Error loading config:', error);
      this.config = {
        baseUrl: 'https://default-api.com',
        apimSubscriptionKey: 'default-key'
      };
    }
  }


  get baseUrl(): string {
    return this.config?.baseUrl || 'https://default-api.com';
  }

  get apimSubscriptionKey(): string{
    return this.config?.apimSubscriptionKey || 'default-key';
  }
}