import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedUser, SubTask, Task } from '../_models/models';
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
  public addNewTask(taskData: any): Observable<any> {
    return this.httpClient.post(this.API_PATH + '/toDoes/task', taskData);
  }
  updateTask(taskId: number, updatedTaskData: Task) {
    const params = new HttpParams().set('taskId', String(taskId));
    return this.httpClient.put(
      this.API_PATH + '/toDoes/editTask',
      updatedTaskData,
      {
        params,
        responseType: 'text' as const,
      },
    );
  }
  public deleteTask(taskData: Task): Observable<string> {
    const params = new HttpParams().set('taskId', String(taskData.id));
    return this.httpClient.delete(this.API_PATH + '/toDoes/deleteTask', {
      params,
      responseType: 'text' as const,
    });
  }

  public getTasks(): Observable<any> {
    return this.httpClient.get(this.API_PATH + '/toDoes/tasks');
  }
  addNewSubtask(subTaskData: any) {
    return this.httpClient.post<Task>(
      this.API_PATH + '/subTask/addNewSubTask',
      subTaskData,
    );
  }
  updateSubTask(subTaskId: number, updatedSubTaskData: SubTask) {
    const params = new HttpParams().set('subTaskId', String(subTaskId));
    return this.httpClient.put(
      this.API_PATH + '/subTask/editSubTask',
      updatedSubTaskData,
      {
        params,
        responseType: 'text' as const,
      },
    );
  }
  toggleSubTaskCompletion(subTaskStatus:boolean, subTaskId:number, taskId:number) {
    const params = new HttpParams().set('subTaskId', String(subTaskId)).set('taskId', String(taskId)).set('subTaskStatus', subTaskStatus);
    return this.httpClient.post(
      this.API_PATH + '/subTask/toggleSubTaskCompletion',
      {},
      {
        params,
        responseType: 'text' as const,
      },
    );
  }
  public deleteSubTask(subTaskData: SubTask): Observable<string> {
    const params = new HttpParams().set('subTaskId', String(subTaskData.id));
    return this.httpClient.delete(this.API_PATH + '/subTask/deleteSubTask', {
      params,
      responseType: 'text' as const,
    });
  }
}
