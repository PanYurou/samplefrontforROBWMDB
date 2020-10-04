
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private request: RequestService
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitDelete(): void{
    this.request.httpDelete('/api/v1/delete_user?id=' + this.data.id).subscribe(
      () => {
        this.dialogRef.close(this.data.id);
      },
      error => {
        alert(error.error.msg);
      }
    );
  }

}
