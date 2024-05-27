import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blogs/blog.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { RouterLink, Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs: any[] = [];
  displayedBlogs: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;

  // Inject Router here
  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.blogs = response;
          this.totalPages = Math.ceil(this.blogs.length / this.itemsPerPage);
          this.updateDisplayedBlogs();
        } else {
          console.error('La respuesta no es un array:', response);
        }
      },
      error: (error: any) => {
        console.error('Error al obtener blogs:', error);
      },
    });
  }

  updateDisplayedBlogs(): void {
    const filteredBlogs = this.filterBlogs(this.blogs, this.searchQuery);
    this.totalPages = Math.ceil(filteredBlogs.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedBlogs = filteredBlogs.slice(startIndex, endIndex);
  }

  seeBlog(id: string) {
    this.router.navigate(['/blog', id]);
  }

  filterBlogs(blogs: any[], query: string): any[] {
    if (!query) {
      return blogs;
    }
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedBlogs();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedBlogs();
    }
  }

  ngOnChanges(): void {
    this.updateDisplayedBlogs();
  }
}
