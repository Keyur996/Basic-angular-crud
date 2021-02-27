import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Users } from 'src/models/Users';
import { NgForm } from '@angular/forms'
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: Users = {
    firstName: '',
    lastName: '',
    email: ''
  };
  @Input() displayForm: boolean = false;
  @ViewChild('userForm') form: NgForm;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.form.valid){
      if(!this.form.valid){
        console.log('form is not valid');
      } else {
        this.dataService.addUser(Object.assign({}, this.user));
        this.displayForm = false;
        this.form.reset();
      }
    }
  }
}
