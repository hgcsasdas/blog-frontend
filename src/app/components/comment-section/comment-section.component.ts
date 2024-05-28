import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/blogs/comments.service';

interface CommentDto {
  author: string;
  content: string;
}

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css'],
})
export class CommentSectionComponent implements OnInit {
  @Input() blogId!: string;
  @Input() comments: any[] = [];
  @Output() commentsChanged = new EventEmitter<void>();
  commentForm!: FormGroup;
  username!: string;

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') ?? '';
    this.commentForm = this.fb.group({
      content: [''],
    });
  }

  addComment() {
    const commentDto: CommentDto = {
      author: this.username,
      content: this.commentForm.value.content,
    };

    this.commentService.addCommentToBlog(this.blogId, commentDto).subscribe(
      (response) => {
        this.commentsChanged.emit();
        this.commentForm.reset();
        // if (response.success) {
        // } else {
        //   console.error('Error adding comment:', response.message);
        // }
      },
      (error) => console.error('Error adding comment:', error)
    );
  }

  deleteComment(index: number) {
    const comment = this.comments[index];
    this.commentService
      .deleteComment(comment.author, { author: comment.author })
      .subscribe(
        (response) => {
          if (response.success) {
            this.commentsChanged.emit();
          } else {
            console.error('Error deleting comment:', response.message);
          }
        },
        (error) => console.error('Error deleting comment:', error)
      );
  }

  updateComment(index: number, newContent: string) {
    const comment = this.comments[index];
    this.commentService
      .updateComment(comment.author, { content: newContent })
      .subscribe(
        (response) => {
          if (response.success) {
            this.commentsChanged.emit();
          } else {
            console.error('Error updating comment:', response.message);
          }
        },
        (error) => console.error('Error updating comment:', error)
      );
  }
}
