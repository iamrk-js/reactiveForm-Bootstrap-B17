import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { CustomRegex } from './shared/const/validatorsPattern'
import { NoSpaceBarValidator } from './shared/validators/noSpaceValidator'
import { EmpIdValidator } from './shared/validators/empIdValidator'
import { COUNTRIES_META_DATA } from './shared/const/countriesData'
import { AsyncEmailValidator } from './shared/validators/asyncEmailValidator'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reactiveForm'
  signUpForm!: FormGroup // undefined
  gendersArr: string[] = ['Female', 'Male', 'Others']
  countryArr = COUNTRIES_META_DATA
  constructor () {}

  ngOnInit (): void {
    this.createSignUpForm()
    this.isAddSameChekboxHandler()
    this.isAddSameHandler()
    this.addDependent()

    this.f['password'].valueChanges.subscribe(val => {
      console.log('Is Password valid?', this.f['password'].valid)
      if (this.f['password'].valid) {
        this.f['confirmPassword'].enable()
      } else {
        this.f['confirmPassword'].disable()
        this.f['confirmPassword'].reset()
      }
    })

    this.f['confirmPassword'].valueChanges.subscribe(val => {
      let passVal = this.f['password'].value
      if (val === passVal) {
        this.f['confirmPassword'].setErrors(null)
      } else {
        this.f['confirmPassword'].setErrors({
          passMisMatchError: 'Password and confirm password must be same.'
        })
      }
    })
  }

  isAddSameHandler () {
    this.f['isAddSame'].valueChanges.subscribe(val => {
      console.log(val) // true || false

      // if val is true >> current add ko patch with permant add and disabled permnt add

      // else permanant reset and enable

      if (val) {
        let currentAdd = this.f['currentAddress'].value
        this.f['permanentAddress'].patchValue(currentAdd)
        this.f['permanentAddress'].disable()
      } else {
        this.f['permanentAddress'].reset()
        this.f['permanentAddress'].enable()
      }
    })
  }

  isAddSameChekboxHandler () {
    this.f['currentAddress'].valueChanges.subscribe(res => {
      // console.log(res);
      console.log('Is CurreAdd Valid', this.f['currentAddress'].valid)

      // current add is valid (true) then enable isAddSame checkbox

      // current add is not valid (false) then disable isAddSame checkbox

      // this.f['currentAddress'].valid ? this.f['isAddSame'].enable() : this.f['isAddSame'].disable()

      if (this.f['currentAddress'].valid) {
        this.f['isAddSame'].enable()
      } else {
        this.f['isAddSame'].disable()
        this.f['isAddSame'].reset()
      }
    })
  }

  createSignUpForm () {
    this.signUpForm = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.username),
        Validators.minLength(5),
        Validators.maxLength(8),
        NoSpaceBarValidator.noSpace
      ]),
      email: new FormControl(null, 
        [
        Validators.required,
        Validators.pattern(CustomRegex.email)
        ],
        [
           AsyncEmailValidator.isEmailExist
        ]
    ), 
      empId: new FormControl(null, [
        Validators.required,
        EmpIdValidator.isEmpIdValid
      ]),
      gender: new FormControl(null),
      skills: new FormArray([new FormControl(null, [Validators.required])]),
      currentAddress: new FormGroup({
        country: new FormControl('India', [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        zipcode: new FormControl(null, [Validators.required])
      }),
      permanentAddress: new FormGroup({
        country: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        zipcode: new FormControl(null, [Validators.required])
      }),
      isAddSame: new FormControl({ value: false, disabled: true }),
      dependents: new FormArray([]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.password)
      ]),
      confirmPassword: new FormControl({ value: null, disabled: true }, [
        Validators.required
      ])
    })
  }

  addDependent () {
    if (this.dependentsArr.valid) {
      let dependentGroup = new FormGroup({
        fullName: new FormControl(null, [Validators.required]),
        relationship: new FormControl(null, [Validators.required]),
        citizenship: new FormControl(null, [Validators.required]),
        isTravlingWithYou: new FormControl(null, [Validators.required])
      })

      this.dependentsArr.push(dependentGroup)
    }
  }

  onSignUp () {
    console.log(this.signUpForm)
  }

  get f () {
    return this.signUpForm.controls // Object
  }

  public get userName () {
    return this.signUpForm.get('userName') as FormControl
  }

  get skillsArr () {
    return this.f['skills'] as FormArray
  }

  get dependentsArr () {
    return this.f['dependents'] as FormArray
  }

  addSkill () {
    if (this.skillsArr.valid && this.skillsArr.length < 5) {
      // create a formControl and push it in to skillsArr

      let fcontrol = new FormControl(null, [Validators.required])
      this.skillsArr.push(fcontrol)
    }
  }

  onSkillRemove (i: number) {
    console.log(i)
    this.skillsArr.removeAt(i)
  }
}
