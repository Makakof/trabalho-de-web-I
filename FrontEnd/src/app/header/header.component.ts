import { AuthService } from './../service/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatListModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{
  isLogin: boolean = false;

  constructor(private authService: AuthService){

  }

  ngOnInit(): void{
    this.isLogin = this.authService.isLoggedIn();
  }

  sair(){
    this.authService.logout();
    this.ngOnInit();
  }
}
