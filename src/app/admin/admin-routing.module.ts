import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from '../home/home.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ViewArticlesComponent } from './view-articles/view-articles.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'add-article',
        component: AddArticleComponent,
      },
      {
        path: 'view-articles',
        component: ViewArticlesComponent,
      },
      {
        path: 'update-article/:articleId',
        component: UpdateArticleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
