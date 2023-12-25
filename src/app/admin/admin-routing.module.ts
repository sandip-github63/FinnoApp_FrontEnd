import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from '../home/home.component';
import { AddArticleComponent } from './add-article/add-article.component';

const routes: Routes = [

    {
      path:"admin-dashboard",
      component:DashboardComponent,
      children:[

        {
          path:"add-article",
          component:AddArticleComponent
        }


      ]
    },

   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
