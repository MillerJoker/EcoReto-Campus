import { Component, signal } from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';

@Component({
  imports: [AuthComponent],
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ecoretocampus-web');
}
