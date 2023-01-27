export class InputValidation {
  inputIsValid(): boolean {
    return true;
  }

  emailIsValid(input: string): boolean {
    console.log(input);
    return true;
  }

  passwordIsValid(input: string): boolean {
    console.log(input);
    return true;
  }

  telephoneIsValid(input: string): boolean {
    console.log(input);
    return input !== "";
  }

  dateOfBirthIsValid(input: string): boolean {
    console.log(new Date(input));
    return new Date(input) < new Date("2008-01-01");
  }

  inputIsNotEmpty(input: string): boolean {
    console.log(input);
    return input !== "";
  }
}
