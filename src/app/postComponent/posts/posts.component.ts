import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Posts } from 'src/models/Posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Posts[];
  currentPost: Posts = {
    id: 0,
    title: '',
    body: ''
  };
  isEdit: boolean = false;

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.getPost().subscribe(posts => {
      this.posts = posts;
    });
  }

  onNewPost = (post: Posts): void  => {
    this.posts.unshift(post);
  }

  editPost = (post: Posts): void => {
    this.currentPost = post;
    this.isEdit = true;
  };

  onUpdatePost = (post: Posts): void => {
    this.posts.forEach((cur, index) => {
      if (post.id === cur.id) {
        this.posts.splice(index, 1);
        this.isEdit = false;
        this.posts.unshift(post);
        this.currentPost = {
          id: 0,
          title: '',
          body: ''
        }
      }
    });
  };

  removePost = (post: Posts) => {
    if (confirm('Are You sure?')) {
      this.postService.deletePost(post.id).subscribe(() => {
        this.posts.forEach((cur, index) => {
          if (post.id === cur.id) {
            this.posts.splice(index, 1);
          }
        });
      });
    }
  }

}
