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
  private sessionId: string;

  constructor(private http:HttpClient) {
    this.sessionId = this.getSessionId();
   }

   private getSessionId() : string{
    let sid = localStorage.getItem('sessionId');

    console.log("Session : ", sid);

    if(!sid){
      sid = crypto.randomUUID();
      console.log("Session Id by crypto Random: ", sid);
      localStorage.setItem('sessionId', sid);
    }
    
    return sid
   }

   getHeader(): HttpHeaders{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key':environment.apimSubscriptionKey,
      'X-Session-Id': this.sessionId
      })
    return headers;
   }

  greet(userMessage:string){
    console.log("Calling Base URL - " + environment.baseUrl);
    // console.log("Sub Key : " +environment.apimSubscriptionKey);
    const headers = this.getHeader();

    console.log("Execute Message : " +userMessage);
    return this.http.post<ChatResponse>(
      `${this.baseUrl}/chat/greet`,
      userMessage, 
      { headers }
    );
  }

  resumeQuestion(userMessage:string){
    console.log("Calling Base URL - " + environment.baseUrl);
    // console.log("Sub Key : " +environment.apimSubscriptionKey);
    const headers = this.getHeader();

    console.log("Execute Message : " +userMessage);
    return this.http.post<ChatResponse>(
      `${this.baseUrl}/chat/resumeQuestion`,
      userMessage, 
      { headers }
    );
  }

}
