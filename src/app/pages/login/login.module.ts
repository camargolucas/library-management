import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginRouteModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgxMaskModule } from "ngx-mask";


@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        LoginRouteModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
    ]
})
export class LoginModule { }