import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/auth/profile/profile.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserBlogs(sessionStorage.getItem('username') || '');
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

  editBlog(blog: any): void {
    this.router.navigate(['/create-blog', blog.id]);
  }

  deleteBlog(blog: any): void {
    // Aquí añadir la lógica para eliminar el blog
    console.log('Eliminar blog:', blog);
  }
}
