import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user: User = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  // Create a FormGroup to hold all form controls
  signupForm: FormGroup | any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize the form controls and validation rules
    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  formSubmit() {
    // Check if the form is valid before submitting

    if (
      this.user.userName.trim() == '' ||
      this.user.userName.trim() == null ||
      this.user.password.trim() == '' ||
      this.user.password.trim() == null
    ) {
      this.showErrorMessage('Please fill all required ..');
      return;
    }

    // Continue with form submission logic

    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        this.showSuccessMessage('User has been created successfully');
      },
      (error: any) => {
        //error when invalid username

        this.showErrorMessage('User name or email is already taken');
      }
    );
  }

  private showSuccessMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 5000, // 3 seconds
      panelClass: ['success-snackbar'], // You can define the styles in your CSS
    });
  }

  private showErrorMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: ['error-snackbar'],
    });
  }
}
