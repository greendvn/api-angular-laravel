import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  usersFilter: User[] = [];
  users: User[] = [];
  key;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(next=>(this.users= next, this.usersFilter  = next ), error => (this.users = []));

  }

  deleteUser(id){
    this.userService.deleteUser(id).subscribe(() => {this.users= this.users.filter(user => user.id !== id)});
  }

  search(event){
    this.key = event.toLowerCase();
    this.usersFilter = this.users.filter(user=>user.name.toLowerCase().includes(this.key));
    if (this.usersFilter.length ==0){
      this.usersFilter = this.users;
    }
  }

}
