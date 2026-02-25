import { Component } from '@angular/core';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(private userService: UserService) {}

  getTasks() {
    this.userService.getTasks().subscribe(res=>{
      console.log("Accessed api");
    }, err=>{
      console.log("Api access failed ==> ", err);
    })
  }
}
