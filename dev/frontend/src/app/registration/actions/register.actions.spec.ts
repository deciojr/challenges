import { RegistrationPageActions } from '@registration/actions/';
import { registerActionName, registerActionsPrefix } from '@registration/actions/register.actions';
import { User } from '@shared/models/user.model';

describe(registerActionsPrefix, () => {
  it('should create a register action', () => {
    const newUser: User = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      secretQuestion: '',
      secretAnswer: '',
    };

    const result = RegistrationPageActions.register({ newUser });

    expect(result).toEqual({
      type: registerActionName,
      newUser,
    });
  });
});
