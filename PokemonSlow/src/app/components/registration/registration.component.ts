import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log("registered user submitted");
    // TODO add logic for registering user to back-end api
    this.router.navigate(['login']);
  }
  returnToLogin(){
    this.router.navigate(['login']);
  }

}
