import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup | any;

  public user: User = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  formSubmit() {
    console.log('login is calling.....');

    // Check if the form is valid before submitting

    if (
      this.user.userName.trim() == '' ||
      this.user.userName.trim() == null ||
      this.user.password.trim() == '' ||
      this.user.password.trim() == null
    ) {
      this.showErrorMessage('Please fill required details');
      return;
    }

    // Continue with form submission logic

    this.loginService.generateToken(this.user).subscribe(
      (data: any) => {
        console.log('token is generated successfully....' + data);
        // Convert the object to a JSON string and log it
        const jsonData: any = JSON.stringify(data);

        // Parse the JSON string into an object
        const parsedData = JSON.parse(jsonData);

        console.log('parsedData having...' + parsedData);

        console.log(parsedData.token);

        console.log('token after generate :' + parsedData.token);

        this.loginService.setTokenLocalStorage(parsedData.token);

        console.log('check token is....' + this.loginService.getToken());

        this.loginService.getCurrentLoginUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);

            console.log('user data  ' + user);

            if (this.loginService.getUserRole() == 'ROLE_ADMIN') {
              //redirect  admin dashboard

              window.location.href = '/admin-dashboard';
            } else if (this.loginService.getUserRole() == 'ROLE_USER') {
              //redirect normal dashboard
              window.location.href = '/user-dashboard/0';
            } else {
              console.log('i am removing token.....');
              this.loginService.logOut();
            }
          },

          (error: any) => {
            const jsonData: any = JSON.stringify(error);

            // Parse the JSON string into an object
            const pd = JSON.parse(jsonData);

            console.log('Error !' + pd);
          }
        );

        // Show SweetAlert notification on success
        this.showSuccessMessage('login successfully');
      },
      (error) => {
        //error when invalid username

        const jsonData = JSON.stringify(error);

        console.log('Response data:', jsonData);

        this.showErrorMessage('Invalid UserName or Password');
      }
    );
  }

  signupPage() {
    //redirect signup page
    this.router.navigate(['/register']);
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
