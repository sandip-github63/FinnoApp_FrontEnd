import { Component, HostListener, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.component.html',
  styleUrls: ['./view-articles.component.css'],
})
export class ViewArticlesComponent implements OnInit {
  articles: any = [];

  userId: number = 1;

  content: string =
    'Your long content goes here. This is just a sample text for demonstration.Your long content goes here. This is just a sample text for demonstration.';
  truncatedContent: string = '';
  showSeeMore: boolean = true;

  //dropdown item

  dropDownItem: boolean[] = [];

  constructor(private _article: ArticleService) {}

  ngOnInit(): void {
    //call server
    this._article.getUserArticles(this.userId).subscribe(
      (data: any) => {
        this.articles = data;
        console.log(this.articles);
      },
      (error: any) => {
        console.log(error);
        alert('Failed to load User Data');
      }
    );
    this.dropDownItem = new Array(this.articles.length).fill(false);
    this.truncateContent();
  }

  truncateContent() {
    const maxLength = 50; // Set your desired maximum length
    if (this.content.length > maxLength) {
      this.truncatedContent = this.content.substring(0, maxLength) + '...';
    } else {
      this.truncatedContent = this.content;
      this.showSeeMore = false;
    }
  }

  public toggleContent() {
    this.truncatedContent = this.content;
    this.showSeeMore = false;
  }
  showDropDownItem(event: MouseEvent, index: number) {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    this.dropDownItem[index] = !this.dropDownItem[index];
  }
  // Method to hide the dropdown
  hideDropDownItem() {
    this.dropDownItem.fill(false);
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const isDropDownClicked = (event.target as HTMLElement).closest('#myCard');
    if (!isDropDownClicked) {
      this.hideDropDownItem();
    }
  }
}
