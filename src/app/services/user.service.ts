import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: any = [];
  constructor() {
    this.users = [
      {
        name: 'Trisect',
        Address: {
          city: 'noida',
          state: 'up'
        }
      },
      {
        name: 'Trisect',
        Address: {
          city: 'Gurgaon',
          state: 'Hry'
        }
      }

    ];
   }

   getUsers() {
     console.log('Fetching users from service');
     return this.users;
   }
}
