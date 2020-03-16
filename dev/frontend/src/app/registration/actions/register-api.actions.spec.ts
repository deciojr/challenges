import { RegistrationApiActions } from '@registration/actions/index';

import {
  registerApiActionsPrefix,
  registerUserFailureActionName,
  registerUserSuccessActionName,
} from './register-api.actions';

describe(registerApiActionsPrefix, () => {
  it('should create a register success action', () => {
    const result = RegistrationApiActions.registerUserSuccess({ message: '' });
    expect(result).toEqual({
      type: registerUserSuccessActionName,
      message: '',
    });
  });

  it('should create a register failure action', () => {
    const result = RegistrationApiActions.registerUserFailure({ message: '' });

    expect(result).toEqual({
      type: registerUserFailureActionName,
      message: '',
    });
  });
});
