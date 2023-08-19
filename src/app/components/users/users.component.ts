import { Component } from '@angular/core';
import { User } from '@app/models';;
import { DataService } from '@app/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
