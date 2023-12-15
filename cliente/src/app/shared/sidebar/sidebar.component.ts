import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit{

  @Input() sideNavStatus: boolean = false;

  list = [
    {number: '1', name: 'Menu', icon: 'fa-solid fa-house', href: ''},
    {number: '2', name: 'Cart', icon: 'fa-solid fa-cart-shopping', href: 'cart'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
