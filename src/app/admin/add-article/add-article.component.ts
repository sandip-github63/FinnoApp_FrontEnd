import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  

  formData = {
    title: '',
    content: '',
    image: ''
  };


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', this.formData);
  }

}
