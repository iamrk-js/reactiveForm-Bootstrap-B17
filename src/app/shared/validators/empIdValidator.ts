import { AbstractControl, ValidationErrors } from "@angular/forms";



export class EmpIdValidator {
 static isEmpIdValid(control : AbstractControl) : null | ValidationErrors{
    let val = control.value as string;

    if(!val){
        return null
    }

    let regExp = /^[A-Z]\d{3}$/

    let isValid = regExp.test(val)

    if(isValid){
        return null
    }else{
        return {
            invalidEmpId : `Emp Id must start with one Cap Alphabet and ends with 3 numbers`
        }
    }

 }
}