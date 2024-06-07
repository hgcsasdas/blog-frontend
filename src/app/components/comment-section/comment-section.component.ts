import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/blogs/comments.service';
import { ErrorComponent } from '../alerts/error/error.component';
import { SuccessComponent } from '../alerts/success/success.component';

interface CommentDto {
  author: string;
  content: string;
  token: string;
}

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SuccessComponent,
    ErrorComponent,
  ],
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
  isSuccess: boolean = true;
  showMessage: boolean = false;
  msg: string = '';

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

  deleteComment(index: string, author: string) {
    this.commentService.deleteComment(index, author, this.blogId).subscribe(
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

  addComment() {
    const commentContent = this.commentForm.value.content.trim(); // Elimina los espacios en blanco al principio y al final del contenido del comentario
    if (!commentContent) { // Verifica si el contenido del comentario está vacío
      this.isSuccess = false;
      this.msg = 'El comentario no puede estar vacío';
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
      return; // Detén la función si el comentario está vacío
    }

    const commentDto: CommentDto = {
      author: this.username,
      content: commentContent,
      token: sessionStorage.getItem('token') || '',
    };

    this.commentService.addCommentToBlog(this.blogId, commentDto).subscribe({
      next: (response) => {
        if (response.done) {
          this.isSuccess = true;
          this.msg = response.message;
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 2000);
          this.commentsChanged.emit();
          this.commentForm.reset();
        } else {
          this.isSuccess = false;
          this.msg = response.message;
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 2000);
          console.error('Error creando el blog:', response.message);
        }
      },
      error: (error) => console.error('Error adding comment:', error),
      complete: () => {
        this.commentsChanged.emit();
        this.commentForm.reset();
      },
    });
  }

  submitUpdate() {
    const updatedContent = this.updateForm.value.content.trim(); // Elimina los espacios en blanco al principio y al final del contenido actualizado del comentario
    if (!updatedContent) { // Verifica si el contenido actualizado del comentario está vacío
      this.isSuccess = false;
      this.msg = 'El comentario no puede estar vacío';
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
      return; // Detén la función si el comentario está vacío
    }

    this.commentService
      .updateComment(
        this.commentToUpdate.id,
        updatedContent,
        this.username,
        this.blogId
      )
      .subscribe({
        next: (response) => {
          if (response.done) {

            this.isSuccess = true;
            this.msg = response.message;
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 2000);
            this.commentsChanged.emit();
            this.commentForm.reset();
          } else {
            this.isSuccess = false;
            this.msg = response.message;
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 2000);
            console.error('Error actualizando el comentario:', response.message);
          }
        },
        error: (error) => console.error('Error updating comment:', error),
        complete: () => {
          this.commentsChanged.emit();
          this.commentForm.reset();
        },
      });
  }

}
