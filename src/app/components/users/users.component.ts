import { Component } from '@angular/core';
import { User } from '@app/models';;
import { DataService } from '@app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = [];
  
  searchResult$: Observable<User[]> | null = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  searchUser($event: any): void {
    const value = $event.target.value;
    console.log(value);
    this.searchResult$ = this.dataService.doUserSearch(value);
    /*.subscribe((searchResults) => {
       = searchResults;
      console.dir(searchResults);
    });;*/
  }
}
