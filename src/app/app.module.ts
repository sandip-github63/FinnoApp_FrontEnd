import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ContactinfoComponent } from './contactinfo/contactinfo.component';
import { FooterComponent } from './footer/footer.component';
import { AdminModule } from './admin/admin.module';
import { VideoComponent } from './video/video.component';
import { CompanyComponent } from './company/company.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { DisplayArticlesComponent } from './articles/display-articles/display-articles.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LatestComponent } from './articles/latest/latest.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewArticleComponent } from './articles/view-article/view-article.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    HeroComponent,
    TestimonialsComponent,
    ContactinfoComponent,
    FooterComponent,
    VideoComponent,
    CompanyComponent,
    DisplayArticlesComponent,
    LatestComponent,
    ViewArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    AdminModule,
    AuthModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
