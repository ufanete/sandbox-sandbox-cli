import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-search-bar',
  templateUrl: './navigation-search-bar.component.html',
  styleUrls: ['./navigation-search-bar.component.css']
})
export class NavigationSearchBarComponent  implements OnInit {

  timeout: any = null;

  @Output() 
  onKeyDown : EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  
  constructor() {}
  ngOnInit(): void {}

  // use hostlistener to handle any key input
  //@HostListener('window:keydown', ['$event'])
  handleKeyDown($event: KeyboardEvent) {
    console.log($event)
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      //if ($event.keyCode != 13) {
        $this.onKeyDown.emit($event);
      //}
    }, 1000);
    
  }

}
