import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ValidationsClass {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        // si el control está vacío no devuelve ningún error
        return null;
      }
      // prueba el valor del control contra la expresión regular proporcionada
      const valid = regex.test(control.value);
      // si es verdadero, no devuelve ningún error (sin error), de lo contrario, devuelve el error pasado en el segundo parámetro
      return valid ? null : error;
    };
  }
}
