import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public email: string;
  public username: string;
  public password: string;

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.email, this.username, this.password);
  }

}
