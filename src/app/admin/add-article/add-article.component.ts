import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  selectedFile: File | null = null;  

  formData = {
    title: '',
    content: '',
    userId:'102'
  };

  constructor(private _article:ArticleService) { }

  ngOnInit(): void {
  }

  onFormSubmit() {
   
    if (this.selectedFile) {
      // File is selected, handle the form submission with the file
     

      console.log("before Form Data "+this.formData)

      const formData = new FormData();
      formData.append('title', this.formData.title);
      formData.append('content', this.formData.content);
      formData.append('image', this.selectedFile);
      formData.append('userId', this.formData.userId);

      console.log("After Form Data "+JSON.stringify(this.formData))

      this._article.addArticle(formData).subscribe(
         (data)=>{

            alert("success")
         },
         (error)=>{
             alert("something went wrong")
             console.log(error)
         }
      );

     
    } else {
      // No file selected, handle the form submission without the file
      console.log('Form submitted without a file:', this.formData);

      }
    
  }

  onFileSelected(event: any) {
    
    this.selectedFile = event.target.files[0];
  }

}
