import { RequestService } from './../../request.service';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.scss']
})
export class UsermanageComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'email', 'action'];
  dataSource = [
    { id: 'sdfsdfsdfsdfsdfsdf1', username: 'John', email: 'john@gmail.com' },
    { id: 'sdfsdfsdfsdfsdfsdf2', username: 'Mike', email: 'mike@gmail.com' },
    { id: 'sdfsdfsdfsdfsdfsdf3', username: 'jenuel', email: 'jenuel@gmail.com' },
  ];

  email: string;
  constructor(
    public dialog: MatDialog,
    private request: RequestService
  ) { }

  ngOnInit(): void {
  }

  editUser(item: any): any {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '300px',
      data: {
        id: item.id,
        username: item.username,
        email: item.email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return false;
      }
      this.changeData(result.id, result);
    });

  }

  deleteUser(item: any): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '350px',
      data: {
        id: item.id,
        username: item.username
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return false;
      }
      this.removeData(result.id);
    });
  }


  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '300px'
    });


    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return false;
      }
      this.dataSource = [result, ...this.dataSource];
    });
  }

  changeData(id, data): any {
    this.dataSource.forEach(item => {
      if (item.id === id) {
        item.username = data.username;
        item.email = data.email;
      }
    });
  }

  removeData(id): void {
    this.dataSource = this.dataSource.filter(obj => obj.id !== id);
  }
}
