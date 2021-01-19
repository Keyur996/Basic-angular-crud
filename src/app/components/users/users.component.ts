import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Users } from '../../../models/Users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: Users = {
    firstName: '',
    lastName: '',
    email: ''
  };
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
    // console.log(this.users.length);
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
    this.isEdit = false;
    this.showForm = false;
    this.dataService.updateUser(this.user);
    // this.form.reset();
    this.user = {
      firstName: '',
      lastName: '',
      email: ''
    }
  }

  daleteUser = (user: Users): void => {
    this.dataService.removeUser(user);
  }

}
