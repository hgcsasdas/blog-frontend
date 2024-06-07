import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blogs/blog.service';
import { LikingSystemComponent } from '../../components/blog/liking-system/liking-system.component';
import { CommentSectionComponent } from '../../components/comment-section/comment-section.component';
import { LoadingPageComponent } from '../../components/loaders/loading-page/loading-page.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [LikingSystemComponent, CommentSectionComponent, LoadingPageComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [DatePipe]
})
export class BlogComponent implements OnInit {
  blog: any = null;
  blogContent: any[] = [];
  blogId: string = '';
  comments: any[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private datePipe: DatePipe
  ) { }

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
        this.blog.date = this.datePipe.transform(blog.date, 'short');
        this.blogContent = JSON.parse(blog.content);
        this.isLoading = false;

        if (blog.comments) {
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

  onLikesChanged() {
    this.buscarBlogEnBBDD(this.blogId);
  }

  trackById(index: number, item: any): any {
    return item.id;
  }
}
