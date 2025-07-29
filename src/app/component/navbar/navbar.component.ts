import { Component, Input, OnInit } from '@angular/core';
import { AuthTokenService } from '../auth-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private authTokenService: AuthTokenService, private router: Router) { }
  @Input() title : string | undefined;
  ngOnInit(): void {
    
  }

  logout() {
    this.authTokenService.clearToken();
    this.router.navigate(['']);
  }
}
