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
  updateForm!: FormGroup;
  username!: string;
  isModalOpen = false;
  commentToUpdate: any;

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') ?? '';
    this.commentForm = this.fb.group({
      content: [''],
    });
    this.updateForm = this.fb.group({
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
      },
      (error) => console.error('Error adding comment:', error)
    );
  }

  deleteComment(index: string, author: string) {
    this.commentService
      .deleteComment(index, author, this.blogId)
      .subscribe(
        (response) => {
          if (response.done) {
            this.commentsChanged.emit();
          } else {
            console.error('Error deleting comment:', response.message);
          }
        },
        (error) => console.error('Error deleting comment:', error)
      );
  }

  openUpdateModal(comment: any) {
    this.isModalOpen = true;
    this.commentToUpdate = comment;
    this.updateForm.patchValue({ content: comment.content });
  }

  closeUpdateModal() {
    this.isModalOpen = false;
    this.commentToUpdate = null;
  }

  submitUpdate() {
    if (this.updateForm.valid) {
      const updatedContent = this.updateForm.value.content;
      this.commentService
        .updateComment(this.commentToUpdate.id, updatedContent, this.username, this.blogId)
        .subscribe(
          (response) => {
            if (response.done) {
              this.commentsChanged.emit();
              this.closeUpdateModal();
            } else {
              console.error('Error updating comment:', response.message);
            }
          },
          (error) => console.error('Error updating comment:', error)
        );
    }
  }
}
