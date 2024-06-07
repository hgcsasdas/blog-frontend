import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LikingSystemService } from '../../../services/blogs/liking-system.service';

@Component({
  selector: 'app-liking-system',
  standalone: true,
  templateUrl: './liking-system.component.html',
  styleUrls: ['./liking-system.component.css'],
})
export class LikingSystemComponent implements OnInit {
  @Output() likesChanged = new EventEmitter<void>();
  @Input() likeCount: any = 0;
  @Input() dislikeCount: any = 0;
  @Input() blogId!: string;
  username!: string;
  liked: boolean = false;
  disliked: boolean = false;

  constructor(private likingService: LikingSystemService) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') ?? '';
  }

  toggleLike() {
    if (this.liked) {
      this.likingService.unlikeBlog(this.username, this.blogId).subscribe(
        () => {
          this.liked = false;
          this.likesChanged.emit(); // Emit likesChanged event
        },
        (error) => console.error('Error unliking blog:', error)
      );
    } else {
      this.likingService.likeBlog(this.username, this.blogId).subscribe(
        () => {
          this.liked = true;
          if (this.disliked) this.disliked = false;
          this.likesChanged.emit(); // Emit likesChanged event
        },
        (error) => console.error('Error liking blog:', error)
      );
    }
  }

  toggleDislike() {
    if (this.disliked) {
      this.likingService.undislikeBlog(this.username, this.blogId).subscribe(
        () => {
          this.disliked = false;
          this.likesChanged.emit(); // Emit likesChanged event
        },
        (error) => console.error('Error undisliking blog:', error)
      );
    } else {
      this.likingService.dislikeBlog(this.username, this.blogId).subscribe(
        () => {
          this.disliked = true;
          if (this.liked) this.liked = false; // Remove like if it was present
          this.likesChanged.emit(); // Emit likesChanged event
        },
        (error) => console.error('Error disliking blog:', error)
      );
    }
  }
}
