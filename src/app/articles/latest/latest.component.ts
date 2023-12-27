import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {

   //pagination 

   pageSize:any=2;

   currentPage = 0;
 
   pageSizeOp=[1, 2, 3, 10];

   @ViewChild(MatPaginator) paginator: MatPaginator| any;

  constructor() { }

  ngOnInit(): void {
  }

  // Add a function to handle page change
  onPageChange(event:any) {

    this.pageSize = event.pageSize; 

    this.currentPage = event.pageIndex;

    this.paginator.pageIndex = this.currentPage;

  
  }

  get pagedUsers() {
    
    const startIndex = this.currentPage * this.pageSize;
    return null;

    //return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

}
