import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import endPoint from 'src/app/services/helper';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css'],
})
export class ViewArticleComponent implements OnInit {
  articleId: any;

  article: any;

  //image location
  imageLocation: String = '/api/serve/images/';

  constructor(
    private _route: ActivatedRoute,
    private _article: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleId = this._route.snapshot.params.articleId;

    this._article.getArticle(this.articleId).subscribe(
      (data: any) => {
        this.article = data;
      },
      (error: any) => {
        console.log(error);

        alert('something went wrong ');
      }
    );
  }

  public serverImage(imageName: string): string {
    return `${endPoint}${this.imageLocation}${imageName}`;
  }
}
