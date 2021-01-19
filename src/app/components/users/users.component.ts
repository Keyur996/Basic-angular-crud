import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Users } from '../../../models/Users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: Users;
  users: Users[];
  showExtended: boolean = false;
  showForm: boolean = false;
  enableAdd: boolean = false;
  isEdit: boolean = false;
  @ViewChild('userForm') form:any;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.users = this.dataService.getUsers();
  }

  onSubmit({value, valid}: {value:Users, valid:boolean}){
    if(!valid){
      console.log('form is not valid');
    } else {
      this.dataService.addUser(value);
      this.form.reset();
    }
  }

  editUser = (user: Users): void => {
    this.isEdit = true;
    this.showForm = true;
    this.user = user;
  }

  updateUser = (): void => {
    this.users.forEach((cur: Users, index) => {
      if (cur.email === this.user.email) {
        this.users.splice(index, 1);
        console.log(this.user);
        this.isEdit = false;
        this.showForm = false;
        this.users.unshift(this.user);
        this.user = {
          firstName: '',
          lastName: '',
          email: '',
        }
      }
    });
  }

  daleteUser = (user: Users): void => {
    this.user = user
    this.users.forEach((cur: Users, index) => {
      if (cur.email === this.user.email) {
        this.users.splice(index, 1);
      }
    });
  }

}
