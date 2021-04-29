import { Component, OnInit } from '@angular/core';
import {
  NgbConfig,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';
import { Posts } from 'src/models/Posts';
import swal from 'sweetalert';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Posts[];
  currentPost: Posts = {
    id: 0,
    title: '',
    body: '',
  };
  isEdit: boolean = false;
  ref: any;

  constructor(
    private postService: PostsService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.postService.getPost().subscribe((posts) => {
      this.posts = posts;
      console.log(posts);
    });
  }

  onNewPost = (post: Posts): void => {
    this.posts.unshift(post);
    swal('Created...', 'Post Added Successfully', 'success').then(() => {
      this.clear();
      this.ref.close();
    });
  };

  editPost = (post: Posts, form: any): void => {
    this.currentPost = Object.assign({}, post);
    this.isEdit = true;
    this.popform(form);
  };

  onUpdatePost = (post: Posts): void => {
    this.posts.forEach((cur, index) => {
      if (post.id === cur.id) {
        this.posts.splice(index, 1);
        this.isEdit = false;
        this.posts.unshift(post);
        swal('Upadted....', 'Post Updated Successfully', 'success').then(() => {
          this.clear();
        });
      }
    });
  };

  popform = (form: any) => {
    this.ref = this.modalService.open(form, {
      centered: true,
    });
  };

  clear = () => {
    this.currentPost = {
      id: 0,
      title: '',
      body: '',
    };
    this.isEdit = false;
    this.ref.close();
  };

  removePost = (post: Posts) => {
    swal({
      title: 'Are you sure ?',
      text: 'Can not Recover data',
      icon: 'warning',
      buttons: ['Cancel', true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.postService.deletePost(post.id).subscribe(() => {
          this.posts.forEach((cur, index) => {
            if (post.id === cur.id) {
              this.posts.splice(index, 1);
              swal('Deleted..', 'Post Deleted successfully..', 'success');
            }
          });
        });
      } else {
        swal({
          title: 'You are safe!!',
          icon: 'info',
        });
      }
    });
  };
}
