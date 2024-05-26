import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ComponentListComponent } from '../../components/blog/component-list/component-list.component';
import { ComponentMenuComponent } from '../../components/blog/component-menu/component-menu.component';
import { CanvasComponent } from '../../components/blog/canvas/canvas.component';
import { Componente } from '../../services/blogs/componentes/componente';
import { BlogDto } from '../../services/blogs/DTO/BlogDto';
import { BlogService } from '../../services/blogs/blog.service';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    ComponentListComponent,
    ComponentMenuComponent,
    CanvasComponent,
  ],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css',
})
export class CreateBlogComponent {
  canvasComponents: Componente[] = [];
  constructor(private blogService: BlogService) {}

  addComponent(component: Componente) {
    this.canvasComponents.push(component);
  }
  saveBlog() {
    const blogDto: BlogDto = {
      title: 'Holaaa',
      author: 'Hgc',
      content: JSON.stringify(this.canvasComponents),
    };

    this.blogService.createBlog(blogDto).subscribe({
      next: (response) => {
        if (response.done) {
          // this.successMessage = response.message;
          // this.registerForm.reset();
          console.log('Blog registrado con éxito');

        } else {
          // this.errorMessage = response.message;
        }
      },
      error: (error) => {
        console.error(error);
        // this.errorMessage =
        //   'Error al registrar. Por favor, inténtalo de nuevo.';
      },
    });
  }
}
