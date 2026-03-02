import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { UserAuthService } from '../../_services/user-auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}
  ngOnInit(): void {}
  register(formData: NgForm) {
    this.userService.register(formData.value).subscribe(
      (response) => {
        alert(
          `Thank you. You registered successfully!!.
          Now you can login to your account.`,
        );
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
