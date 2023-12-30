import { Component, HostListener, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.component.html',
  styleUrls: ['./view-articles.component.css'],
})
export class ViewArticlesComponent implements OnInit {
  articles: any = [];

  userId: number = 102;

  content: string =
    'Your long content goes here. This is just a sample text for demonstration.Your long content goes here. This is just a sample text for demonstration.';

  // Assuming articles have properties like 'title' and 'content'
  showSeeMore: boolean[] = [];
  truncatedContent: string[] = [];

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
    this.showSeeMore = new Array(this.articles.length).fill(true);
    this.truncateContent();
  }

  truncateContent() {
    const maxLength = 50; // Set your desired maximum length

    // Truncate content for each article
    this.articles.data.forEach((article: any, index: number) => {
      if (article.content.length > maxLength) {
        this.truncatedContent[index] =
          article.content.substring(0, maxLength) + '...';
      } else {
        this.truncatedContent[index] = article.content;
        this.showSeeMore[index] = false;
      }
    });
  }

  // public toggleContent() {
  //   this.truncatedContent = this.content;
  //   this.showSeeMore = false;
  // }
  public toggleContent(index: number) {
    // Toggle "See More" for the specific article
    this.showSeeMore[index] = !this.showSeeMore[index];

    // If showing more, set full content; otherwise, truncate
    this.truncatedContent[index] = this.showSeeMore[index]
      ? this.articles.data[index].content
      : this.truncate(this.articles.data[index].content);
  }

  private truncate(content: string): string {
    const maxLength = 50; // Set your desired maximum length
    return content.length > maxLength
      ? content.substring(0, maxLength) + '...'
      : content;
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
