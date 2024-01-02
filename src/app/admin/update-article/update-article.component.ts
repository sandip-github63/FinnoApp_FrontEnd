import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css'],
})
export class UpdateArticleComponent implements OnInit {
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  articleId: number | null = null;

  article: any;

  userId: any;

  formData = {
    title: '',
    content: '',
    userId: '',
    url: '',
    urlSource: '',
  };

  constructor(
    private _article: ArticleService,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _login: LoginService
  ) {}

  ngOnInit(): void {
    this.userId = this._login.getUser().userWithAuthorities.user.userId;
    this.articleId = this._route.snapshot.params.articleId;
    this._article.getArticle(this.articleId).subscribe(
      (data: any) => {
        this.formData.title = data.data.title;
        this.formData.content = data.data.content;
        this.formData.userId = data.data.userId;
        this.formData.url = data.data.url;
        this.formData.urlSource = data.data.urlSource;
        console.log(this.formData);
      },
      (error: any) => {}
    );
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
      formData.append('url', this.formData.url);
      formData.append('urlSource', this.formData.urlSource);

      // Append the image file if it's selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      formData.append('userId', this.formData.userId);

      this._article.updateArticle(formData, this.articleId).subscribe(
        (data: any) => {
          this.showSuccessMessage('Article Updated Successfully..');
          this.resetFormData();
        },
        (error: any) => {
          this.showErrorMessage(
            'Something went wrong !!! Article not updated..'
          );
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
      userId: this.userId,
      url: '',
      urlSource: '',
    };
    this.resetFile();
  }

  resetFile() {
    this.selectedFile = null;
    this.selectedFileName = null;
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
