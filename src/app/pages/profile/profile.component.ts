import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/auth/profile/profile.service';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blogs/blog.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  userBlogs: any[] = [];
  showApiKey: boolean = false;
  constructor(
    private profileService: ProfileService,
    private blogsService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserBlogs(sessionStorage.getItem('username') || '');
    this.getProfileData();
  }

  loadUserBlogs(userId: string): void {
    this.profileService.getUserBlogs(userId).subscribe(
      (blogs) => {
        this.userBlogs = blogs;
      },
      (error) => {
        console.error('Error fetching user blogs:', error);
      }
    );
  }

  getProfileData(): void {
    this.profileService.getProfile().subscribe(
      (response) => {
        this.profile = response;
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  editBlog(blog: any): void {
    this.router.navigate(['/create-blog', blog.id]);
  }

  deleteBlog(blog: any): void {

    this.blogsService.deleteBlog(blog.id).subscribe(
      (response) => {
        this.loadUserBlogs(sessionStorage.getItem('username') || '');
      },
    );

  }
}
