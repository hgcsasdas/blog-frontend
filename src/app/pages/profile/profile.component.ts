import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/auth/profile/profile.service';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blogs/blog.service';
import { LoadingPageComponent } from '../../components/loaders/loading-page/loading-page.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LoadingPageComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  userBlogs: any[] = [];
  showApiKey: boolean = false;
  isLoading: boolean = true; // Nueva propiedad para controlar la carga

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
        this.isLoading = false; // Deja de cargar cuando se reciben los blogs
      },
      (error) => {
        console.error('Error fetching user blogs:', error);
        this.isLoading = false; // Deja de cargar incluso si hay un error
      }
    );
  }

  getProfileData(): void {
    this.profileService.getProfile().subscribe(
      (response) => {
        this.profile = response.userDto;
        this.isLoading = false; // Deja de cargar cuando se recibe el perfil
      },
      (error) => {
        console.error('Error fetching profile:', error);
        this.isLoading = false; // Deja de cargar incluso si hay un error
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
