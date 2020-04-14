import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdventureComponent } from './components/adventure/adventure.component';
import { PokedexDetailComponent } from './components/pokedex-detail/pokedex-detail.component';
import { RegistrationComponent } from './components/registration/registration.component';



const routes : Routes = [
  {component:LoginComponent, path:'login'},
  {component:LoginComponent, path:''},
  {component:RegistrationComponent, path: 'registration'},
  {component:HomeComponent, path:'home'},
  {component:AdventureComponent,path:'adventure'},
  {component:PokedexDetailComponent,path:'pokedex-detail'}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
