import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Posts } from 'src/models/Posts';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @Output() newPost: EventEmitter<Posts> = new EventEmitter();
  @Output() updatedPost: EventEmitter<Posts> = new EventEmitter();
  @Input() currentPost: Posts;
  @Input() isEdit: boolean;

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
  }

  addPost = (title, body): void => {
    if (!title || !body) {
      alert('Please Enter Data');
    } else {
      this.postService.savePost({title, body} as Posts).subscribe(post => {
        this.newPost.emit(post);
      })
    }
  }

  updatePost = () => {
    this.postService.updatePost(this.currentPost).subscribe(post => {
      // console.log(post);
      this.isEdit = false;
      this.updatedPost.emit(post);
    })
  }
}