import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
  ]
})
export class AdminModule { }
