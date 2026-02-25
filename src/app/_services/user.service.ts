import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedUser, RegistrationRequest } from '../_models/models';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_PATH = 'http://localhost:8080';
  // requestHeader = new HttpHeaders({
  //   Authorization: `Bearer ${this.authService.getFromLocalStorage('jwtToken')}`,
  // });
  constructor(
    private httpClient: HttpClient,
    private authService: UserAuthService,
  ) {}

  public login(loginData: any): Observable<LoggedUser> {
    return this.httpClient.post<LoggedUser>(
      this.API_PATH + '/public/authenticate',
      loginData,
    );
  }
  public register(registrationData: any): Observable<string> {
    return this.httpClient.post(
      this.API_PATH + '/public/register',
      registrationData,
      { responseType: 'text' },
    );
  }
  public getTasks(): Observable<any> {
    return this.httpClient.get(this.API_PATH + '/toDoes/tasks');
  }
}
