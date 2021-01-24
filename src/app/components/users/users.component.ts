import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
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
  cu: Users = {
    firstName: '',
    lastName: '',
    email: '',
  };
  users: Users[];
  showExtended: boolean = false;
  enableAdd: boolean = false;
  isEdit: boolean = false;
  ref: any;
  showForm: boolean = false;
  @ViewChild('userForm') form:any;

  constructor(config: NgbModalConfig,
    private dataService: DataService,
    private modalService: NgbModal) {
    config.keyboard = false;
    config.backdrop = 'static';
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
      this.showForm = false;
      this.clear();
      this.ref.close();
    }
  }

  editUser = (user:Users, form: any): void => {
    this.isEdit = true;
    this.showForm = false;
    this.cu = user;
    this.popForm(form);
  }

  updateUser = (): void => {
    this.isEdit = false;
    this.dataService.updateUser(this.cu);
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
