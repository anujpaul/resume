import { Component } from '@angular/core';
import { AchievementsComponent } from "../achievements/achievements.component";
import { ExperienceComponent } from "../experience/experience.component";
import { CommonModule } from '@angular/common';
import { EducationComponent } from "../education/education.component";
import { IntroComponent } from "../intro/intro.component";
import { ChatComponent } from "../chat/chat.component";

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    AchievementsComponent,
    ExperienceComponent,
    CommonModule,
    EducationComponent,
    IntroComponent
],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {

 
}
