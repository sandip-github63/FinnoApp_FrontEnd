import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  selectedFile: File | null = null;
  selectedFileName: string | null = null;

  formData = {
    title: '',
    content: '',
    userId: '',
  };

  constructor(
    private _article: ArticleService,
    private _snackBar: MatSnackBar,
    private _login: LoginService
  ) {}

  ngOnInit(): void {
    const user = this._login.getUser();
    this.formData.userId = user.userWithAuthorities.user.userId;
  }

  async onFormSubmit() {
    if (!this.validationCondition(this.formData.title)) {
      return;
    }

    if (!this.validationCondition(this.formData.content)) {
      return;
    }

    const result = await Swal.fire({
      title: 'Confirm Submission',
      text: 'Are you sure you want to submit the form?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      const formData = new FormData();
      formData.append('title', this.formData.title);
      formData.append('content', this.formData.content);

      // Append the image file if it's selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      formData.append('userId', this.formData.userId);

      this._article.addArticle(formData).subscribe(
        (data) => {
          Swal.fire('Success', 'Form submitted successfully', 'success');
          this.resetFormData();
        },
        (error) => {
          Swal.fire('Error', 'Something went wrong', 'error');
          console.log(error);
        }
      );
    } else {
      Swal.fire('Cancelled', 'Form submission cancelled', 'info');
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // Update selectedFileName with the file name
    if (this.selectedFile) {
      this.selectedFileName = this.selectedFile.name;
    } else {
      this.selectedFileName = null;
    }
  }

  public validationCondition(data: any): boolean {
    return data.trim() === '' || data == null ? false : true;
  }

  openSnackBar(message: any) {
    this._snackBar.open(message, 'Close', {
      duration: 1000, // Duration in milliseconds
    });
  }

  // Add a method to reset form data
  resetFormData() {
    this.formData = {
      title: '',
      content: '',
      userId: '102',
    };
    this.resetFile();
  }

  resetFile() {
    this.selectedFile = null;
    this.selectedFileName = null;
  }
}
