import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProfileService } from '../../services/auth/profile/profile.service';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blogs/blog.service';
import { LoadingPageComponent } from '../../components/loaders/loading-page/loading-page.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LoadingPageComponent, DatePipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  userBlogs: any[] = [];
  showApiKey: boolean = false;
  isLoading: boolean = true;

  constructor(
    private profileService: ProfileService,
    private blogsService: BlogService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadUserBlogs(sessionStorage.getItem('username') || '');
    this.getProfileData();
  }

  loadUserBlogs(userId: string): void {
    this.profileService.getUserBlogs(userId).subscribe(
      (blogs) => {
        if (blogs) {
          this.userBlogs = blogs.map(blog => {
            blog.date = this.datePipe.transform(blog.date, 'short');
            return blog;
          });
        } else {
          this.userBlogs = [];
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching user blogs:', error);
        this.isLoading = false;
      }
    );
  }


  getProfileData(): void {
    this.profileService.getProfile().subscribe(
      (response) => {
        this.profile = response.userDto;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching profile:', error);
        this.isLoading = false;
      }
    );
  }

  toggleApiKeyVisibility(): void {
    this.showApiKey = !this.showApiKey;
  }

  editBlog(blog: any): void {
    this.router.navigate(['/create-blog', blog.id]);
  }

  deleteBlog(blog: any): void {
    this.blogsService.deleteBlog(blog.id).subscribe(
      (response) => {
        this.loadUserBlogs(sessionStorage.getItem('username') || '');
      },
      (error) => {
        console.error('Error deleting blog:', error);
      }
    );
  }
}
