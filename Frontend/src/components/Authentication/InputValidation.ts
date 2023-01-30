export interface Validation {
  valid: boolean;
  info: string[];
}

export class InputValidation {
  emailIsValid(input: string): Validation {
    const emailValid =
      input.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) !== null;
    return { valid: emailValid, info: [emailValid ? " " : "Email is invalid"] };
  }

  passwordIsValid(input: string): Validation {
    const pwdHasMinLength = input.length > 6;
    const pwdHasSpecialChar = input.match(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/) !== null;
    const pwdHasUpperChars = input.match(/[A-Z]/) !== null;
    const pwdHasLowerChars = input.match(/[a-z]/) !== null;
    const pwdHasNumbers = input.match(/[0-9]/) !== null;
    const pwdIsValid =
      pwdHasMinLength && pwdHasSpecialChar && pwdHasLowerChars && pwdHasUpperChars && pwdHasNumbers;

    const info: string[] = [];
    info.push(`Password length is greater than 6 ${pwdHasMinLength ? "✅" : "❌"}`);
    info.push(`Password has special char ${pwdHasSpecialChar ? "✅" : "❌"}`);
    info.push(`Password has upper char ${pwdHasUpperChars ? "✅" : "❌"}`);
    info.push(`Password has lower char ${pwdHasLowerChars ? "✅" : "❌"}`);
    info.push(`Password has numbers ${pwdHasNumbers ? "✅" : "❌"}`);

    return { valid: pwdIsValid, info: info };
  }

  telephoneIsValid(input: string): Validation {
    const telValid =
      input.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im) !== null;
    return { valid: telValid, info: [telValid ? " " : "Telephone is invalid"] };
  }

  dateOfBirthIsValid(input: string): Validation {
    let maxDate: Date = new Date();
    let minDate: Date = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 16);
    minDate.setFullYear(minDate.getFullYear() - 99);

    return { valid: new Date(input) < maxDate && new Date(input) > minDate, info: [] };
  }

  inputIsNotEmpty(input: string): Validation {
    const inputLongEnough = input.length >= 3;
    return { valid: inputLongEnough, info: [inputLongEnough ? " " : "Must be longer than 2"] };
  }
}
