import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Post } from 'src/app/document.schema';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  addPost(post: Post) {
    this.dataService.addPost(post).subscribe((post) => this.posts.push(post));
  }

}
