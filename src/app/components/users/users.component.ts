import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
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
}
