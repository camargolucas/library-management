import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import packageJson from 'package.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  version: string = packageJson.version;
  formGroup: FormGroup;

  constructor(private router:Router) {

    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

  }

  validateForm() {
    const controls = ['name', 'cpf'];
    const fmControls = this.formGroup.controls;
    controls.forEach(control => {
      if (fmControls[control].invalid){        
        fmControls[control].markAsDirty()
        fmControls[control].markAsTouched()
      }else{
        this.login();
      }
      
    });
  }

  login(){
    this.navigate('home')
  }

    navigate(path:string){
      this.router.navigate([`/${path}`], { replaceUrl: true });
  }

  getFormControl(control:string){
    return this.formGroup.controls[control];
  }

}
