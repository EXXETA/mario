import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private email: string;
  private username: string;
  private password: string;

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.email, this.username, this.password);
  }

}
