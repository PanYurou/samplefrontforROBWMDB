import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

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

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): any {
    if (this.checkField() === false) {
      alert('Check Field Erros!');
      return false;
    }else{
      this.dialogRef.close(this.data);
    }
  }

  checkField(): boolean {
    if (
      this.usernameFormControl.hasError('required') ||
      this.usernameFormControl.hasError('minlength') ||
      this.emailFormControl.hasError('email') ||
      this.emailFormControl.hasError('required')
      ) {
      return false;
    }else{
      return true;
    }
  }

}
