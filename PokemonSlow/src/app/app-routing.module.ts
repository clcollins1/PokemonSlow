import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdventureComponent } from './components/adventure/adventure.component';



const routes : Routes = [
  {component:LoginComponent, path:'login'},
  {component:HomeComponent, path:'home'},
  {component:AdventureComponent,path:'adventure'},
  {component:LoginComponent, path:''},
  {component:LoginComponent, path: '**'}
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
