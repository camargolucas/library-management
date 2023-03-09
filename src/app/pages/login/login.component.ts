import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import packageJson from 'package.json';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  version: string = packageJson.version;
  formGroup: FormGroup;
  signUpMode: boolean = false;


  constructor(private router: Router, private userService: UserService) {

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
    const controls = ['name', 'cpf'];
    const fmControls = this.formGroup.controls;
    if (this.formGroup.invalid) {
      controls.forEach(control => {
        if (fmControls[control].invalid) {
          fmControls[control].markAsDirty()
          fmControls[control].markAsTouched()
        }
      });
    } else {
      const user:User = this.formGroup.value;
      this.login(user);
    }
  }



  login(user: User) {
    this.userService.login(user)
      .subscribe(ret => {
        console.log(ret);
        this.navigate('')
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
