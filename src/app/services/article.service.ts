import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import endPoint from './helper';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  public addArticle(formdata: FormData) {
    return this.http.post(`${endPoint}/api/article/create`, formdata);
  }

  public getAllArticles() {
    return this.http.get(`${endPoint}/api/article/get/all-articles`);
  }

  public getArticle(articleId: any) {
    return this.http.get(`${endPoint}/api/article/get/${articleId}`);
  }

  public getLatestArticles() {
    return this.http.get(`${endPoint}/api/article/get/latest-articles`);
  }

  public getUserArticles(userId: number) {
    return this.http.get(`${endPoint}/api/article/get/user-articles/${userId}`);
  }
}
