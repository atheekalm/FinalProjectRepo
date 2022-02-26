import { CreateProfileComponent } from './members/create-profile/create-profile.component';
import { MessagesComponent } from './messages/messages.component';
import { ServiceDetailsComponent } from './members/service-details/service-details.component';
import { ServiceListComponent } from './members/service-list/service-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'service/:id', component: ServiceDetailsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'createProfile', component: CreateProfileComponent },
  // { path: 'register', component: HomeComponent },
  // { path: '', component: HomeComponent },
  // { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
