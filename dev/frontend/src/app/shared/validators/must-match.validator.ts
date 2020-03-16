import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MustMatchValidator {
  static errors = {
    controlNameNotSpecified: () => 'Provide the control name to be matched with',
    matchingControlNameNotSpecified: (controlNameToBeMatchedWith: string) =>
      `Provide the control name to test if it matches with ${controlNameToBeMatchedWith}`,
    controlNotFound: (notFoundWithName: string) => `Control with name ${notFoundWithName} to be matched with not found`,
    matchingControlNotFound: (notFoundWithName: string) =>
      `Control with name ${notFoundWithName} to test if it matches not found`,
  };

  static match(controlName: string, matchingControlName: string, errorName: string = 'mustMatch'): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      if (!!!controlName) {
        throw new Error(MustMatchValidator.errors.controlNameNotSpecified());
      }

      if (!!!matchingControlName) {
        throw new Error(MustMatchValidator.errors.matchingControlNameNotSpecified(controlName));
      }

      const control = formGroup.get(controlName);

      if (!!!control) {
        throw new Error(MustMatchValidator.errors.controlNotFound(controlName));
      }

      const matchingControl = formGroup.get(matchingControlName);

      if (!!!matchingControl) {
        throw new Error(MustMatchValidator.errors.matchingControlNotFound(matchingControlName));
      }

      const matches: boolean = control.value === matchingControl.value;
      if (matches) {
        return {};
      }

      return {
        [`${errorName}`]: !matches,
      };
    };
  }
}
