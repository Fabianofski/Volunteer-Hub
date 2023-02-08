import { NavLinkProps } from "react-router-dom";

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
    return { valid: emailValid, info: [] };
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
    info.push(`${pwdHasMinLength ? "✅" : "❌"} Password length is greater than 6`);
    info.push(`${pwdHasSpecialChar ? "✅" : "❌"} Password has special char`);
    info.push(`${pwdHasUpperChars ? "✅" : "❌"} Password has upper char`);
    info.push(`${pwdHasLowerChars ? "✅" : "❌"} Password has lower char`);
    info.push(`${pwdHasNumbers ? "✅" : "❌"} Password has numbers`);

    return { valid: pwdIsValid, info: info };
  }

  telephoneIsValid(input: string): Validation {
    const telValid =
      input.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,7}$/im) !== null;
    return { valid: telValid, info: [] };
  }

  dateOfBirthIsValid(input: string): Validation {
    let maxDate: Date = new Date();
    let minDate: Date = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 16);
    minDate.setFullYear(minDate.getFullYear() - 99);

    return { valid: new Date(input) < maxDate && new Date(input) > minDate, info: [] };
  }

  dateIsInFuture(input: string): Validation {
    const today: Date = new Date();
    const isInFuture = new Date(input) > today;
    const info = [];
    if (isInFuture) info.push("Datum muss in der Zukunft liegen!");

    return { valid: isInFuture, info: info };
  }

  inputIsNotEmpty(input: string): Validation {
    const inputLongEnough = input.length >= 2;
    return { valid: inputLongEnough, info: [] };
  }
}
