export class InputValidation {
  emailIsValid(input: string): boolean {
    return (
      input.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) !== null
    );
  }

  passwordIsValid(input: string): boolean {
    const pwdHasMinLength = input.length > 6;
    const pwdHasSpecialChar = input.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) !== null;
    const pwdHasUpperChars = input.match(/[A-Z]/) !== null;
    const pwdHasLowerChars = input.match(/[A-Z]/) !== null;
    const pwdHasNumbers = input.match(/[0-9]/) !== null;

    return (
      pwdHasMinLength && pwdHasSpecialChar && pwdHasLowerChars && pwdHasUpperChars && pwdHasNumbers
    );
  }

  telephoneIsValid(input: string): boolean {
    return input.match(/^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im) !== null;
  }

  dateOfBirthIsValid(input: string): boolean {
    let maxDate: Date = new Date();
    let minDate: Date = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 16);
    minDate.setFullYear(minDate.getFullYear() - 99);

    return new Date(input) < maxDate && new Date(input) > minDate;
  }

  inputIsNotEmpty(input: string): boolean {
    return input.length >= 3;
  }
}
