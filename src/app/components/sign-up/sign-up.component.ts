import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  response: any;

  constructor(private fb: FormBuilder, private signUpService: SignUpService) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
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

  async onFormSubmit() {
    if (this.signUpForm.valid) {
      try {
        this.response = await this.signUpService.register(
          this.signUpForm.value
        );
        console.log('Usuário cadastrado com sucesso', this.response);
      } catch (error) {
        console.error('Erro no cadastro', error);
      }
    }
  }
}
