import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { SignUpService } from 'src/app/services/sign-up.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  spinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private signUpService: SignUpService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner = true;

    this.initializeForm();

    this.spinner = false;
  }

  private initializeForm(): void {
    this.signUpForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  isFieldInvalid(field: string): boolean {
    const control = this.signUpForm.get(field);

    return !!(control && control.touched && control.invalid);
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password');

    const confirmPassword = form.get('confirmPassword');

    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }

  onFormSubmit(): void {
    if (this.signUpForm.invalid) return;

    this.spinner = true;

    this.signUpService
      .register({ formData: this.signUpForm.value })
      .pipe(
        tap({
          next: () => {
            this.toastr.success('Usuário cadastrado com sucesso!');
            this.router.navigate(['/login']);
            this.signUpForm.reset();
          },
          error: (error) => {
            const errorMessage =
              error.message ?? 'Erro no cadastro. Por favor, tente novamente.';
            this.toastr.error(errorMessage);
            console.error('Erro no cadastro', error);
          },
          finalize: () => {
            this.spinner = false;
          },
        })
      )
      .subscribe();
  }
}
