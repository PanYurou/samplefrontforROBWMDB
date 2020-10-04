import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RequestService } from 'src/app/request.service';
import { Router } from '@angular/router';


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

  constructor(
    private request: RequestService,
    private router: Router
  ) {
    this.checkToken();
  }

  ngOnInit(): void {
  }
  checkToken(): any {
    this.request.httpPost('/api/auth/check_token').subscribe(
      () => {
        this.router.navigate(['/usermanage']);
      },
      error => {
        console.log(error);
      }
    );
  }

  login(): void {
    const params = {
      username: this.username,
      password: this.password
    };
    this.request.httpLogin('/api/auth/login', params).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.user.token);
        this.router.navigate(['/usermanage']);
      },
      error => {
        alert(error.error.msg);
      }
    );
  }

}
