import { Component, Input } from '@angular/core';
import { User } from '@app/models';;

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
  
  @Input()
  user: User = new User();

  
  constructor() {}


}
