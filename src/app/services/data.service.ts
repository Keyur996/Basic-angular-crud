import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Users } from 'src/models/Users';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userChanged: Subject<Users[]> = new Subject<Users[]>();
  users: Users[];

  constructor() {
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

  getUsers = () : Users[] => {
    return this.users.slice();
  };

  addUser = (user: Users) => {
    user.isActive = true;
    user.joined = new Date();
    user.expand = false;
    this.users.unshift(user);
    this.userChanged.next(this.users.slice());
  }

  updateUser = (user: Users) => {
    this.users.forEach((cur: Users, index) => {
      if (cur.email === user.email) {
        console.log(user);
        this.users.splice(index, 1);
        this.users.unshift(user);
      }
    });
    this.userChanged.next(this.users.slice());
  }

  removeUser = (user: Users) => {
    this.users.forEach((cur: Users, index) => {
      if (cur.email === user.email) {
        this.users.splice(index, 1);
        console.log(this.users.length);
      }
    });
    this.userChanged.next(this.users.slice());
  }
}
