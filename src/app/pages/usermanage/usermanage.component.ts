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

  page = 1;
  limit = 5;
  count = 0;

  email: string;


  search: string;

  constructor(
    public dialog: MatDialog,
    private request: RequestService
  ) {
    this.getUsers();
  }

  ngOnInit(): void {
  }

  getUsers(): void {
    this.request.httpGet('/api/v1/get_users', {
      limit: this.limit,
      page: this.page,
      search: this.search ? this.search : ''
    }).subscribe(
      (data: any) => {
        this.dataSource = data.data;
        this.limit = data.limit;
        this.page = data.page;
        this.count = data.count;
      },
      error => {
        alert(error.error.msg);
      }
    );
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

    dialogRef.afterClosed().subscribe(id => {
      if (!id) {
        return false;
      }
      this.getUsers();
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
      if (this.dataSource.length === 5) {
        this.dataSource.pop();
        console.log(this.dataSource.length);
      }
      this.dataSource = [result, ...this.dataSource];
      this.count = this.count + 1;
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


  pageChange(event): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getUsers();
  }
}
