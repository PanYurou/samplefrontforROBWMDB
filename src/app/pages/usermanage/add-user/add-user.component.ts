import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  username: string;
  usernameLength = 3;
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.usernameLength)
  ]);

  email: string;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  password: string;
  passLength = 5;
  passwordValidators = new FormControl('', [
    Validators.required,
    Validators.minLength(this.passLength)
  ]);

  retypePassword: string;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): any {

    if (this.checkField() === false) {
      alert('Please Check Field Errors!');
      return false;
    }
    if (this.checkPasswordMatch() === false) {
      alert('Password Doesnt Match!');
      return false;
    }

    const newData = {
      id: 'sdfsdsdsdfsdf' + Math.floor(Math.random() * Math.floor(200)),
      username: this.username,
      email: this.email
    };
    this.dialogRef.close(newData);
  }

  checkField(): boolean {
    if (
      this.usernameFormControl.hasError('required') ||
      this.usernameFormControl.hasError('minlength') ||
      this.emailFormControl.hasError('email') ||
      this.emailFormControl.hasError('required') ||
      this.passwordValidators.hasError('required') ||
      this.passwordValidators.hasError('minlength')
      ) {
      return false;
    }else{
      return true;
    }
  }

  checkPasswordMatch(): boolean {
    if (this.password !== this.retypePassword) {
      return false;
    }else{
      return true;
    }
  }

}
