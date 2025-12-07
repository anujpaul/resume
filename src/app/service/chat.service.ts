import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

export class ChatResponse{
  constructor(public message:string){}
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private baseUrl = environment.baseUrl;

  

  constructor(
    private http:HttpClient

  ) { }

  executeHellowWorld(userMessage:string){
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key':environment.apimSubscriptionKey
      });

    console.log("Execute Message : " +userMessage);
    return this.http.post<ChatResponse>(
      `${this.baseUrl}/chat/greet`,
      userMessage, 
      { headers }
    );
  }

}
