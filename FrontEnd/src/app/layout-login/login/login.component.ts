import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: [''],
    password: [''],
  });

  errorMessage: string = '';

  ngOnInit() {
    this.form.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe(() => (this.errorMessage = ''));
  }

  login() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login(email as string, password as string).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (resp) => {
          this.errorMessage = resp.error.message;
        }
      });
    } else {
      this.errorMessage = 'Há campos inválidos no formulário!';
    }
  }
}
