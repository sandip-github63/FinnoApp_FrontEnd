import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewArticleComponent } from './articles/view-article/view-article.component';
import { LatestComponent } from './articles/latest/latest.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'view-article/:articleId',
    component: ViewArticleComponent,
  },
  {
    path: 'latest-article',
    component: LatestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
