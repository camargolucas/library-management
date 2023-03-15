import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import packageJson from 'package.json';
import { User } from 'src/app/interface/user';
import { UserResponse } from 'src/app/interface/userResponse';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  version: string = packageJson.version;
  formGroup: FormGroup;
  signUpMode: boolean = false;


  constructor(private router: Router, private userService: UserService, private utilsService:UtilsService) {

    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

  }

  setSignupMode(mode: boolean) {
    this.signUpMode = mode;
  }

  validateForm() {
    const controls = this.signUpMode ? ['name', 'cpf'] : ['cpf'];
    const fmControls = this.formGroup.controls;

    for (const control of controls) {
      if (fmControls[control].invalid) {
        fmControls[control].markAsDirty()
        fmControls[control].markAsTouched()
        return
      }
    }

    const user: User = this.formGroup.value;
    this.signUpMode ? this.signUp(user) : this.login(user);

  }

  validateUser(userResp: UserResponse) {
    if (userResp && Object.keys(userResp).length > 0) {
      if(userResp['success']){
        this.navigate('home');
      }else{
        this.utilsService.openSnackBar(userResp.error? userResp.error : 'Houve um problema');
      }
    }
  }


  signUp(user: User) {
    this.userService.signUp(user)
      .subscribe((resp:UserResponse) => {
        this.validateUser(resp)
      }, error => {
        console.error(error);
        this.utilsService.openSnackBar('Houve um problema');
      })
  }


  login(user: User) {
    this.userService.login(user)
      .subscribe((resp:UserResponse) => {
        this.validateUser(resp);

      }, error => {

      })

  }

  navigate(path: string) {
    this.router.navigate([`/${path}`], { replaceUrl: true });
  }

  getFormControl(control: string) {
    return this.formGroup.controls[control];
  }

}
