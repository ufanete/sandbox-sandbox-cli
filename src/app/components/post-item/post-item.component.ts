import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Post } from '@app/models';;

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostItemComponent {

  @Input()
  post: Post = new Post();

  
  constructor(private sanitizer: DomSanitizer) {}

  sanitize(src: string): string {
    //bypassSecurityTrustResourceUrl
    return this.sanitizer.bypassSecurityTrustHtml(src).toString()
  }

  ngOnInit(): void {}
}
