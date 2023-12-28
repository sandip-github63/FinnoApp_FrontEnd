import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-display-articles',
  templateUrl: './display-articles.component.html',
  styleUrls: ['./display-articles.component.css'],
})
export class DisplayArticlesComponent implements OnInit {
  articles: any | null = [];

  constructor(private _article: ArticleService) {}

  ngOnInit(): void {
    this._article.getLatestArticles().subscribe(
      (data: any) => {
        this.articles = data;
      },
      (error: any) => {
        alert('something went wrong');
      }
    );
  }
}
