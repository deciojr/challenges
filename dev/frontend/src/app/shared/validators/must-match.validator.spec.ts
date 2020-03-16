import { FormBuilder, FormGroup } from '@angular/forms';
import { MustMatchValidator } from '@shared/validators/must-match.validator';

describe('Must Match Validator', () => {
  let formGroup: FormGroup;

  beforeAll(() => {
    const formBuilder: FormBuilder = new FormBuilder();
    formGroup = formBuilder.group({
      test: formBuilder.control(''),
      testMatcher: formBuilder.control(''),
    });
  });

  it('should throw error when the control name is not defined', () => {
    const matcher = jest.fn(MustMatchValidator.match(undefined, 'testMatcher'));

    const catchError = () => {
      matcher(formGroup);
    };

    expect(catchError).toThrowError(MustMatchValidator.errors.controlNameNotSpecified());
  });

  it('should throw error when the matching control name is not defined', () => {
    const control = 'test';
    const matcher = jest.fn(MustMatchValidator.match(control, undefined));
    const catchError = () => {
      matcher(formGroup);
    };
    expect(catchError).toThrowError(MustMatchValidator.errors.matchingControlNameNotSpecified(control));
  });

  it('should throw error when the control to match with is not found', () => {
    const controlNotFound = 'not found';
    const matcher = jest.fn(MustMatchValidator.match(controlNotFound, 'testMatcher'));

    const catchError = () => {
      matcher(formGroup);
    };

    expect(catchError).toThrowError(MustMatchValidator.errors.controlNotFound(controlNotFound));
  });

  it('should throw error when the control to test if it matches is not found', () => {
    const controlNameToTestIfItMatches = 'not found';
    const matcher = jest.fn(MustMatchValidator.match('test', controlNameToTestIfItMatches));

    const catchError = () => {
      matcher(formGroup);
    };

    expect(catchError).toThrowError(MustMatchValidator.errors.matchingControlNotFound(controlNameToTestIfItMatches));
  });

  it('should return empty error object if values match ', () => {
    const matcher = jest.fn(MustMatchValidator.match('test', 'testMatcher'));

    matcher(formGroup);

    const result = matcher.mock.results[0].value;

    expect(result).toEqual({});
  });

  it(`should return error object if values don't match`, () => {
    const matcher = jest.fn(MustMatchValidator.match('test', 'testMatcher'));

    formGroup.patchValue({
      test: '123',
    });

    matcher(formGroup);

    const result = matcher.mock.results[0].value;

    expect(result).toEqual({
      mustMatch: true,
    });
  });
});
