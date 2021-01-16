import { Component, OnInit, ViewChild } from '@angular/core';
import { Users } from '../../../models/Users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: Users ={
    firstName: '',
    lastName: '',
    email: ''
  }
  users: Users[];
  showExtended = false;
  showForm = false;
  enableAdd = false;
  @ViewChild('userForm') form:any;

  constructor() {
  }

  ngOnInit(): void {
    this.users = [
      {
        firstName: 'Keyur',
        lastName: 'Machhi',
        email: 'keyur@gmail.com',
        expand: false,
        isActive: true,
        joined: new Date('05-21-1998')
      },
      {
        firstName: 'Mayur',
        lastName: 'Kothiwala',
        email: 'mayur@gmail.com',
        expand: false,
        isActive: false,
        joined: new Date('05-17-1998')
      }
    ];
  }

  onSubmit({value, valid}: {value:Users, valid:boolean}){
    if(!valid){
      console.log('form is not valid');
    } else {
      value.isActive = true;
      value.joined = new Date();
      value.expand = false;
      this.users.unshift(value);

      this.form.reset();
    }
  }
}
