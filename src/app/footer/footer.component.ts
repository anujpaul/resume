import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {  

  currentYear: number = this.getCurrentYear();
  todayDate = new Date()

  getCurrentYear(){
    const currentYear: number = new Date().getFullYear();
    return currentYear;
  }
}
