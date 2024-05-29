import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/auth/profile/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  userBlogs: any[] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {

    this.profileService.getProfile().subscribe( response => {

      console.log('Profile data:', response);
      // (data) => {

      //   this.profile = data;
      //   if (this.profile?.id) {
      //     console.log('Profile:', this.profile);

      //     this.loadUserBlogs(this.profile.id);
      //   }
      // },
      // (error) => {
      //   console.error('Error fetching profile:', error);
      // }
    }
    );
  }

  loadUserBlogs(userId: string): void {
    this.profileService.getUserBlogs(userId).subscribe(
      (blogs) => {
        console.log('User blogs:', blogs);

        this.userBlogs = blogs;
      },
      (error) => {
        console.error('Error fetching user blogs:', error);
      }
    );
  }
}
