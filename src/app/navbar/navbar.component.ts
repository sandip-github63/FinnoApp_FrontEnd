import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showMobileMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

}
