import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResetService } from 'src/app/services/reset.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;

  EmailId: any = {
    email: '',
  };

  emailandOTP: any = {
    email: '',
    otp: '',
  };

  isShowEmail: boolean = true;

  isShowPassword: boolean = false;

  passwordFieldType: string = 'password';

  newAndConfirmPassword: any = {
    email: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(
    private fb: FormBuilder,
    private _reset: ResetService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: [''],
      newpassword: [''],
      confirmPassword: [''],
    });
  }

  get email() {
    return this.resetForm.get('email');
  }

  ngOnInit(): void {}

  onSubmitEmail() {
    if (this.resetForm.valid) {
      // Implement your password reset logic here

      const enteredEmail = this.resetForm.value.email;

      this.EmailId.email = enteredEmail;

      this._reset.generateOTP(this.EmailId).subscribe(
        (data: any) => {
          this.isShowEmail = false;
          this._snack.open('OTP send Successfully', '', { duration: 3000 });
        },
        (error: any) => {
          console.log(
            'OTP ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRr..............'
          );
          console.log(error);
        }
      );
    } else {
      // Mark the form and controls as touched to display validation messages
      this.resetForm.markAllAsTouched();
    }
  }

  public onSubmitOTP() {
    const enteredOTP = this.resetForm.get('otp')?.value;
    this.emailandOTP.email = this.EmailId.email;
    this.emailandOTP.otp = enteredOTP;

    this._reset.validateOTP(this.emailandOTP).subscribe(
      (data: any) => {
        this.isShowPassword = true;
        this._snack.open('OTP validate successfully ', '', { duration: 3000 });
      },
      (error: any) => {
        this._snack.open('Invalid OTP !!!..', '', { duration: 6000 });

        console.log(error);
      }
    );
  }

  public showEmail() {
    this.isShowEmail = true;
    console.log(this.resetForm.value);
  }

  public changePassword() {
    this.newAndConfirmPassword.email = this.emailandOTP.email;
    this.newAndConfirmPassword.newPassword =
      this.resetForm.get('newpassword')?.value;
    this.newAndConfirmPassword.confirmPassword =
      this.resetForm.get('confirmPassword')?.value;

    this._reset.updateUserPassword(this.newAndConfirmPassword).subscribe(
      (data: any) => {
        this._snack.open('Your Password is Updated.', '', { duration: 3000 });

        //redirect login page

        this._router.navigate(['/login']);
      },
      (error: any) => {
        this._snack.open('Please enter valid password', '', { duration: 3000 });
        console.log(error);
      }
    );
    //rest of code to change the password
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
