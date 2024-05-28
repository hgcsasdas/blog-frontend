import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blogs/blog.service';
import { LikingSystemComponent } from '../../components/blog/liking-system/liking-system.component';
import { CommentSectionComponent } from '../../components/comment-section/comment-section.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [LikingSystemComponent, CommentSectionComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog: any = null;
  blogContent: any[] = [];
  blogId: string = '';
  comments: any[] = [];

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.blogId = params['blog'];
      this.buscarBlogEnBBDD(this.blogId);
    });
  }

  buscarBlogEnBBDD(blogId: string) {
    this.blogService.getBlogById(blogId).subscribe(blog => {
      this.blog = blog;
      try {
        this.blogContent = JSON.parse(blog.content);
        if (blog.comments) {
          // Convertir el objeto de comentarios en un array
          this.comments = Object.values(blog.comments);
        }
      } catch (error) {
        console.error('Error parsing blog content:', error);
      }
    }, error => {
      console.error(error);
    });
  }

  onCommentsChanged() {
    this.buscarBlogEnBBDD(this.blogId);
  }

  trackById(index: number, item: any): any {
    return item.id;
  }
}
