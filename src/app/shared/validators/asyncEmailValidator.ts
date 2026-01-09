import { AbstractControl, ValidationErrors } from '@angular/forms'
import { Observable } from 'rxjs'

export class AsyncEmailValidator {
  static isEmailExist (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    let val = control.value as string
    // jhon@gmail.com
    const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
      setTimeout(() => {
        if (val === 'jhon@gmail.com') {
          resolve({
            emailIdExistError: `This email id ${val} is already exist`
          })
        } else {
          resolve(null)
        }
      }, 3000)
    })

    return promise
  }
}


// ValidationError | null


// let p = new Promise<string>((resolve, reject) => {
//     resolve('Hello TS')
// })

// p.then(data => {
//     data.
// })