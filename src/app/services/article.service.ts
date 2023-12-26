import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import endPoint from './helper';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

  public addArticle(formdata:FormData){

    return this.http.post(`${endPoint}/api/article/create`,formdata);

  }


}
