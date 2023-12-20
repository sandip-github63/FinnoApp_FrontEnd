import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
  
})
export class SidebarComponent implements OnInit {

  sideBarShow:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

  dropdown(): void {
    const submenu = document.querySelector('#submenu');
    const arrow = document.querySelector('#arrow');
    if (submenu && arrow) {
      submenu.classList.toggle('hidden');
      arrow.classList.toggle('rotate-0');
    }
  }

  openSidebar(): void {
    
      this.sideBarShow=!this.sideBarShow;
    
  }  


}
