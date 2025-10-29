import { Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    { path: '', component: ResumeComponent},
    { path: 'achievements', component: AchievementsComponent },
    { path: 'experience', component: ExperienceComponent },  
    {path: 'education', component: EducationComponent},
    {path: 'about-us', component: AboutUsComponent}
    

];
