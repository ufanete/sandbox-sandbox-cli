import { Component, Input } from '@angular/core';
import { User } from '@app/models';
import { RouterService } from '@app/services';
import { environment } from '@environments/environment';
;

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
  
  @Input()
  index: number = 0;

  @Input()
  user!: User;

  url: string = environment.PAGE_CHAT_PRIVATE;
  
  constructor(private router: RouterService) {
  }
  

  goToChat() : void {
    console.dir(this.user);
    console.log(this.url);
    
    this.router.navigate([environment.PAGE_CHAT_PRIVATE, { id: this.user._id }]);
    debugger;
    //this.router.navigateByUrl(this.url);

  }


}
