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
  loading: boolean = false;

  constructor(private router: Router, private userService: UserService, private utilsService: UtilsService) {

    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

  }



  setLoading(load: boolean) {
    this.loading = load;
  }

  setSignupMode(mode: boolean) {
    this.formGroup.reset();
    this.signUpMode = mode;
  }

  validateForm() {
    this.setLoading(true);
    try {

      const controls = this.signUpMode ? ['name', 'cpf'] : ['cpf'];
      const fmControls = this.formGroup.controls;

      for (const control of controls) {
        if (fmControls[control].invalid) {
          fmControls[control].markAsDirty()
          fmControls[control].markAsTouched()
          this.setLoading(false);
          return
        }
      }

      const user: User = this.formGroup.value;
      this.signUpMode ? this.signUp(user) : this.login(user);

    } catch (error) {
      this.setLoading(false);
    }
  }

  validateUser(userResp: UserResponse) {
    this.setLoading(false);
    if (userResp && Object.keys(userResp).length > 0) {
      if (userResp['success']) {
        this.navigate('home');
        this.addToStorage(userResp['user']);
      } else {
        this.utilsService.openSnackBar(userResp.error ? userResp.error : 'Houve um problema');
      }
    }
  }

  addToStorage(user:User){
    try {
      const formatedUser = JSON.stringify(user);
      localStorage.setItem('user', formatedUser)
    } catch (error) {
      console.error(error)
    }
  }

  signUp(user: User) {
    this.userService.signUp(user)
      .subscribe((resp: UserResponse) => {
        this.validateUser(resp)
      }, error => {
        console.error(error);
        this.setLoading(false);
        this.utilsService.openSnackBar('Houve um problema');
      })
  }


  login(user: User) {
    this.userService.login(user)
      .subscribe((resp: UserResponse) => {
        this.validateUser(resp);

      }, error => {
        this.setLoading(false);
        this.utilsService.openSnackBar('Houve um problema');
      })

  }

  navigate(path: string) {
    this.router.navigate([`/${path}`], { replaceUrl: true });
  }

  getFormControl(control: string) {
    return this.formGroup.controls[control];
  }

}
