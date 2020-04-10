import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("pressed signin");
    // TODO implement service that verifies username/password and returns their user id stored in a service
    this.router.navigate(['pokedex-detail'])
  }

  register(){
    console.log("pressed registration");
    this.router.navigate(['registration']);
  }

}
