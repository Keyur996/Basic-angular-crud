import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { Users } from 'src/models/Users';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  isEdit: boolean = true;
  @ViewChild('cuForm') form: NgForm;
  cu: Users = {
    firstName: '',
    lastName: '',
    email: ''
  };
  ref: NgbModalRef;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  updateUser() {
    this.dataService.updateUser(this.cu);
    this.ref.close();
  }

}
