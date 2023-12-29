import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.component.html',
  styleUrls: ['./view-articles.component.css'],
})
export class ViewArticlesComponent implements OnInit {
  content: string =
    'Your long content goes here. This is just a sample text for demonstration.Your long content goes here. This is just a sample text for demonstration.';
  truncatedContent: string = '';
  showSeeMore: boolean = true;

  //dropdown item

  dropDownItem: boolean = false;

  constructor() {}

  ngOnInit(): void {
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
  showDropDownItem(event: MouseEvent) {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    this.dropDownItem = !this.dropDownItem;
  }
  // Method to hide the dropdown
  hideDropDownItem() {
    this.dropDownItem = false;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const isDropDownClicked = (event.target as HTMLElement).closest('#myCard');
    if (!isDropDownClicked) {
      this.hideDropDownItem();
    }
  }
}
