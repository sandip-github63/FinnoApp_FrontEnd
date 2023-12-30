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
import { AddArticleComponent } from './add-article/add-article.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CKEditorModule } from 'ckeditor4-angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewArticlesComponent } from './view-articles/view-articles.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateArticleComponent } from './update-article/update-article.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    AddArticleComponent,
    ViewArticlesComponent,
    UpdateArticleComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    CKEditorModule,
    MatSnackBarModule,
    MatSelectModule,
    BrowserAnimationsModule,
  ],
})
export class AdminModule {}
