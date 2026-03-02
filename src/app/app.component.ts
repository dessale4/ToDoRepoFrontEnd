import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './_components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  //enables the usage of each selector inclusion in the template file
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RevaToDoUI';
}
