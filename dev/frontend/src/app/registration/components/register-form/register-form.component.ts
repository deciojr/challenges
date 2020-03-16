import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@shared/models/user.model';

import { MustMatchValidator } from '@shared/validators/must-match.validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Input() pending: boolean;

  @Input() error: boolean;

  @Input() message: string;

  @Output() register: EventEmitter<{ newUser: User }> = new EventEmitter<{ newUser: User }>();

  registerForm: FormGroup;

  passwordMinLength = 6;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group(
      {
        email: this.formBuilder.control('', [Validators.required, Validators.email]),
        firstName: this.formBuilder.control('', Validators.required),
        lastName: this.formBuilder.control('', Validators.required),
        password: this.formBuilder.control('', [Validators.required, Validators.minLength(this.passwordMinLength)]),
        confirmPassword: this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(this.passwordMinLength),
        ]),
        secretQuestion: this.formBuilder.control('', Validators.required),
        secretAnswer: this.formBuilder.control('', Validators.required),
      },
      {
        validators: MustMatchValidator.match('password', 'confirmPassword'),
      },
    );
  }

  get email() {
    return this.registerForm.get('email');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get secretQuestion() {
    return this.registerForm.get('secretQuestion');
  }

  get secretAnswer() {
    return this.registerForm.get('secretAnswer');
  }

  submit() {
    this.register.emit({
      newUser: this.registerForm.value as User,
    });
  }
}
