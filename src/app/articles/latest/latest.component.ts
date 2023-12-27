import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css'],
})
export class LatestComponent implements OnInit {
  articles: any | null = [];

  //Date Show Error message

  showError: boolean = false;

  //search bar
  filterArticle: any | null = [];

  //pagination

  pageSize: any = 10;

  currentPage = 0;

  pageSizeOp = [10, 5, 3];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private _article: ArticleService) {}

  ngOnInit(): void {
    this._article.getAllArticles().subscribe(
      (data: any) => {
        // Store the data in the 'articles' variable
        this.articles = data;
        this.filterArticle.data = this.articles.data;

        console.log(data);
      },
      (error: any) => {
        console.log(error);
        alert('error');
      }
    );
  }

  // Add a function to handle page change
  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginator.pageIndex = this.currentPage;
  }

  get pagedArticles() {
    const startIndex = this.currentPage * this.pageSize;
    return this.filterArticle.data.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  //search bar logic for filter the Article from list of article

  public filterArticles(searchValue: string) {
    this.showError = false;
    if (!searchValue) {
      // If the search input is empty, show all Articles
      this.filterArticle.data = this.articles.data;
    } else {
      this.filterArticle.data = this.articles.data.filter((article: any) => {
        return article.title.toLowerCase().includes(searchValue.toLowerCase());
        //||article.content.toLowerCase().includes(searchValue.toLowerCase())
      });
    }
  }

  //dateWise search

  public datePicked(date: any) {
    this.filterArticle.data = this.articles.data.filter((article: any) => {
      return article.publicationDate.toLowerCase().includes(date.toLowerCase());
    });

    // Set this.showError based on whether there are matching articles
    this.showError = this.filterArticle.data.length === 0;
  }
}
