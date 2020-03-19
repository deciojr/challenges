import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@authentication/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    const logout = confirm('Are you sure you want to logout?');

    if (!logout) {
      return;
    }

    this.authenticationService.removeAccessToken();
    this.router.navigate(['']);
  }
}
