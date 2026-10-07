import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = true;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.authForm = this.fb.group({
      name: [''], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.successMessage = '';
    this.errorMessage = '';
    this.authForm.reset();
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    this.successMessage = '';
    this.errorMessage = '';

    const { name, email, password } = this.authForm.value;

    if (this.isLoginMode) {
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          this.successMessage = `${response.message} (Token guardado en localStorage)`;
          console.log('Token:', this.authService.getToken());
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error al iniciar sesión';
        }
      });
    } else {
      this.authService.register({ name, email, password }).subscribe({
        next: (response) => {
          this.successMessage = `${response.message}. ¡Ahora puedes iniciar sesión!`;
          this.isLoginMode = window.confirm('Registro exitoso. ¿Deseas ir al login ahora?'); 
          if(this.isLoginMode) this.authForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error al registrarse';
        }
      });
    }
  }
}
