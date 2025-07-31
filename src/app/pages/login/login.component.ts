import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.error = 'Email and password are required and must be valid.';
      return;
    }

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        alert('Login successful! ✅');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Invalid email or password.';
      },
    });
  }
}
