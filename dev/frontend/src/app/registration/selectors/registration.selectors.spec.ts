import { State } from '@registration/reducers';
import * as fromRegistration from '@registration/reducers';
import { selectRegistrationError, selectRegistrationMessage } from '@registration/selectors/registration.selectors';

describe('Register Selectors', () => {
  let state: fromRegistration.State;

  beforeAll(() => {
    state = {
      message: '',
      error: false,
      newUser: null,
    };
  });

  describe('Select message', () => {
    it('should return a string', () => {
      expect(selectRegistrationMessage.projector(state)).toEqual(state.message);
    });
  });

  describe('Select error', () => {
    it(`should return a boolean that indicates if there's an error`, () => {
      expect(selectRegistrationError.projector(state)).toEqual(state.error);
    });
  });
});
