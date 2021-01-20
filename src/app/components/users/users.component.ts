import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  enableAdd: boolean = false;
  isEdit: boolean = false;
  ref: any;
  @ViewChild('userForm') form:any;

  constructor(private dataService: DataService,
    private modalService: NgbModal) {
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
      this.clear();
      this.ref.close();
    }
  }

  editUser = (user: Users, form: any): void => {
    this.isEdit = true;
    this.popForm(form);
    this.user = user;
  }

  updateUser = (): void => {
    this.isEdit = false;
    this.dataService.updateUser(this.user);
    // this.form.reset();
    this.clear();
    this.ref.close();
  }

  daleteUser = (user: Users): void => {
    this.dataService.removeUser(user);
  }

  popForm = (form: any):void => {
    this.ref=this.modalService.open(form, {
        centered: true
      });
  }

  clear = ():void => {
    this.user = {
      firstName: '',
      lastName: '',
      email: ''
    }
  }
}
