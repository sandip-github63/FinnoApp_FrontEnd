import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import endPoint from './helper';

@Injectable({
  providedIn: 'root',
})
export class ResetService {
  constructor(private http: HttpClient) {}

  //Generate OTP API call

  public generateOTP(email: any) {
    return this.http.post(`${endPoint}/api/reset-password/generate-otp`, email);
  }

  //Validate OTP API Call

  public validateOTP(emailandOtp: any) {
    return this.http.post(
      `${endPoint}/api/reset-password/validate-otp`,
      emailandOtp
    );
  }

  public updateUserPassword(newAndConfirmPassword: any) {
    return this.http.put(
      `${endPoint}/api/reset-password/update-password`,
      newAndConfirmPassword
    );
  }
}
