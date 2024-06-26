import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ComponentListComponent } from '../../components/blog/component-list/component-list.component';
import { ComponentMenuComponent } from '../../components/blog/component-menu/component-menu.component';
import { CanvasComponent } from '../../components/blog/canvas/canvas.component';
import { Componente } from '../../services/blogs/componentes/componente';
import { BlogDto } from '../../services/blogs/DTO/BlogDto';
import { BlogService } from '../../services/blogs/blog.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TutorialPopupComponent } from '../../components/blog/tutorial-popup/tutorial-popup.component';
import { ErrorComponent } from '../../components/alerts/error/error.component';
import { SuccessComponent } from '../../components/alerts/success/success.component';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    ComponentListComponent,
    ComponentMenuComponent,
    CanvasComponent,
    ReactiveFormsModule,
    TutorialPopupComponent,
    SuccessComponent,
    ErrorComponent,
  ],
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  canvasComponents: Componente[] = [];
  blogForm: FormGroup;
  isEditMode: boolean = false;
  blogId: string | null = null;
  isSuccess: boolean = true;
  showMessage: boolean = false;
  msg: string = '';

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.blogForm = this.fb.group({
      title: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('idBlog');
      if (id) {
        this.isEditMode = true;
        this.blogId = id;
        this.loadBlog(id);
      }
    });
  }

  loadBlog(id: string): void {
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        this.blogForm.patchValue({ title: blog.title });
        this.canvasComponents = JSON.parse(blog.content);
      },
      error: (error) => {
        console.error('Error loading blog:', error);
      },
    });
  }

  addComponent(component: Componente) {
    this.canvasComponents.push(component);
  }

  removeComponent(id: string) {
    this.canvasComponents = this.canvasComponents.filter(
      (component) => component.id !== id
    );
  }

  saveOrUpdateBlog() {
    const blogDto: BlogDto = {
      title: this.blogForm.value.title,
      author: sessionStorage.getItem('username') || '',
      content: JSON.stringify(this.canvasComponents),
      token: sessionStorage.getItem('token') || '',
    };

    if (this.isEditMode && this.blogId) {
      this.blogService.updateBlog(this.blogId, blogDto).subscribe({
        next: (response) => {
          if (response.done) {
            this.isSuccess = true;
            this.msg = response.message;
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 2000);
          } else {
            this.isSuccess = false;
            this.msg = response.message;
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 2000);
            console.error('Error actualizando el blog:', response.message);
          }
        },
        error: (error) => {
          console.error('Error al actualizar el blog:', error);
        },
      });
    } else {
      this.blogService.createBlog(blogDto).subscribe({
        next: (response) => {
          if (response.done) {
            this.isSuccess = true;
            this.msg = response.message;
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 2000);
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
        error: (error) => {
          console.error('Error al registrar el blog:', error);
        },
      });
    }
  }

}
