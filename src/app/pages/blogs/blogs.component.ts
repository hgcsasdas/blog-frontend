import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogService } from '../../services/blogs/blog.service';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LoadingPageComponent } from '../../components/loaders/loading-page/loading-page.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LoadingPageComponent],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  providers: [DatePipe],
})
export class BlogsComponent implements OnInit, OnChanges {
  blogs: any[] = [];
  displayedBlogs: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;
  isLoading: boolean = true;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loadBlogs();
  }

  ngOnChanges() {
    this.updateDisplayedBlogs();
  }

  loadBlogs() {
    this.blogService.getAllBlogs().subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.blogs = response.map((blog) => {
            blog.date = this.datePipe.transform(blog.date, 'short');
            return blog;
          });
          this.isLoading = false;
          this.totalPages = Math.ceil(this.blogs.length / this.itemsPerPage);
          this.updateDisplayedBlogs();
        } else {
          console.error('La respuesta no es un array:', response);
        }
      },
      error: (error: any) => {
        console.error('Error al obtener blogs:', error);
        this.isLoading = false;
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
    return blogs.filter((blog) =>
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

  filterByTitle() {
    this.updateDisplayedBlogs();
  }
}
