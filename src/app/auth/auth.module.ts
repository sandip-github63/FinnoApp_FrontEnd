import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Add the following imports for Angular Material components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card'; // Add this line
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    //MatButtonModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
