import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../_services/user-auth.service';
import { CommonModule } from '@angular/common';
import { Role } from '../../_models/models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
  ) {}
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }
  public logOut() {
    this.userAuthService.clearLocalStorage();
    this.router.navigate(['/home']);
  }
  public hasRole(role: string) {
    // const storedRoles: string =
    //   this.userAuthService.getFromLocalStorage('roles');
    // const roles: Role[] = storedRoles ? JSON.parse(storedRoles) : [];
    // const roleNames: string[] = roles.map((r) => r.name);
    // return roleNames.includes(role);
    return this.userAuthService.hasRole(role);
  }
}
