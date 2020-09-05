import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  usernameFormControl = new FormControl('', [
    Validators.required
  ]);

  password: string;
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor() { }

  ngOnInit(): void {
  }

}
