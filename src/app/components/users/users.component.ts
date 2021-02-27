import { Component, OnInit} from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { Users } from '../../../models/Users';
import { Subscription } from 'rxjs';
import { EditUserComponent } from './edit-user/edit-user.component';
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
  ref: NgbModalRef;
  showForm: boolean = false;
  private _sub: Subscription

  constructor(config: NgbModalConfig,
    private dataService: DataService,
    private modalService: NgbModal) {
    config.keyboard = false;
    config.backdrop = 'static';
  }

  ngOnInit(): void {
    this.users = this.dataService.getUsers();
    this._sub = this.dataService.userChanged.subscribe((users) => {
      this.users = users;
    });
    // console.log(this.users.length);
  }

  editUser = (user:Users): void => {
    this.ref=this.modalService.open(EditUserComponent, {
      centered: true,
    });
    // console.log(this.ref);
    this.ref.componentInstance.cu = Object.assign({}, user);
    this.ref.componentInstance.ref = this.ref;
  }

  daleteUser = (user: Users): void => {
    this.dataService.removeUser(user);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
