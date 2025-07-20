import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CustomRegex } from './shared/const/validatorsPattern'
import { NoSpaceBarValidator } from './shared/validators/noSpaceValidator'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reactiveForm'
  signUpForm!: FormGroup // undefined
  constructor () {}

  ngOnInit (): void {
    this.signUpForm = new FormGroup({
      userName: new FormControl(null, 
        [
        Validators.required,
        Validators.pattern(CustomRegex.username),
        Validators.minLength(5),
        Validators.maxLength(8),
        NoSpaceBarValidator.noSpace
        ]),
      email: new FormControl(null, [Validators.required])
    })
  }

  onSignUp () {
    console.log(this.signUpForm)
  }

  get f(){
    return this.signUpForm.controls
  }

  public get userName () {
    return this.signUpForm.get('userName') as FormControl
  }
}
