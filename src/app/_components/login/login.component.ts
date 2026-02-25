import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { UserAuthService } from '../../_services/user-auth.service';
import { Route, Router } from '@angular/router';
import { LoggedUser, Role } from '../../_models/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {}
  login(formData: NgForm) {
    this.userService.login(formData.value).subscribe(
      (response: LoggedUser) => {
        this.userAuthService.handleAccess(response);
      },
      (error) => {
        console.log('Error occured ==>', error);
      },
    );
  }
  // private handleAccess(userData: LoggedUser) {
  //   const roles: Role[] = userData.loggedUser.roles;
  //   this.userAuthService.saveInToLocalStorage('jwtToken', userData.jwtToken);
  //   this.userAuthService.saveInToLocalStorage('roles', JSON.stringify(roles));
  //   const userRoles: string[] = roles.map((r) => r.name);
  //   if (userRoles.includes('Admin')) {
  //     this.router.navigate(['/admin']);
  //   } else {
  //     this.router.navigate(['/user']);
  //   }
  // }
}
