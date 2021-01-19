import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataService } from './services/data.service';
import { PostsComponent } from './postComponent/posts/posts.component';
import { PostsService } from './services/posts.service';
import { PostFormComponent } from './postComponent/post-form/post-form.component';
import { AppRouterModule } from './app-router.module';
import { HomeComponent } from './components/home/home.component';
import { PostDetailComponent } from './postComponent/post-detail/post-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    PostsComponent,
    PostFormComponent,
    HomeComponent,
    PostDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouterModule
  ],
  providers: [DataService, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
