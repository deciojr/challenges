import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@authentication/services/authentication.service';

import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Input() pending: boolean;
  @Input() error: string;

  @Output() login: EventEmitter<{ authentication: string }> = new EventEmitter<{ authentication: string }>();

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', Validators.required),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get loginInformation(): Partial<User> {
    return this.loginForm.value;
  }

  submit() {
    const authentication = this.authenticationService.getAuthenticationFromLoginInformation(
      this.loginInformation.email,
      this.loginInformation.password,
    );

    this.login.emit({ authentication });
  }
}
