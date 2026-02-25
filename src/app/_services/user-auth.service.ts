import { Injectable } from '@angular/core';
import { LoggedUser, Role } from '../_models/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private router: Router) {}
  public saveInToLocalStorage(key: string, value: string) {
    if (key == null || value == null) return;
    localStorage.setItem(key, value);
  }
  public getFromLocalStorage(key: string): string {
    const data = localStorage.getItem(key);
    return data ? data : '';
  }
  public clearLocalStorage() {
    localStorage.clear();
  }
  public isLoggedIn(): boolean {
    return (
      this.getFromLocalStorage('roles') != '' &&
      this.getFromLocalStorage('jwtToken') != ''
    );
  }
  public hasRole(role: string) {
    const roleNames: string[] = this.getRoles();
    return roleNames.includes(role);
  }
  public getRoles(): string[] {
    const storedRoles: string = this.getFromLocalStorage('roles');
    const roles: Role[] = storedRoles ? JSON.parse(storedRoles) : [];
    const roleNames: string[] = roles.map((r) => r.name);
    return roleNames;
  }
  public handleAccess(userData: LoggedUser) {
    const roles: Role[] = userData.loggedUser.roles;
    this.saveInToLocalStorage('jwtToken', userData.jwtToken);
    this.saveInToLocalStorage('roles', JSON.stringify(roles));
    const userRoles: string[] = roles.map((r) => r.name);
    if (userRoles.includes('Admin')) {
      this.router.navigate(['/admin']);
    } else if (userRoles.includes('User')) {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/forbidden']);
    }
  }
}
